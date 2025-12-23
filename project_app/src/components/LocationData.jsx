import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { appContext } from "../App";
import { Celsius, Fahrenheit } from "../assets/icons";

const LocationData = () => {
  const { localData } = useContext(appContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "Unable to collect local info for selected location."
  );

  return (
    <Card variant="outlined" sx={{ maxWidth: 600, height: "100%", borderRadius: 5, pr: 2, pl: 2, backgroundColor: "rgb(22, 22, 22);", color: "white" }}>
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {localData?.current?.location?.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ width: 100, display: "flex", flexDirection: "column" }}
          >
            <div className="p-0 flex justify-center items-center">
              {localData?.current?.current?.feelslike_f ? (
                <>
                  {localData?.current?.current?.feelslike_f}
                  <Fahrenheit />
                </>
              ) : (
                ""
              )}
            </div>
            <Divider />
            <div className="p-0 flex justify-center items-center">
              {localData?.current?.current?.feelslike_c ? (
                <>
                  {localData?.current?.current?.feelslike_c}
                  <Celsius />
                </>
              ) : (
                ""
              )}
            </div>
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ }}>
          {localData?.current?.current?.condition.text ? (
            localData?.current?.current?.condition.text
          ) : (
            <span>{errorMsg}</span>
          )}
          {localData?.current?.current?.gust_mph
            ? `with winds up to ${localData?.current?.current?.gust_mph} mph`
            : ""}{" "}
          
          {localData?.forecast?.forecast?.forecastday[0]?.day
            ?.daily_chance_of_rain > 0
            ? ` ${localData?.forecast?.forecast?.forecastday[0]?.day?.daily_chance_of_rain}% chance of rain.`
            : ""}
          {localData?.forecast?.forecast?.forecastday[0]?.day
            ?.daily_chance_of_snow > 0
            ? ` ${localData?.forecast?.forecast?.forecastday[0]?.day?.daily_chance_of_snow}% chance of snow`
            : ""}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 0 }}>
        <Typography gutterBottom variant="body2">
          Alerts
        </Typography>
        <span className="!text-[12px]">
          {localData?.alerts?.alerts?.alert[0]?.headline}
        </span>
      </Box>
    </Card>
  );
};

export default LocationData;
