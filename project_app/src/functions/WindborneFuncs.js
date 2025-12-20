export const handleWindborneCall = async (setLoading, setLocations) => {
  setLoading(true);
  try {
    const res = await fetch("http://localhost:3001/api/treasure/01.json");
    const data = await res.json();
    setLocations(data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error(error);
  }
};
