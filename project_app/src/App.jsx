import { StyledEngineProvider } from "@mui/material/styles";
import "./App.css";
import { DrawerAppBar } from "./components/Navbar";
import { ButtonComponent } from "./components/ButtonComponent";
import { useEffect, useState, useRef } from "react";
import Aurora from "./components/Background";
import { Viewer } from "resium";
import * as Cesium from "cesium";


function App() {
  const [positions, setPositions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [balloonLocations, setLocations] = useState(() => {
    const rawData = localStorage.getItem("balloons");
    return rawData ? JSON.parse(rawData) : [];
  });
  const viewerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("balloons", JSON.stringify(balloonLocations));
  }, [balloonLocations]);


  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    viewer.scene.skyBox.show = false;
    viewer.scene.skyAtmosphere.show = false;
    viewer.scene.backgroundColor = Cesium.Color.TRANSPARENT;
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/treasure/01.json");
      const data = await res.json();
      setLocations(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        {/* Background layer */}
        <div className="fixed inset-0 -z-10">
          <Aurora
            colorStops={["#BACFF7", "#7A7AFF", "#8AFFFF"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        {/* Foreground content */}
        <div className="relative z-10 h-screen min-w-screen ">
          <DrawerAppBar />
          <div className="h-full w-full flex flex-col items-center gap-3">
            <ButtonComponent
              text="Query Windborne Balloon Positions"
              styling="button-primary w-[300px] h-[60px]"
              loading={isLoading}
              onClick={handleClick}
            />
            <div className="w-full p-5">
              <Viewer
                contextOptions={{ webgl: { alpha: true } }}
                ref={viewerRef}
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
            </div>
          </div>
        </div>
      </StyledEngineProvider>
    </>
  );
}

export default App;
