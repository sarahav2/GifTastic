////DECLARE GLOBAL VARIABLES////
var topics = ["Khal Drogo", "Little Finger", "Arya Stark", "Tyrion Lannister", "Jon Snow", "Khalessi"]; //topics array 

////GIPHY-SEARCH OBJECT////
var gifSearch = {
	//Local Varialbles//
	key: "INDjwrzwZWMhIC36wqMyWiamK2KK7IWN", //giphy API key string
	stillVal: "",
	gifVal: "",
	queryUrl: "",
	currSearchText: "",
	responseObj: [],


	//Methods//

	makeQueryUrl: function() { 
		gifSearch.queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch.currSearchText + "&api_key=" + this.key + "&limit=10&fmt=json";
	},

	//searches for gifs based on input text
	searchGifs: function() { 
		gifSearch.currSearchText = $("#search-box").val().trim();
	},

	//makes API request and retrieves json obj (10 gif total)
	getGifs: function() { 
		// Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: gifSearch.queryURL,
        method: "GET"
      }).done(function(response) {
      	console.log(response);
      	// store response
      	gifSearch.responseObj = response;
      	console.log(gifSearch.responseObj);
    	});
	},

	//displays the gif still img file in dynamically created <img> elements.
	//stores the still (data-still) and animated gif (data-gif) url values 
	
	displayGifs: function() { 

		// // store the still image url
        // this.stillVal = ;
        // // store the gif image url
        // this.gifVal = ;

	},

	//dynamically creates a button title by the search term and appends it to #btn-row.
	//store queryUrl val in data-queryUrl attribute
	makeSearchButton: function() {
		var btn = $("<button>");
		btn.attr("type", "button");
		btn.attr("class", "btn btn-default named-button");
		btn.attr("data-queryUrl", gifSearch.queryUrl);
		btn.text(gifSearch.currSearchText);
		$("#btn-row").append(btn);
	}

}

////PAGE LOAD SCRIPTS////

//Populate default buttons based on topics[] values. Stores query url string as
//an attribute of the button element.
for (var i = 0; i < topics.length; i++) {
	gifSearch.currSearchText = topics[i];
		console.log(gifSearch.currSearchText);
	gifSearch.makeQueryUrl();
		console.log(gifSearch.queryUrl);
	gifSearch.makeSearchButton();
}


////ONCLICK EVENTS////

//Text search onclick. target is .search-btn class


//Existing button search onclick. target is .named-button class.
//uses the data-queryUrl attribute for ajax call
$(".named-button").on("click", function(){
	gifSearch.queryUrl = $(this).attr("data-queryUrl");
	console.log(gifSearch.queryUrl);
	gifSearch.getGifs();
});


//Gif start and pause onclick. target is img element