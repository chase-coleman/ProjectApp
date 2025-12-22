import { Entity, Viewer } from "resium";
import * as Cesium from "cesium";
import { useContext, useRef, useEffect, useMemo } from "react";
import { appContext } from "../App";

const Globe = () => {
  const viewerRef = useRef(null);
  const { balloonLocations } = useContext(appContext);

  // memorizes the values - so in the Globe component, everytime the Viewer is re-created - it's not taking in a new contextOptions 
  // - therefore not re-rendering the globe and losing the created entities. needed because the first API call was always getting re-rendered
  const contextOptions = useMemo(
    () => ({
      webgl: {
        alpha: true,
        premultipliedAlpha: false,
      },
    }),
    []
  );

  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    // Required for true transparency in many setups
    viewer.scene.highDynamicRange = false; // key fix :contentReference[oaicite:0]{index=0}

    // Remove sky/space rendering
    viewer.scene.skyBox?.destroy?.();
    viewer.scene.skyBox = undefined; // backgroundColor only applies when skyBox is undefined :contentReference[oaicite:1]{index=1}

    viewer.scene.skyAtmosphere.show = false;
    viewer.scene.globe.showGroundAtmosphere = false;

    // Remove light bodies that may still draw into the scene
    viewer.scene.sun?.destroy?.();
    viewer.scene.sun = undefined; // :contentReference[oaicite:2]{index=2}
    viewer.scene.moon && (viewer.scene.moon.show = false);

    // Transparent clear
    viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT;
    viewer.scene.globe.baseColor = Cesium.Color.TRANSPARENT;

    viewer.scene.requestRenderMode = false; // continuous render loop
    viewer.scene.maximumRenderTimeChange = 0; // ensure time changes trigger renders
  }, []);

  return (
    <Viewer
      ref={viewerRef}
      full
      contextOptions={contextOptions}
      scene3DOnly
      animation={false}
      timeline={false}
      baseLayerPicker={false}
      geocoder={false}
      homeButton={false}
      sceneModePicker={false}
      navigationHelpButton={false}
      fullscreenButton={false}
      infoBox={false}
      selectionIndicator={false}
    >
      {balloonLocations?.map(([lat, lon, alt], index) => {
        const key = `${lat.toFixed(5)}:${lon.toFixed(5)}:${Math.round(
          alt ?? 0
        )}`;
        return (
          <Entity
            key={key}
            position={Cesium.Cartesian3.fromDegrees(lon, lat, alt)}
            point={{ pixelSize: 10 }}
            onClick={() => {
              console.log("clicked!", index);
            }}
          />
        );
      })}
    </Viewer>
  );
};

export default Globe;
