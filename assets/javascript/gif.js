$(document).ready(function() {

  // Array
  
	var person = ["Khal Drogo", "Little Finger", "Khalessi", "Jon Snow", "Tyrion Lannister", "Arya Stark"];
		
	function renderButtons() {

		// Deletes the buttons before adding new buttons
		$('#personButtons').empty();

		// Loops through 
		for (var i = 0; i < person.length; i++) {
			var a = $('<button>');
      a.text(topics[i].text); 					
      // Provides the initial button text
			a.addClass('rugby'); 						// Added a class
      a.attr('data-search', person[i].search); 	
      // Added a data-attribute for searching
      $('#personButtons').append(a); 				
      // Added the button to the HTML
		}

		$("#newButton").focus();					
	}

	renderButtons();


	$('#submitButton').on('click', function() {
		var userButton = $('#newButton').val().trim();
		
		// Prevents an empty button from being made
		if (userButton != ""){
      var replaced = userButton.split(" ").join("+");	
      	// Replaces whitespaces with "+" for searching
			person[person.length] = {"text" : userButton, "search" : replaced};	
			console.log(topics);
			renderButtons();
		}

		$("#newButton").val("") 			
			.focus();					

		// We have this line so that users can hit "enter" instead of clicking on the button and it won't move to the next page
		return false;
	});

	
	$(document).on('click', 'button',  function() {
	    var b = $(this).data('search');		// 'this' refers to the button that was clicked
	    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";
      console.log(queryURL);
          
// Performing an AJAX request with the queryURL
$.ajax({
url: queryURL,
method: 'GET'
}).done(function(response) {

console.log(response);
var results = response.data;

// Looping through each result item
for (var i = 0; i < results.length; i++) {
var gifDiv = $('<div class="item">');

var rating = results[i].rating;

var r = $('<p>').text("Rating: " + rating);

var gifImage = $('<img>');
gifImage.attr('src', results[i].images.fixed_height_still.url)
.attr('data-still', results[i].images.fixed_height_still.url)
.attr('data-animate', results[i].images.fixed_height.url)
.attr('data-state', "still")
.addClass("personImage");

	  personDiv.append(p)
	  personDiv.append(gifImage);

	  $('#gifs-appear-here').prepend(Div);
	  }

	});
});
	
	
	$(document).on('click', 'personImage',  function() {

	 var state = $(this).data('state');

	  if (state == "still") {
	    console.log("It was still");
	    $(this).attr('src', $(this).data('animate'))
	    .data('state', 'animate');
	  } else {
	    console.log("It was animated");
	    $(this).attr('src', $(this).data('still'))
	    .data('state', 'still');               
	    }

	});

});