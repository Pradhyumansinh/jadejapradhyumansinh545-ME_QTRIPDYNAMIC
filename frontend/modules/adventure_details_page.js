import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  return new URLSearchParams(search).get("adventure");
  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const url = config.backendEndpoint;
    let fetchData = await fetch(`${url}/adventures/detail?adventure=${adventureId}`);
    let fetchAdventures = await fetchData.json();
    return fetchAdventures;
  }catch(e){
    return null;
  }
  
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;
  addBootstrapPhotoGallery(adventure.images);
  document.getElementById("adventure-content").textContent = adventure.content;
}

const bootstrapCarousel = `
<div id="carouselExample" class="carousel slide">
  <div class="carousel-indicators">
    
  </div>
  <div class="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`;

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  let adventureImg = "";
  let carouselIndicators = "";
  images.forEach((adv,index)=>{
    carouselIndicators = carouselIndicators + `
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" ${index === 0 ? 'class="active" aria-current="true"' : ''}  aria-label="Slide ${index}"></button>
    `;

    adventureImg = adventureImg + `<div class="carousel-item ${index ===0 ? "active" : ""}">
                                      <img class="d-block w-100 activity-card-image" src="${adv}" alt="${index} slide">
                                    </div>`;
  })
  photoGallery.innerHTML = bootstrapCarousel;
  document.querySelector(".carousel-indicators").innerHTML = carouselIndicators;
  document.querySelector(".carousel-inner").innerHTML = adventureImg;
  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  }else if(adventure.available && adventure.reserved){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "none";
  }else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").textContent = cost;
}

//Implementation of reservation form submission
async function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async (e)=>{
      e.preventDefault();
      let formElements = form.elements;

      let formData = JSON.stringify({
          name : formElements["name"].value,
          date : formElements["date"].value,
          person : formElements["person"].value,
          adventure : adventure.id
      }); 

      try {
        const apiUrl = config.backendEndpoint + '/reservations/new';
        let response = await fetch(apiUrl,{
          method:"POST",
          body: formData,
          headers: {
            "Content-Type": "application/json",
            },
        });
        // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
        if(response.ok){
          alert("Success!");
          window.location.reload();
        }else{
          alert("Failed!");
        }
      } catch (error) {
        alert("Failed!");
      }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved == true){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
