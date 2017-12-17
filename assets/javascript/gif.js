alert("Hello");
//global variable
var person = ["Khal Drogo", "Dwight Schrute", "Daenerys Targaryen", "Arya Stark", "Little Finger", "Tyrion Lannister", "Jon Snow"];


function makeButtons() {

    $("#button-holder").empty();

    //for loop
    for (var i = 0; i < topics.length; i++) {
        //make the button
        $("<button>")
            
            .addClass("person btn btn-lg btn-primary")
            .attr("data-name", topics[i])
            .text(topics[i])
            //append the button to the #button-holder div
            .appendTo("#button-holder");
    }
};

function makeGIF() {
    
    $(".person").removeClass("active");
    
    $(this).addClass("active");
   
    $("#image-holder").empty();
    
    var person = $(this).attr("data-name");
    
    var personURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=INDjwrzwZWMhIC36wqMyWiamK2KK7IWNlimit=10";

    //AJAX call
    $.ajax({
        url: personURL,
        method: "GET"
    }).done(function (r) {

        //if there's no images returned we should let the user know
        if (r.data.length == 0) {
            alert("Sorry, but it appears we couldn't find any images with the name " + animal + ". Please check to see if your spelling is off, make a new button, and try again!")
        }

        //otherwise if we got images back we're good to go!
        else {
            //when we got our stuff we gotta make some still images out of them
            for (var i = 0; i < r.data.length; i++) {
                //make a div to store the image and the rating
                $("<div>")
                    //add class so we can get these buddies looking good
                    .addClass("inline text-center")
                    //give it an id that we can use to append the picture to later
                    .attr("id", "animal" + i)
                    //add the rating to the div
                    .html("<p>Rating: " + r.data[i].rating + "</p>")
                    //append it to the #image-holder div
                    .appendTo("#image-holder");
                //make an image tag
                $("<img>")
                    //give it an attribute to go back to later so we know its static
                    .attr({
                        "is-static": "yes",
                        //give it attributes that place the static and moving urls inside the img
                        "static": r.data[i].images.fixed_width_still.url,
                        "motion": r.data[i].images.fixed_width.url,
                        //give it the static url
                        "src": r.data[i].images.fixed_width_still.url,
                    })
                    //give it a class so we can animate it!
                    .addClass("person-image")
                    //prepend this to the div with the rating we just made
                    .prependTo("#person" + i);

            }
        }
    })
};

//function to make our GIFs animate!
function gifAnimate() {
    //if it's static
    if ($(this).attr("is-static") == "yes") {
        //change the static url to the animated one!
        $(this).attr("src", $(this).attr("motion"));
        //change is-static to "no"
        $(this).attr("is-static", "no");
    }
    //otherwise if it's not static
    else {
        //change the animated url to the static one!
        $(this).attr("src", $(this).attr("static"));
        //change is-static back to "yes"
        $(this).attr("is-static", "yes");
    }
};

$(document).ready(function () {
    
    $("#person-submit").click(function (e) {
       
        e.preventDefault();
       
        var person = $("#person-choice").val().trim();
  
        $("#person-choice").val("");
        
        topics.push(animal);
      
        makeButtons();
    })

    //run our make animal GIF function when an animal is clicked
    $(document).on("click", ".person", makeGIF);

    //run our function to make gifs animate or go static again
    $(document).on("click", ".person-image", gifAnimate);

    //calling function to make buttons on page load
    makeButtons();

});
    
       