/*Psuedo code - user functionality
- User types in box
– User clicks search button or hits return to search
– Seach needs to: 
–––1) Link to next page
–––2) Call APIs using search location
– Store search in local storage
– Other stuff we could do 
–––Add in an area where they can add their name/info that we can store and have a welcome message of "Happy trails [NAME]!"
*/

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
        dropDowns.classList.add("pastCities");
        $('#mainSearch').append(dropDowns)

        for (var i = 0; i < stored.length; i++) {
            var pastCityOpt = document.createElement("option")
            pastCityOpt.value = stored[i]
            $('.pastCities').append(pastCityOpt)  
            //Items are populating but they are not visible. May need to make a new input.     
        }
    }
}
//init()

//Button click
searchBtn.addEventListener("click", parkSearch);

