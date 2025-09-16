async function getWeather(city) {
  const apiKey = "b59d874756001b26abc9d68974dd0ee0"; // your key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    //update text
    document.getElementById("status").textContent =
      `${data.name}, ${data.sys.country} — ${data.weather[0].main}`;
    document.getElementById("temp").textContent =
      Math.round(data.main.temp) + "°F";

    // pick the right image
    const condition = data.weather[0].main; 
    const temp = data.main.temp;
    let imgPath = "assets/unknown.png"; // default

    if (condition.toLowerCase() === "Clear" && temp > 80) {
      imgPath = "assets/unny.jpg";
    } else if (condition === "Clear") {
      imgPath = "assets/Sunny.jpg";
    } else if (condition === "Clouds") {
      imgPath = "assets/Cloudy.jpg";
    } else if (condition === "Rain") {
      imgPath = "assets/rain.png";
    } else if (condition === "Snow") {
      imgPath = "assets/snow.png";
    }

    document.getElementById("scene").src = imgPath;
  } catch (err) {
    document.getElementById("status").textContent = err.message;
    document.getElementById("temp").textContent = "--";
    document.getElementById("scene").src = "assets/unknown.png";
  }
}
/*
    // update the page
    document.getElementById("status").textContent =
      `${data.name}, ${data.sys.country} — ${data.weather[0].main}`;
    document.getElementById("temp").textContent =
      Math.round(data.main.temp) + "°F";
  } catch (err) {
    document.getElementById("status").textContent = err.message;
    document.getElementById("temp").textContent = "--";
  }
}*/

// hook up the search form
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.getElementById("q").value.trim();
  if (city) {
    getWeather(city);
  }
});