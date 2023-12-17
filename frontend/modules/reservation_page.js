import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let reservationCall = await fetch(config.backendEndpoint +'/reservations/');
    let reservationData = await reservationCall.json();
    return reservationData;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length > 0){
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";
  }else{
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
  
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 reservations.forEach((element,idx) => {
    let tblRow = document.createElement("tr");
    let dt = new Date(element.time).toLocaleString("en-IN",{
      year:"numeric",
      day:"numeric",
      month:"long",
      hour:"numeric",
      minute:"numeric",
      second:"numeric",
      hour12:true,
    });
    let newDt = dt.split(' at').join(',');
    tblRow.innerHTML = `
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.adventureName}</td>
      <td>${element.person}</td>
      <td>${new Date(element.date).toLocaleString("en-IN",{
        day:"numeric",
        year:"numeric",
        month:"numeric",
      })}</td>
      <td>${element.price}</td>
      <td>${newDt}</td>
      <td id=${element.id}>
          <a class="reservation-visit-button" href="../detail/?adventure=${element.adventure}">Visit Adventure</a>
      </td>
    `;
    document.getElementById("reservation-table").appendChild(tblRow);
 });
}

export { fetchReservations, addReservationToTable };
