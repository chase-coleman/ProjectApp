import { StyledEngineProvider } from "@mui/material/styles";
import "./App.css";
import { DrawerAppBar } from "./components/Navbar";
import { ButtonComponent } from "./components/ButtonComponent";
import { useEffect, useState } from "react";
import Aurora from "./components/Background";

function App() {
  const [positions, setPositions] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [balloonLocations, setLocations] = useState(() => {
      const rawData = localStorage.getItem("balloons")
    return rawData ? JSON.parse(rawData) : []
  })

  useEffect(() => {
    localStorage.setItem("balloons", JSON.stringify(balloonLocations))
  }, [balloonLocations])

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/treasure/01.json");
      const data = await res.json();
      setLocations(data)
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
        <div className="relative z-10 min-h-screen min-w-screen mt-3">
          <DrawerAppBar />

          <div className="-mt-10 h-56 w-full flex justify-center ">
            <ButtonComponent
              text="Query Windborne Balloon Positions"
              styling="button-primary w-[300px] h-[60px]"
              loading={isLoading}
              onClick={handleClick}
            />
          </div>
        </div>
      </StyledEngineProvider>
    </>
  );
}

export default App;
