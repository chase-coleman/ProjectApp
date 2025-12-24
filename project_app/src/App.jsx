import { StyledEngineProvider } from "@mui/material/styles";
import "./App.css";
import { DrawerAppBar } from "./components/Navbar";
import { ButtonComponent } from "./components/ButtonComponent";
import { useEffect, useState, useRef, createContext } from "react";
import Aurora from "./components/Background";
import MagicBento from "./components/Dashboard";
import { Routes, Route, Link } from "react-router-dom";
import {About} from "./pages/About"
import NotFound from "./pages/ErrorPage";

export const AppContext = createContext({
  positions: [],
  setPositions: () => {},
  isLoading: false,
  setLoading: () => {},
  balloonLocations: [],
  setLocations: () => {},
  time: "",
  setTime: () => {},
  localData: {},
  setLocalData: () => {},
});

function App() {
  const [positions, setPositions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [balloonLocations, setLocations] = useState(() => {
    const rawData = localStorage.getItem("balloons");
    return rawData ? JSON.parse(rawData) : [];
  });
  const [localData, setLocalData] = useState(() => {
    const rawData = localStorage.getItem("localData");
    return rawData ? JSON.parse(rawData) : {};
  });
  const [time, setTime] = useState(null); // the location of the balloons based on the selected time period (minus)

  const validateShape = (x) => {
    if (Array.isArray(x)) {
      return x;
    } else if (typeof x === "object") {
      return x;
    }
  };

  useEffect(() => {
    if (!balloonLocations || balloonLocations.length === 0) return;
    try {
      const valid = validateShape(balloonLocations);
      localStorage.setItem("balloons", JSON.stringify(valid));
    } catch (err) {
      console.error({
        message: err.message,
        stack: err.stack,
        name: err.name,
      });
    }
  }, [balloonLocations]);

  useEffect(() => {
    if (!localData || Object.keys(localData).length === 0) return;
    try {
      const valid = validateShape(localData);
      localStorage.setItem("localData", JSON.stringify(valid));
    } catch (err) {
      console.error({
        message: err.message,
        stack: err.stack,
        name: err.name,
      });
    }
  }, [localData]);

  return (
    <>
      <StyledEngineProvider injectFirst>
        <AppContext.Provider
          value={{
            positions,
            setPositions,
            isLoading,
            setLoading,
            balloonLocations,
            setLocations,
            time,
            setTime,
            localData,
            setLocalData,
          }}
        >
          {/* Background layer */}
          <div className="fixed inset-0 -z-10">
            <Aurora
              colorStops={["#BACFF7", "#7A7AFF", "#8AFFFF"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
            <Routes>

          <Route path="/" element={
          <div className="relative z-10 min-h-screen w-screen flex flex-col">
            <DrawerAppBar />

            <div className="flex-1 min-h-0 w-full flex flex-col items-center gap-3 standard">
              <MagicBento enableMagnetism={false} />
              <div className="relative w-9/10 flex-1 min-h-0 p-5"></div>
            </div>
          </div>}/>
          <Route path="/about" element={<About />}/>
          <Route path="*" element={<NotFound/>} />
      </Routes>
        </AppContext.Provider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
