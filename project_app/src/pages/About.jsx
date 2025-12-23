import { StyledEngineProvider } from "@mui/material/styles";
import { DrawerAppBar } from "../components/Navbar";
import { ButtonComponent } from "../components/ButtonComponent";

const About = () => {
  return (
    <>
        {/* Foreground content */}
        <div className="relative z-10 min-h-screen w-screen flex flex-col">
          <DrawerAppBar />
          <div className="bg-red-500 h-screen">
          <h1>about page!!</h1>
          </div>
        </div>
    </>
  );
};

export default About;
