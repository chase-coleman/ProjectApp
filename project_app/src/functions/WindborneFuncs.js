export const handleWindborneCall = async (
  setLoading,
  setLocations,
  timePeriod
) => {
  setLoading(true);

  const url = `http://localhost:3001/api/treasure/${encodeURIComponent( //encodeURIComponent makes a string safe for URL paths
    timePeriod
  )}.json`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(
        `HTTP ${res.status} ${res.statusText} for ${url} - ${body.slice(
          0,
          200
        )}`
      );
    }

    const data = await res.json();

    setLocations(data);
  } catch (error) {
    console.error("Windborne fetch failed", {
      url,
      timePeriod,
      name: error?.name,
      message: error?.message,
    });
  } finally {
    setLoading(false);
  }
};
