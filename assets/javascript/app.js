$(document).ready(function() {

    // gif array
    var topic = ["Jeremy Clarkson", "James May", "Richard Hammond", "Koenigsegg", "Porsche", "GTR", "BMW M3"];
    
    //function that displays gif buttons
    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("gifs");
            gifButton.addClass("btn btn-info")
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    
    //function that adds new button
    function addNewButton() {
        $("#addGif").on("click", function() {
            var gifs = $("#gifInput").val().trim();
            if (gifs === ""){
                return false;
            }
            topic.push(gifs);
    
            displayGifButtons();
            return false;
            });
            
    }
   
    function displayGifs() {
        var gifs = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=I7ZzVrvb2pAjt53IZ5lBQQJeArGYNlKt&limit=10";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        .done(function(response) {
            $("#gifsView").empty();
            var results = response.data;

            for (var i = 0; i<results.length; i++){
                var gifDiv = $("<div>");
                var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);
    
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                $("#gifsView").append(gifDiv);
                
            }
            
        });
    }
      
    displayGifButtons();
    addNewButton();
    
       
    $(document).on("click", ".gifs", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
            
        }

        $("#gifInput").trigger("reset");
    
        });
        
    });