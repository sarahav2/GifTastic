$(document).ready(function () {
	
		$('button').on('click', function () {
	
			var got = $(this).data('name');
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + got + "&api_key=dc6zaTOxFJmzC&limit=10";
	
			//search for gifs 
			$.ajax({
					url: queryURL,
					method: 'GET'
				})
				.done(function (response) {
	
	
					console.log(response)
	
					var results = response.data;
	
					for (var i = 0; i < results.length; i++) {
	
						var gotDiv = $('<div/>');
	
						var p = $('<p/>');
	
						p.text(results[i].rating);
	
						var gotImage = $('<img/>');
	
						gotImage.addClass('anImg')
	
						gotImage.attr('src', results[i].images.fixed_height.url);
	
						gotImage.attr('data-still', results[i].images.fixed_height_still.url)
	
						gotImage.attr('data-animate', results[i].images.fixed_height.url)
	
							.attr('data-state', 'still');
	
						gotDiv.append(p);
	
						gotDiv.append(gotImage);
	
						gotDiv.prependTo($('#gifs'));
					}
	
					$('.anImg').on('click', function () {
	
						// stop and play
						var state = $(this).attr('data-state');
						console.log(this);
	
						if (state == 'still') {
	
							$(this).attr('src', $(this).data('animate'));
							$(this).attr('data-state', 'animate');
	
						} else {
	
							$(this).attr('src', $(this).data('still'));
							$(this).attr('data-state', 'still');
						}
					});
				});
		});
	
		// buttons 
	
		var gots = [''];
	
		$('#aButton').on('click', function () {
			var gotButton = $("#gif-search").val();
	
			var newButton = $("<button/>").addClass("btn got").attr('data-name', gotButton).html(gotButton)
	
			$("#gotsbuttons").append(newButton);
			console.log("Work");
	
			queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gotButton + "&api_key=dc6zaTOxFJmzC&limit=10";
			console.log(gotButton);
	
			$.ajax({
					url: queryURL,
					method: 'GET'
				})
					
				.done(function (response) {
	
					var results = response.data;
	
					for (var i = 0; i < results.length; i++) {
	
						var gotDiv = $('<div/>');
	
						var p = $('<p/>');
	
						p.text(results[i].rating);
	
						var gotImage = $('<img/>');
	
						gotImage.addClass('anImg')
	
						gotImage.attr('src', results[i].images.fixed_height_still.url);
	
						gotImage.attr('data-still', results[i].images.fixed_height_still.url)
	
						gotImage.attr('data-animate', results[i].images.fixed_height.url)
	
							.attr('data-state', 'still');
	
						gotDiv.append(p);
	
						gotDiv.append(gotImage);
	
						gotDiv.prependTo($('#gifs'));
					}
	
					$('.anImg').on('click', function () {
	
						//stop and play
						var state = $(this).attr('data-state');
						console.log(this);
	
						if (state == 'still') {
	
							$(this).attr('src', $(this).data('animate'));
	
							$(this).attr('data-state', 'animate');
	
						} else {
	
							$(this).attr('src', $(this).data('still'));
	
							$(this).attr('data-state', 'still');
						}
	
					});
	
				});
	
			$("#gif-search").val("");
			return false;
	
		})
	});