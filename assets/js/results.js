var parksEl = document.getElementById('parks');
var locationEl = document.getElementById('location-search');
var searchButton = document.getElementById('search-button');

function hideSearch() {
  document.getElementById('location-search').hidden=true;
  document.getElementById('search-button').hidden=true;
}

function getApi() {
  var npsApiUrl = 'https://developer.nps.gov/api/v1/parks?stateCode=' + locationEl.value + '&limit=8&start=0&q=National%20Park&api_key=bHs0Q9w8lnRTDFP2HjYarQQNliJq6mm7aFKTeF54';
console.log(locationEl.value)
  hideSearch()
  fetch(npsApiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
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
    });
}

searchButton.addEventListener('click', getApi);