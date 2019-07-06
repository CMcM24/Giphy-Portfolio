//Most of the functionality here works. The page loads fine, and when you click the buttons that are generated at pageload they display gifs and their ratings from the GIPHY API. However, the pause functionality doesn't work, and any new buttons generated after pageload won't respond to the click event (they are given the class that the event is searching for). There is somethign wrong here, but I am not given any errors by VS Code or Chrome. I've moved things around, messed with the scope, but I haven't gotten these remaining bugs fixed.



$(document).ready(function() {


var buttons = ["planet mercury", "planet venus", "planet earth", "mars", "jupiter", "planet saturn", "uranus", "planet neptune", "new horizons", "moon", "europa moon", "nebulas", "galaxies", "space"];

var queryURL;


//This function loops through the array and creates the above buttons. I noticed that if I call this function at the end of the script, the buttons won't react to the click event set for them below. Same thing if I move the entire function to the bottom with the call.

function generateButtons(){

    for(i=0; i<buttons.length; i++){

        var newButtons = $("<button>").text(buttons[i]);
        newButtons.attr("class", "btn btn-info");
        newButtons.attr("data-name", buttons[i]);
        newButtons.attr("style", "margin:2px");

        buttonsDiv = $("#buttons-here");

        buttonsDiv.append(newButtons);
    }
}
generateButtons();

//This click event creates new buttons from the users input into the input element. This works perfect everytime, but for some reason these buttons won't work when clicked, even though they are given the class that is being looked for in the next click event.

$("#create-button").on("click", function(event){

    if($("#gifSearchField").val() !== ""){

        event.preventDefault();

        var gifSearch = $("#gifSearchField").val().trim();
            buttons.push(gifSearch);

        var addedButton = $("<button>").text(gifSearch);
            addedButton.attr("class", "btn btn-info");
            addedButton.attr("data-name", gifSearch);
            addedButton.attr("style", "margin:2px");
        $("#buttons-here").append(addedButton);

        // $("#buttons-here").empty();
        // generateButtons();

        $("#gifSearchField").val("");
    }
    else{
        event.preventDefault();
    }
})

//This click event is for the buttons created, and pulls the gifs and rating from GIPHY. It works with buttons loaded at pageload, but as I stated above, it won't work for new buttons created even though they are given the class this click event is looking for. 

$(".btn-info").on("click", function(){

    var spaceData = $(this).attr("data-name");
    console.log(spaceData);

    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + spaceData + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"
    
        $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        console.log(response);

          var results = response.data;

          for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

              var gifsDiv = $("<div>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var spaceImage = $("<img>");

              spaceImage.attr("src", results[i].images.fixed_height.url);
              spaceImage.attr("still-url", results[i].images.fixed_height_still.url);
              spaceImage.attr("animated-url", results[i].images.fixed_height.url);
              spaceImage.attr("class", "gif");
              spaceImage.attr("data-state", "animated");
              gifsDiv.append(p);
              gifsDiv.append(spaceImage);
              $("#gifs-go-here").prepend(gifsDiv);
            }
          }
    });
});

//This click event is for switching gifs between animted and still. Not sure why this doesn't work either. 

$(".gif").on("click", function(){
    
    var state = $(this).attr("data-state");

    if(state == "animated"){
        $(this).attr("src", $(this).attr("still-url"));
        $(this).attr("data-state", "still");
    }
    else{
        $(this).attr("src", $(this).attr("animated-url"));
        $(this).attr("data-state", "animated");
    }
});




});
