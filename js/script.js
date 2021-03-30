const form = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const cardImg = document.querySelector(".time");
const cardIcon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUi = (data) => {
  const { cityDets, weather } = data;

  // set Image

  const imageLink = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  cardImg.setAttribute("src", imageLink);

  // set Icon

  const iconLink = `img/icons/${weather.WeatherIcon}.svg`;
  cardIcon.setAttribute("src", iconLink);

  // Update Values

  details.innerHTML = `
   <h5 class="my-3">${cityDets.EnglishName}</h5>
   <div class="my-3">${weather.WeatherText}</div>
   <div class="display-4 my-4">
     <span>${weather.Temperature.Metric.Value}</span>
     <span>&deg;C</span>
   </div>`;

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.city)
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));
}
form.addEventListener("submit", (e) => {
  // prevent Default
  e.preventDefault();

  // Update Values
  localStorage.setItem("city", form.city.value.trim().toLowerCase());
  forecast
    .updateCity(localStorage.city)
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));

  form.reset();
});
