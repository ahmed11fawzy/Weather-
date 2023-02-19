



let searchInp=document.querySelector('#searchInp'),
    searchBtn=document.querySelector('#searchBtn');

let searchLocation=[];
let requestWeatherToday=new XMLHttpRequest;
requestWeatherToday.open('GET','https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=cairo&days=3');
requestWeatherToday.send()
function getPredictionWeather(){
   if(requestWeatherToday.readyState==4 && requestWeatherToday.status==200){
      
      getTodayWeather()
      getNextDayWeather()
      getThirdDayWeather()
      

      
   }
}
requestWeatherToday.addEventListener('readystatechange',function(){

   getPredictionWeather();
})


/* ========================================= */

searchBtn.addEventListener('click',function(){

   requestWeatherToday.open('GET',`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${searchInp.value}&days=3`);
   requestWeatherToday.send();
   getPredictionWeather();
})


function getTodayWeather(){
   searchLocation=JSON.parse(requestWeatherToday.response).location;  
   console.log(searchLocation.name)
   let todayDate=JSON.parse(requestWeatherToday.response).current;
   let box_1=document.querySelector('#todayCard')
         box_1.innerHTML=`
                        <div class="card  rounded-end-0  " >
                        <div class="card-header d-flex justify-content-between text-secondary border-0 "><span>month</span><span class="">${todayDate.last_updated}</span></div>
                        <div class="card-body text-secondary">
                           <h5 class="card-title  ">${searchLocation.name}</h5>
                           <h2 class='fs-80 text-white '>${todayDate.temp_c} <span>&#8451;</span>  <span><img src="${todayDate.condition.icon}" alt=""></span></h2>
                           <p class="card-text text-primary">${todayDate.condition.text}</p>
                        <div class="details">
                           <span class='me-4'><img class='me-2' src="./Img/icon-umberella.png" alt="" srcset=""> ${todayDate.wind_degree} %</span>
                           <span class='me-4'><img class='me-2' src="./Img/icon-wind.png" alt="" srcset="">${todayDate.wind_kph} Km/h </span>
                           <span class='me-4'><img class='me-2' src="./Img/icon-compass.png" alt="" >${todayDate.wind_dir}</span>
                        </div>
                        </div>
                        </div>
         `
}

function getNextDayWeather(){
   let nextDay=JSON.parse(requestWeatherToday.response).forecast.forecastday[1];
   
   let box_2=document.querySelector('#nextDayBox')
   box_2.innerHTML=`
   <div class="card  rounded-end-0   " >
   <div class="card-header d-flex justify-content-between  text-secondary border-0 ">
      <span>month</span><span class="">${nextDay.date}</span>
   </div>
   <div class="card-body text-secondary text-center">
      <h5 class="card-title">  <img src="${nextDay.day.condition.icon}" </h5>
      <h2 class='fs-4 fw-bold text-white '>${nextDay.day.maxtemp_c} <span>&#8451;</span>  </h2>
      <h6>${nextDay.day.mintemp_c} <span>&#8451;</span></h6>
      <p class="card-text text-primary">${nextDay.day.condition.text}</p>
  
   </div>
   </div>
   `
}

function getThirdDayWeather(){
   
   let thirdDay=JSON.parse(requestWeatherToday.response).forecast.forecastday[2];   
      let box_3=document.querySelector('#thirdDay')
         box_3.innerHTML=`
            <div class="card  rounded-end-0   " >
            <div class="card-header d-flex justify-content-between  text-secondary border-0 ">
               <span>month</span><span class="">${thirdDay.date}</span>
            </div>
            <div class="card-body text-secondary text-center">
               <h5 class="card-title">  <img src="${thirdDay.day.condition.icon}" </h5>
               <h2 class='fs-4 fw-bold text-white '>${thirdDay.day.maxtemp_c} <span>&#8451;</span>  </h2>
               <h6>${thirdDay.day.mintemp_c} <span>&#8451;</span></h6>
               <p class="card-text text-primary">${thirdDay.day.condition.text}</p>
         
            </div>
            </div>
         `   

}



/* ============================================ */ 

