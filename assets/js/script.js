//Global vars
var parksEl = document.getElementById('parks');//Container for parks card
var searchBtn = document.querySelector("#searchBtn"); //Need to link to the class/ID of button
var userSearch = document.getElementById("mainSearch"); //Need to link to the input id
var pastSearches = JSON.parse(localStorage.getItem("prevArea")) || [];

//Hides search bar
function hideSearch() {
    document.getElementById('#searchBtn').hidden=true;
    document.getElementById('mainSearch').hidden=true;
  }

//Error message code.
function tryAgain() {
    var errorMsg = document.createElement("p");
    errorMsg.classList.add("errorMessage");
    errorMsg.innerHTML = "Sorry, please input a valid request.";
    $('#submissionSection').append(errorMsg);
    };

//Function for form + Saves the input to local 
function parkSearch() {
    //Error message 
    if (!userSearch.value) {
        tryAgain();
        return;
    };

    var requestParksInfo = "https://developer.nps.gov/api/v1/parks?q=" + userSearch.value + "&api_key=bHs0Q9w8lnRTDFP2HjYarQQNliJq6mm7aFKTeF54";

    fetch(requestParksInfo) 
    .then(function (response) {
        return response.json();
    })    
    .then(function (data){
        console.log(data);
        for (var i = 0; i < data.data.length; i++) {
            var parkCard = document.createElement('div');
            parkCard.className = 'park-card';
            var fullParkName = document.createElement('h3');
            var parkImage = document.createElement('img');
            var parkAddress = document.createElement('p');
            var parkDirections = document.createElement('p');
            var parkFees = document.createElement('p');
            fullParkName.textContent = data.data[i].fullName;
            parkImage.textContent = data.data[i].images[0].url;
            parkAddress.textContent = 'Address:' + data.data[i].addresses[0].line1 + ', ' +
            data.data[i].addresses[0].city + ', ' + data.data[i].addresses[0].stateCode +', ' + data.data[i].addresses[0].postalCode;
            parkDirections.textContent = 'Directions:' + data.data[i].directionsInfo;
            //parkFees.textContent = 'Entrance Fees:' + data.data[i].entranceFees.cost[0] + '-' + data.data[i].entranceFees.cost[-1];
            parkCard.append(fullParkName);
            parkCard.append(parkAddress);
            parkCard.append(parkDirections);
            parkCard.append(parkFees);
            parksEl.append(parkCard)
          }
    }) 
    
    
    //Store past searches
    .then( function saveSearch() {
        pastSearches.push(userSearch.value);
        console.log(pastSearches);
        localStorage.setItem("prevArea", JSON.stringify(pastSearches));
    })
    .then(window.location.href = "./results.html"); 

      hideSearch()
         
};
    


//Call past searches from LS + add drop down based on stored values
function init(){
    var stored = JSON.parse(localStorage.getItem("prevArea"))

    if (stored) {      
        var dropDowns = document.createElement("datalist")
        dropDowns.setAttribute("id", "pastCitiesList");
        $('#mainSearch').append(dropDowns)

        for (var i = 0; i < stored.length; i++) {
            var pastCityOpt = document.createElement("option")
            pastCityOpt.value = stored[i]
            pastCityOpt.innerHTML = stored[i]
            $('#pastCitiesList').append(pastCityOpt)     
        }
    }
}
init()

//Submit via button click
searchBtn.addEventListener("click", parkSearch);

//Submit via "return"/"enter"
userSearch.addEventListener("keypress", function(event){
    if(window.event.keyCode == 13) {
        event.preventDefault();
        searchBtn.click();
    }
})

