async function getWeather(city) {
  const apiKey = "b59d874756001b26abc9d68974dd0ee0"; // your key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    // update the page
    document.getElementById("status").textContent =
      `${data.name}, ${data.sys.country} — ${data.weather[0].main}`;
    document.getElementById("temp").textContent =
      Math.round(data.main.temp) + "°F";
  } catch (err) {
    document.getElementById("status").textContent = err.message;
    document.getElementById("temp").textContent = "--";
  }
}

// hook up the search form
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.getElementById("q").value.trim();
  if (city) {
    getWeather(city);
  }
});