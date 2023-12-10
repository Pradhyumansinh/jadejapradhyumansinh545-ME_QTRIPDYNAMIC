
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let urlParams = new URLSearchParams(search);
  let cityValue = urlParams.get("city");
  return cityValue;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let url = config.backendEndpoint + `/adventures/?city=${city}`;
    let fetchoData = await fetch(url);
    let Adventures = await fetchoData.json();
    return Adventures;
  } catch (error) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((adventure)=>{
    let {id,category,image,name,costPerHead,duration} = adventure;
    let dataDiv = document.getElementById("data");

    let mainDiv = document.createElement("div");
    mainDiv.setAttribute("class","col-6 col-lg-3");
    mainDiv.innerHTML = `
      <a href="/frontend/pages/adventures/detail/?adventure=${id}" id="${id}">
          <div class="activity-card mb-4">
            <div class="category-banner">${category}</div>  
            <img src="${image}" alt="" />
            <div class="d-flex justify-content-between w-100 px-2 pt-1">
              <h6>${name}</h6>
              <h6>${costPerHead}</h6>
            </div>
            <div class="d-flex justify-content-between w-100 px-2 pb-1">
              <h6>Duration</h6>
              <h6>${duration}</h6>
            </div>
        </div>
      </a>
    `;
    dataDiv.append(mainDiv);
    
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(item => (item.duration >= low && item.duration <= high));

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(item => (categoryList.includes(item.category)));

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  let adventureList = list;
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.duration.length > 0 && filters.category.length > 0){
    let low = filters.duration.split('-')[0];
    let high = filters.duration.split('-')[1];
    let categoryList = filterByCategory(list, filters.category);
    let durationList = filterByDuration(categoryList, low, high);
    return durationList;
  }
  if(filters.duration.length > 0){
    
    let low = filters.duration.split('-')[0];
    let high = filters.duration.split('-')[1];
    
    let durationList = filterByDuration(adventureList, low, high);
    return durationList;
  }
  if(filters.category.length > 0){
    let categoryList = filterByCategory(list, filters.category);
    return categoryList;
  }
  // Place holder for functionality to work in the Stubs
  return adventureList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = localStorage.getItem("filters");
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = document.getElementById("category-list");
  // if(filters.duration.length > 0){
  //   let newPill = document.createElement("div");
  //   newPill.setAttribute("id",filters.duration);
  //   newPill.setAttribute("class","category-filter");
  //   newPill.textContent = filters.duration;
  //   categoryList.append(newPill);
  // }
  filters.category.forEach(item => {
    let newPill = document.createElement("div");
    newPill.setAttribute("id",item);
    newPill.setAttribute("class","category-filter");
    newPill.textContent = item;
    categoryList.append(newPill);
  })


}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
