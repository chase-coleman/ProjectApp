import { ButtonComponent } from "./ButtonComponent";
import Globe from "./Globe";
import ButtonGroup from "@mui/material/ButtonGroup";
import LocationData from "./LocationData";
import { useContext } from "react";
import { AppContext } from "../App";
import Tooltip from "@mui/material/Tooltip";

const CardDisplay = ({
  globe,
  buttons,
  card,
  buttonData,
  changeCallbackPeriod,
  clearLocations,
  isLoading,
  handleWindborneCall,
  setLoading,
  setLocations,
  time,
}) => {
  const { localData } = useContext(AppContext);

  const hasLocalData =
    localData &&
    typeof localData === "object" &&
    Object.keys(localData).length > 0;

  const hasDataNoLocal =
    localData &&
    typeof localData === "object" &&
    Object.keys(localData).length === 0;

  if (globe) {
    return (
      <>
        <Globe />
        <div>
          <ButtonGroup
            variant="contained"
            aria-label="Basic button group"
            className="flex flex-wrap justify-center"
          >
            {buttonData.map((btn) => (
              <Tooltip
                title={`Balloon positions ${btn.text} hrs ago`}
                arrow
                slotProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "rgba(132, 0, 255, 1)",
                      color: "#fff",
                      fontSize: "0.75rem",
                      px: "10px",
                      py: "6px",
                      borderRadius: "2px",
                    },
                  },
                  arrow: {
                    sx: { color: "rgba(132, 0, 255, 1)" },
                  },
                }}
              >
                <ButtonComponent
                  key={btn.text}
                  text={btn.text}
                  styling={
                    time == btn.timePeriod
                      ? "!p-[.5px] button-selected "
                      : "button-primary !p-[.5px]"
                  }
                  onClick={() => changeCallbackPeriod(btn.timePeriod)}
                />
              </Tooltip>
            ))}
            <ButtonComponent
              text="Clear"
              styling="button-primary"
              onClick={clearLocations}
            />
          </ButtonGroup>
        </div>

        <div className="magic-bento-card__content">
          <h2 className="magic-bento-card__title">{card.title}</h2>
        </div>
      </>
    );
  }

  if (buttons) {
    return (
      <>
        <div className="w-full h-full flex items-center justify-center">
          <ButtonComponent
            text="Get Windborne Balloon Positions"
            styling="button-primary h-[60px]"
            loading={isLoading}
            onClick={() =>
              handleWindborneCall(setLoading, setLocations, time ?? "01")
            }
          />
        </div>
        <div className="magic-bento-card__content">
          <h2 className="magic-bento-card__title">{card.title}</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        {!localData ? (
          <span className="text-sm text-white">
            Unavailable data for this location.
          </span>
        ) : Object.keys(localData).length > 0 ? (
          <LocationData />
        ) : (
          <span className="text-sm text-white">
            Interact with the globe to retrieve local weather data from a
            selected Windborne balloon!
          </span>
        )}
      </div>
    </>
  );
};

export default CardDisplay;
