import { StyledEngineProvider } from "@mui/material/styles";
import "./App.css";
import { DrawerAppBar } from "./components/Navbar";
import { ButtonComponent } from "./components/ButtonComponent";
import { useEffect, useState, useRef, createContext } from "react";
import Aurora from "./components/Background";
import Globe from "./components/Globe";
import { handleWindborneCall } from "./functions/WindborneFuncs";
import MagicBento from "./components/Dashboard";

export const appContext = createContext({
  positions: [],
  setPositions: () => {},
  isLoading: false,
  setLoading: () => {},
  balloonLocations: [],
  setLocations: () => {}
})

function App() {
  const [positions, setPositions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [balloonLocations, setLocations] = useState(() => {
    const rawData = localStorage.getItem("balloons");
    return rawData ? JSON.parse(rawData) : [];
  });

  useEffect(() => {
    localStorage.setItem("balloons", JSON.stringify(balloonLocations));
    console.log(balloonLocations)
  }, [balloonLocations]);

  return (
    <>
      <StyledEngineProvider injectFirst>
        <appContext.Provider value={{
          positions,
          setPositions,
          isLoading,
          setLoading,
          balloonLocations,
          setLocations
        }}>
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
        <div className="relative z-10 min-h-screen w-screen flex flex-col">
          <DrawerAppBar />

          <div className="flex-1 min-h-0 w-full flex flex-col items-center gap-3">
            <MagicBento enableMagnetism={false}/>
            {/* <ButtonComponent
              text="Get Windborne Balloon Positions"
              styling="button-primary w-[300px] h-[60px]"
              loading={isLoading}
              onClick={() => handleWindborneCall(setLoading, setLocations)}
            /> */}

            <div className="relative w-9/10 flex-1 min-h-0 p-5">
              {/* <Globe /> */}
            </div>
          </div>
        </div>
        </appContext.Provider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
