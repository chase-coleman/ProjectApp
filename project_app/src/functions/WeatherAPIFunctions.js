  const getLocalData = async (location) => {
    const url = `/api/treasure/${encodeURIComponent(
      location.lat
    )}/${encodeURIComponent(location.lon)}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(
          `HTTP ${res.status} ${resizeTo.statusText} for ${url} - ${body.slice(
            0,
            200
          )}`
        );
      }
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error("Failed getting local info",{
        url,
        message: err.message,
        stack: err.stack,
        name: err.name,
      });
    }
  };

  export default getLocalData;