import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/api/treasure/:timeStamp", async (req, res) => {
  try {
    const { timeStamp } = req.params; 
    console.log(timeStamp)

    // protects against abritrary URLs
    if (!/^\d{2}\.json$/.test(timeStamp)) {
      return res.status(400).json({ error: "Invalid timeStamp" });
    }

    const upstreamUrl = `https://a.windbornesystems.com/treasure/${timeStamp}`;
    const upstreamRes = await fetch(upstreamUrl);

    if (!upstreamRes.ok) {
      return res.status(upstreamRes.status).send(await upstreamRes.text());
    }

    res.json(await upstreamRes.json());
  } catch (err) {
    res.status(500).json({ error: "Proxy error", detail: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on http://localhost:${PORT}`);
});