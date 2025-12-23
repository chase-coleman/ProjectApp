import { ButtonComponent } from "./ButtonComponent";
import Globe from "./Globe";
import ButtonGroup from "@mui/material/ButtonGroup";
import LocationData from "./LocationData";

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
              <ButtonComponent
                key={btn.text}
                text={btn.text}
                styling={time == btn.timePeriod ? "!p-[.5px] button-selected " :"button-primary !p-[.5px]"}
                onClick={() => changeCallbackPeriod(btn.timePeriod)}
              />
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
    <div className=" flex justify-center items-center w-full h-full">
  <LocationData />
    </div>
    </>
  );
};

export default CardDisplay;