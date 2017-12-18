  var person = ["Khal Drogo", "Little Finger", "Arya Stark", "Tyrion Lannister", "Jon Snow", "Khalessi"]; //topics array 

function makebutton (){
    $("#buttondiv").empty();
   
    for (var i = 0; i <items.length; i++) {
      var buttons= $("<button>")
      buttons.attr ("data-person", items [i])
      buttons.text (items [i])
      buttons.addClass ("btn")
      $("#buttondiv").append(buttons);
   
    }
   }

makebutton();

$(document).on("click", "#add-item",function(){
 event.preventDefault();
var newitem = $("#form-input").val();
items.push(newitem);
makebutton();
});

//Click for images
$(document).on("click", ".gifimage", function (){
 //grab the state from the image
var state = $(this).attr("data-state");
console.log("this is the state: " + state);
//We need to flip the state from still to animate
if(state === "still"){
 $(this).attr("src", $(this).attr("data-animate"));
 $(this).attr("data-state", "animate");
}

else{
 $(this).attr("src", $(this).attr("data-still"));
 $(this).attr("data-state", "still");

}

});

   // Adding click event for class
   $(document).on("click", ".btn", function() {

   
      var person = $(this).attr("data-person");


     // Constructing a queryURL
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";

     // Performing an AJAX request with the queryURL
     $.ajax({
         url: queryURL,
         method: "GET"
       })
       // After data comes back from the request
       .done(function(response) {
         console.log(queryURL);

         console.log(response);

         var results = response.data;

         // Looping through each result item
         for (var i = 0; i < results.length; i++) {

        
           var personDiv = $("<div>");

           var p = $("<p>").text("Rating: " + results[i].rating);

           // Creating and storing an image tag
           var personImage = $("<img>");
           // Setting the src attribute of the image to a property pulled off the result item
           personImage.attr("src", results[i].images.fixed_height_still.url);
           personImage.attr("data-animate", results[i].images.fixed_height.url);
           personImage.attr("data-still", results[i].images.fixed_height_still.url);
           personImage.attr("data-state", "still");
           personImage.addClass("gifimage");
          


           // Appending the paragraph and image tag to the personDiv
           personDiv.append(p);
           personDiv.append(personImage);

         
           $("#gifs-appear-here").prepend(personDiv);
        }
    });

  });