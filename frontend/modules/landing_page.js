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
  let mainAnchorTileDiv = document.createElement("a");
  mainAnchorTileDiv.setAttribute("id",id);
  mainAnchorTileDiv.setAttribute("class","tile col-sm-6 col-md-3 col-lg-3");
  mainAnchorTileDiv.setAttribute("href","pages/adventures/?city="+id);
  let imgTileDiv = document.createElement("img");
  imgTileDiv.setAttribute("id",id);
  imgTileDiv.setAttribute("src",image);
  imgTileDiv.setAttribute("class","mt-3");
  mainAnchorTileDiv.append(imgTileDiv);
  let textTileDiv = document.createElement("div");
  textTileDiv.setAttribute("class","tile-text");
  let textDiv = document.createElement("p");
  textDiv.textContent = city;
  textTileDiv.append(textDiv);
  let textDescDiv = document.createElement("p");
  textDescDiv.textContent = description;
  textTileDiv.append(textDescDiv);
  mainAnchorTileDiv.append(textTileDiv)
  data.append(mainAnchorTileDiv);
}

export { init, fetchCities, addCityToDOM };
