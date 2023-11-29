import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description

  let cities = await fetchCities();
  
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  
  //Updates the DOM with the cities
  
    
  // console.log(cities);
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let fetchData = await fetch(config.backendEndpoint + "/cities");
    let cities = await fetchData.json();
    if(!cities){
      throw new error(null);
    }
    return cities;
  } catch (error) {
    return null;
  }
 
}

let cardContent = document.querySelector("#data");
//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let data = document.querySelector("#data")

  let mainDiv = document.createElement("div");
  mainDiv.setAttribute("id",id);
  mainDiv.setAttribute("class","col-sm-6 col-md-3 col-lg-3 mb-3");

  let anchorTag = document.createElement("a")
  anchorTag.setAttribute("href","pages/adventures/?city="+id);

  let mainTileDiv = document.createElement("a");
  mainTileDiv.setAttribute("class","tile");

  let imgTileDiv = document.createElement("img");
  imgTileDiv.setAttribute("id",id);
  imgTileDiv.setAttribute("src",image);

  mainTileDiv.append(imgTileDiv);

  let textTileDiv = document.createElement("div");
  textTileDiv.setAttribute("class","tile-text");

  let textDiv = document.createElement("p");
  textDiv.textContent = city;
  textTileDiv.append(textDiv);

  let textDescDiv = document.createElement("p");
  textDescDiv.textContent = description;
  textTileDiv.append(textDescDiv);
  mainTileDiv.append(textTileDiv);

  anchorTag.append(mainTileDiv);
  mainDiv.append(anchorTag);
  data.append(mainDiv);
}

export { init, fetchCities, addCityToDOM };
