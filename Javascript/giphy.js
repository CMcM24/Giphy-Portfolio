


var buttons = ["planet mercury", "planet venus", "planet earth", "mars", "jupiter", "planet saturn", "uranus", "planet neptune", "new horizons", "moon", "europa moon", "nebulas", "galaxies", "space"];

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


$(".btn-info").on("click", function(){

    var spaceData = $(this).attr("data-name");
    console.log(spaceData);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + spaceData + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"
    
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





