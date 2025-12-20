import { Viewer } from "resium";
import * as Cesium from "cesium";
import { useRef, useEffect } from "react";

const Globe = () => {
  const viewerRef = useRef(null);

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
  }, []);

  return (
    <Viewer
      ref={viewerRef}
      full
      contextOptions={{
        webgl: {
          alpha: true,                 // required :contentReference[oaicite:3]{index=3}
          premultipliedAlpha: false,   // usually safer for CSS compositing
        },
      }}
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
    />
  );
}

export default Globe;