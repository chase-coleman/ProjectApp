import { DrawerAppBar } from "../components/Navbar";
import Loop from "../components/Loop";
import { LinkDiagonal } from "../assets/icons";

export const About = () => {
  return (
    <>
      {/* Foreground content */}
      <div className="relative z-10 min-h-screen w-screen flex flex-col">
        <DrawerAppBar />
        <div className="h-[calc(100vh-112px)] flex flex-col standard">
          <div className="link-container flex justify-center text-white text-[1.5em] lg:gap-[5em] md:gap-[3em] sm:text-[1.2em] sm:gap-[2em] p-5">
            <a
              href="https://github.com/chase-coleman/ProjectApp"
              target="_blank"
              className="flex items-center gap-1 hover:underline"
            >
              Project Github <LinkDiagonal />
            </a>
            <a
              href="https://www.linkedin.com/in/chasehcoleman/"
              target="_blank"
              className="flex items-center gap-1 hover:underline"
            >
              My LinkedIn <LinkDiagonal />
            </a>
            <a
              href="https://docs.google.com/document/d/1qbGohoEXVoCHNqhRJ5ITE3esMnYkwbJjSW8nh97hMPA/edit?tab=t.0"
              target="_blank"
              className="flex items-center gap-1 hover:underline"
            >
              My Resume <LinkDiagonal />
            </a>
          </div>
          <div className="flex flex-col text-[#060010] font-semibold p-5">
            <div className="api-info  gap-5 w-full p-5">
              <div className="glass api-container rounded-lg w-1/2 min-h-[212px] tracking-widest p-3">
                <h1 className="text-[1.5em]">Windborne API</h1>
                <span className="">
                  Returns data points from Windborne’s atmospheric balloons.
                  While these data points are undocumented, they provide the
                  latitude, longitude, and altitude for each balloon
                  observation.
                </span>
                <span>
                  Since there is no official schema or guidance on how this data
                  is structured, I assumed a conventional
                  latitude/longitude/altitude format.
                </span>
                <span>
                  This approach allowed the data to be reliably passed into the
                  Weather API and used for location-based weather lookups
                  without introducing unnecessary complexity or assumptions.
                </span>
              </div>
              <div className="glass api-container rounded-lg flex flex-col gap-2 w-1/2 min-h-[212px] tracking-widest  p-3">
                <h1 className="text-[1.5em]">Weather API</h1>
                <span>
                  The Weather API was used to retrieve local atmospheric,
                  marine, and weather alert data for the selected location. This
                  includes metrics such as wind speed, temperature, humidity,
                  and the probability of rain or snow, along with any relevant
                  weather alerts.
                </span>
                <span>
                  The Weather API requires latitude and longitude as input
                  parameters, which were obtained from Windborne’s balloon
                  location data. Using these coordinates allowed the weather
                  data to be accurately matched to each balloon’s position.
                </span>
              </div>
            </div>
          </div>
          <div className="">
            <ShinyText text="Technology" disabled={false} speed={7} />
            <Loop
              marqueeText="React ✦ React Router ✦ Express ✦ TailwindCSS ✦ MaterialUI ✦ CesiumJS ✦ ResiumJS ✦ React Bits ✦"
              speed={1}
              curveAmount={0}
              direction="right"
              interactive={true}
            />
          </div>
          <div className="p-3 rounded-lg text-[#060010] font-semibold tracking-widest ">
            <div className="glass flex flex-col p-3 gap-3 rounded-lg ">
            <h1 className="text-[1.5em]">
              Issues
            </h1>
            <span>
              The first one being a small struggle that happens every so often
              when you haven't worked with something in some time - and for me
              that was CORS. Since I couldn't call the API's from my React
              browser - I had to create a proxy server. I didn't want to create
              a full Django/Spring backend for the project as that would be
              overkill for something this size. And for that reason - I decided
              to to Express. I had never worked with Express before, but the
              requirements I needed were pretty simple so it only took a little
              bit of time before I got it up and running.
            </span>
            <span>
              The next thing I struggled with was rendering the locations of
              Windborne's balloons onto the CesiumJS globe. But the issue was I
              was having trouble ONLY while trying to render the balloon
              locations after the FIRST API call, not the subsequent ones. After
              the usual struggles and troubleshooting, head-banging, and choice
              words - I found the issue. The problem happened because the
              component was set up in a way that only reads its configuration
              once, when it is first created. Even though the configuration
              values changed later, the component did not re-apply them, so it
              kept using outdated settings. The fix was to make sure the
              component fully re-initializes whenever those settings change,
              which forces it to start over with the correct configuration
              instead of silently ignoring updates.
            </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ShinyText = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};
