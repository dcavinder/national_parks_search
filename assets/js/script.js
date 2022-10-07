//Global vars
var homeBtn = document.getElementById('fa fa-home');//home button to return to search
var parksEl = document.getElementById('parks');//Container for parks card
var searchBtn = document.querySelector('#searchBtn'); //Need to link to the class/ID of button
var userSearch = document.getElementById('mainSearch'); //Need to link to the input id
var pastSearches = JSON.parse(localStorage.getItem('prevArea')) || [];

//Call past searches from LS + add drop down based on stored values
function init(){
    var stored = JSON.parse(localStorage.getItem('prevArea'))

    if (stored) {      
        var dropDowns = document.createElement('datalist')
        dropDowns.setAttribute('id', 'pastCitiesList');
        $('#mainSearch').append(dropDowns)

        for (var i = 0; i < stored.length; i++) {
            var pastCityOpt = document.createElement('option')
            pastCityOpt.value = stored[i]
            pastCityOpt.innerHTML = stored[i]
            $('#pastCitiesList').append(pastCityOpt)     
        }
    }
}
init()

//Hides search bar
function hideSearch() {
    document.getElementById('mainSearch').hidden=true;
    document.getElementById('searchBtn').hidden=true;
    }

function hideResults() {
    document.getElementById('mainSearch').hidden=false;
    document.getElementById('searchBtn').hidden=false;
    document.getElementById('parks').hidden=true;
    }
    

//Error message code.
function tryAgain() {
    var errorMsg = document.createElement('p');
    errorMsg.classList.add('errorMessage');
    errorMsg.innerHTML = 'Sorry, please input a valid request.';
    $('#submissionSection').append(errorMsg);
    };

//Function for form + Saves the input to local 
function parkSearch() {
    //Error message 
    if (!userSearch.value) {
        tryAgain();
        return;
    } else {
        //Adds most recent search to dropdown
        var pastCityOpt = document.createElement('option')
        pastCityOpt.value = userSearch.value
        pastCityOpt.innerHTML = userSearch.value
        $('#pastCitiesList').append(pastCityOpt);
        //Store past searches
        pastSearches.push(userSearch.value);
        localStorage.setItem("prevArea", JSON.stringify(pastSearches));
        getApi()
    };

   
};

async function weather({ data }) {
    let array = [];
    try {
     await Promise.all(
        data.map(async (park) => {
          const weatherApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + park.addresses[0].city + '&units=imperial&appid=7f42e217c46960a881c3b83169db922f';
          const getWeather = await fetch(weatherApi);
          const weatherData = await getWeather.json();
          console.log(weatherData);
          array.push({
            temp: weatherData.main.temp,
            icon:"http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png" ,
            description: weatherData.weather[0].description,
          })
        })
      );
      return array;
    } catch (error) {
      return error;
    }
  }
  
  async function getApi() {
    var npsApiUrl = 'https://developer.nps.gov/api/v1/parks?stateCode=' + userSearch.value + '&limit=8&start=0&q=National%20Park&api_key=hOiAaZugjjcTZzW8qpARje9bqdxSdmlPnl884z38';
  console.log(userSearch.value)
    hideSearch()
    var response = await fetch(npsApiUrl)
    var parksReturn = await response.json();
    var weatherReturn = await weather(parksReturn);
    console.log(weatherReturn)
        for (var i = 0; i < parksReturn.data.length; i++) {
          var parkCard = document.createElement('div');
          parkCard.className = 'park-card';
          var fullParkName = document.createElement('h3');
          var parkImage = document.createElement('img');
          parkImage.setAttribute('width', '200px');
          var parkAddress = document.createElement('p');
          var parkDirections = document.createElement('p');
          var parkFees = document.createElement('p');
          var parkTemp = document.createElement('p');
          var parkWeatherIcon = document.createElement('img');
          var parkweatherDescription = document.createElement('p');
          fullParkName.innerHTML = parksReturn.data[i].fullName;
          if (parksReturn.data[i].images[1].url = null || undefined) {
          parkImage.src = url('../images/imageunavailable.jpeg')
          } else {  
          parkImage.src = parksReturn.data[i].images[1].url
          };
          if (parksReturn.data[i].addresses[0].line1 = null || undefined) {
          parkAddress.innerHTML = 'Sorry, There is no address information for this park.'
          } else { 
          parkAddress.innerHTML = 'Address:' + parksReturn.data[i].addresses[0].line1 + ', ' +
          parksReturn.data[i].addresses[0].city + ', ' + parksReturn.data[i].addresses[0].stateCode +', ' + parksReturn.data[i].addresses[0].postalCode;
          };
          if (parksReturn.data[i].directionsInfo = null || undefined){
          parkDirections.innerHTML = 'Sorry, There are no directions listed for this park.'
          } else {
          parkDirections.innerHTML = 'Directions:' + parksReturn.data[i].directionsInfo
          };
          if (weatherReturn[i].temp = null || undefined) {
          parkTemp.textContent = 'Sorry, There is no current temperature for this park.'
          } else {
          parkTemp.textContent = 'Temperature:' + weatherReturn[i].temp
          };
          if (weatherReturn[i].icon = null || undefined) {
          parkWeatherIcon.src = ''
          } else {
          parkWeatherIcon.src = weatherReturn[i].icon
          };
          if (weatherReturn[i].description = null || undefined) {
          parkweatherDescription.textContent = 'Sorry, There is no current weather infotmation for this park.'
          } else {
          parkweatherDescription.textContent = weatherReturn[i].description
          };
          parkCard.append(fullParkName);
          parkCard.append(parkImage);
          parkCard.append(parkAddress);
          parkCard.append(parkDirections);
          parkCard.append(parkFees);
          parkCard.append(parkTemp);
          //parkCard.append(parkWeatherIcon);
          parkCard.append(parkweatherDescription);
          parksEl.append(parkCard);
        }
  }  

//Submit via button click
searchBtn.addEventListener('click', parkSearch);

homeBtn.addEventListener('click', hideResults);

//Submit via "return"/"enter"
userSearch.addEventListener('keypress', function(event){
    if(window.event.keyCode == 13) {
        event.preventDefault();
        searchBtn.click();
    }
})

