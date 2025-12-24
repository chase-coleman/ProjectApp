import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
// const API_KEY = process.env.WEATHER_API_KEY
const WINDBORNE_URL = process.env.WINDBORNE_URL;
const WEATHER_API = process.env.WEATHER_API;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const RENDER_DOMAIN_DEFAULT = process.env.RENDER_DOMAIN_DEFAULT

if (!WINDBORNE_URL) throw new Error("Missing WINDBORNE_URL");
if (!WEATHER_API) throw new Error("Missing WEATHER_API");
if (!WEATHER_API) throw new Error("Missing WEATHER_API");
if (!RENDER_DOMAIN_DEFAULT) throw new Error("missing Default Domain");

const PORT = process.env.PORT || 3001;

const allowedOrigins = new Set([
  RENDER_DOMAIN_DEFAULT,
]);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // curl/postman
      cb(null, allowedOrigins.has(origin));
    },
  })
);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/api/treasure/:timeStamp", async (req, res) => {
  try {
    const { timeStamp } = req.params;

    // protects against abritrary/invalid URLs
    if (!/^\d{2}\.json$/.test(timeStamp)) {
      return res.status(400).json({ error: "Invalid timeStamp" });
    }

    const upstreamUrl = `${WINDBORNE_URL}/${timeStamp}`;
    const upstreamRes = await fetch(upstreamUrl);

    if (!upstreamRes.ok) {
      return res.status(upstreamRes.status).send(await upstreamRes.text());
    }

    res.json(await upstreamRes.json());
  } catch (err) {
    res.status(500).json({ error: "Proxy error", detail: String(err) });
  }
});

// HELPER FUNCTION to make the individual API calls
async function callWeatherAPI(url, params, callNum) {
  const res = await fetch(`${url}?${params.toString()}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${callNum} request failed.`);
  }
  const data = await res.json();
  return data;
}

app.get("/api/treasure/:lat/:lon", async (req, res) => {
  console.log("yippee! being called. ")
  try {
    const { lat, lon } = req.params;

    const params = new URLSearchParams({
      key: WEATHER_API_KEY,
      q: `${lat},${lon}`,
    });

    // an array of different API endpoints we will iterate over
    const urls = [
      `${WEATHER_API}/current.json`,
      `${WEATHER_API}/forecast.json`,
      `${WEATHER_API}/alerts.json`,
      `${WEATHER_API}/marine.json`,
    ];

    // create a list of promises as we iterate over the endpoints
    const promises = urls.map((url, index) => {
      return callWeatherAPI(url, params, index + 1);
    });
    // use Promise.all() to fetch all the data concurrently and wait for all the requests to finish
    const results = await Promise.all(promises);
    
    // format data cleanly 
    return res.json({
      current: results[0],
      forecast: results[1],
      alerts: results[2],
      marine: results[3]
    })
  } catch (err) {
    res.status(500).json({ error: "Proxy error", detail: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});
