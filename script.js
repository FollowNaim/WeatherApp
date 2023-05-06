
const searchBtn = document.querySelector("#SearchBtn");
const weatherBox = document.querySelector(".weatherBox");
const weatherDetails = document.querySelector(".weather-details");

const error404 = document.querySelector(".errorBox");
const inputElement = document.querySelector(".searchBox input");


searchBtn.addEventListener("click", ()=>{

const inputElement = document.querySelector(".searchBox input");
const inputData = inputElement.value;

const city = document.querySelector(".searchBox input").value;
 if(inputData.length === 0){
  inputElement.placeholder = "Please Enter A City Name";
  inputElement.classList.add("error");
  return
 }else{
  inputElement.classList.remove("error")
 }
 
 const apiKey = 'bcc629d63f33375872878d1483639e73';
 
 
 fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
 .then(response=>response.json())
 .then(json=>{
  if(json.cod === '404'){
   weatherBox.style.display = "none";
   weatherDetails.style.display = "none";
   error404.style.display = "block";
   document.querySelector(".container").style.height = "550px";
   error404.classList.add("fadeIn");
   return;
  }
  else{
   error404.style.display = "none";
   error404.classList.remove("fadeIn");
  }
  
  const img = document.querySelector(".weatherBox img");
  const temparature = document.querySelector(".temparature");
  const description = document.querySelector(".description");
  const humidity = document.querySelector(".humidity span");
  const wind = document.querySelector(".wind span");
  
  
  switch (json.weather[0].main){
   
   case 'Rain':
    img.src = "images/rain.png"
    break;
   
   case 'Clear':
    img.src = "images/clear.png"
    break;
   
   case 'Haze':
    img.src = "images/mist.png"
    break;
   
   case 'Snow':
    img.src = "images/snow.png"
    break;
   
   default:
   img.src = '';
   
  }
  
  weatherBox.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");
  weatherBox.style.display = '';
  weatherDetails.style.display = '';
  document.querySelector(".container").style.height = '550px';
  
  
  
  
  
  temparature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  wind.innerHTML = `${parseInt(json.wind.speed)}Km/H`;
  humidity.innerHTML = `${json.main.humidity}%`
  
  
 })

});

inputElement.addEventListener("input", () => {
 if (inputElement.length !== 0) {
  inputElement.classList.remove("error")
 }
})