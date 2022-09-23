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
var searchBtn = document.querySelector() //Need to link to the class/ID of button
var userSearch = document.getElementById().trim() //Need to link to the input id


//Function for form + call API
function parkSearch() {
    console.log(userSearch.value); //test to make sure we are getting the specific user earch value

    var requestParksInfo = 'https://developer.nps.gov/api/v1/parks?api_key=bHs0Q9w8lnRTDFP2HjYarQQNliJq6mm7aFKTeF54' //basic test url. Need to figure out way to insert the user search. 

    fetch(requestParksInfo) 
    .then(function (response) {
        return response.json();
    })    
    .then(function (data){
        console.log(data)
    })   
    
    window.location.href = "./results.html"
    
}

//Store past searches
localStorage.setItem("pastSearch", userSearch.val())

//Call past searches from LS
function int(){
    stored = JSON.parse(localStorage.getItem("pastSearch"))
    console.log(stored);
    for (var i = 0; i < stored.length; i++) {
        //NEED TO ADD IN HOW TO APPEND PAST SEARCHES TO THE SEACHBAR
    }
}

//Button click
searchBtn.addEventListener("click", parkSearch)

