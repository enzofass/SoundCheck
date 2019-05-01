
let artist;

function displayShows()
{

const queryUrl = "https://rest.bandsintown.com/artists/"+artist+"/events?app_id=bcb24239b2c4e17c93ccf04de374fb24&date=upcoming";
$.ajax({
    url: queryUrl,
    method:"GET"
})
.then(function (response) {
    console.log(response);
    renderShows(response);
})

}



function renderShows(artist){
    const showContainer = $("<div>");
    showContainer.append(`<h2>${artist[0].lineup}</h2>`);

}

$("#add-artist").on("click", function (event) {
    event.preventDefault();
    artist = $("#artist-input").val().trim();
    displayShows();

})