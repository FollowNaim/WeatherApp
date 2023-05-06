// Assigning variable 

const searchBtn = document.querySelector("#SearchBtn");
const weatherBox = document.querySelector(".weatherBox");
const weatherDetails = document.querySelector(".weather-details");
const searchBox = document.querySelector(".searchBox")
const error404 = document.querySelector(".errorBox");
const inputElement = document.querySelector(".searchBox input");
const country = document.querySelector(".country");


// Creating Function For Multi Usage


function Weather(){

const inputElement = document.querySelector(".searchBox input");
const inputData = inputElement.value;
const city = document.querySelector(".searchBox input").value;

// Checking if input is empty Raise an Error.

 if(inputData.length === 0){
  inputElement.placeholder = "Please Enter A City Name";
  inputElement.classList.add("error");
  return
 }else{
  inputElement.classList.remove("error")
 }
 
 // Show input Details And Rwsult For.
 
country.innerHTML = "Results For " + inputData;
 
 // Fetching Data From API
 
 const apiKey = 'bcc629d63f33375872878d1483639e73';
 
 
 fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
 .then(response=>response.json())
 .then(json=>{
  
  
  // if City is wrong container will show and error massage with image. And Block the Weather Deatils and temparature from showing.
  
  if(json.cod === '404'){
   weatherBox.style.display = "none";
   weatherDetails.style.display = "none";
   error404.style.display = "block";
   document.querySelector(".container").style.height = "520px";
   error404.classList.add("fadeIn");
   return;
  }
  else{
   error404.style.display = "none";
   error404.classList.remove("fadeIn");
  }
  
  // Assigning Variable And using Switch method for pushing And Changing Data.
  
  
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
  
  // If found Input container will be Changed.
  
  weatherBox.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");
  weatherBox.style.display = '';
  weatherDetails.style.display = '';
  document.querySelector(".container").style.height = '570px';
  
  
  // Pushing Api Data into HTML
  
  
  temparature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
  description.innerHTML = `${json.weather[0].description}`;
  wind.innerHTML = `${parseInt(json.wind.speed)}Km/H`;
  humidity.innerHTML = `${json.main.humidity}%`;
  
  
 })

};

// Assign Declared Function for class changing when input is empty.

inputElement.addEventListener("input", () => {
 if (inputElement.length !== 0) {
  inputElement.classList.remove("error")
 }
});

// Assign Declared Function , Function will work when click event is listening.

searchBtn.addEventListener("click", ()=>{
 Weather();
});

// Function will also work when keydown/enter is pressing.

searchBox.addEventListener("keydown",(e)=>{
 if(e.keyCode === 13){
  e.preventDefault();
  Weather();
 }
})


// End JavaScript