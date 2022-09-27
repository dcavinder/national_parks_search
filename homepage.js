//Global vars
var searchBtn = document.querySelector("#searchBtn"); //Need to link to the class/ID of button
var userSearch = document.getElementById("mainSearch"); //Need to link to the input id
var pastSearches = [];

//Error message code.
function tryAgain() {
    var errorMsg = document.createElement("p");
    errorMsg.classList.add("errorMessage");
    errorMsg.innerHTML = "Sorry, please input a valid request.";
    $('#submissionSection').append(errorMsg);
    };

//Function for form + Saves the input to local 
function parkSearch() {
    console.log(userSearch.value); //test to make sure we are getting the specific user earch value //Works

    //Error message 
    if (userSearch.value === "Search a location" || !userSearch.value) {
        tryAgain();
        return;
    };

    var requestParksInfo = "https://developer.nps.gov/api/v1/parks?q=" + userSearch.value + "&api_key=bHs0Q9w8lnRTDFP2HjYarQQNliJq6mm7aFKTeF54"; //basic test url. Need to figure out way to insert the user search. 

    fetch(requestParksInfo) 
    .then(function (response) {
        return response.json();
    })    
    .then(function (data){
        console.log(data);
        console.log(data.data[0].fullName)
    }) 
    
    //Store past searches
    .then( function saveSearch() {
        pastSearches.push(userSearch.value);
        console.log(pastSearches);
        localStorage.setItem("prevArea", JSON.stringify(pastSearches));
    })
    
    //.then(window.location.href = "./results.html");
};

//Call past searches from LS + add drop down based on stored values
function init(){
    var stored = JSON.parse(localStorage.getItem("prevArea"))
    console.log(stored);

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
