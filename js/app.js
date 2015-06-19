$(document).ready(function(){
	//sticky header, with size adjustment
	$(window).scroll(function() {
	if ($(this).scrollTop() > 1){  
	    $('header').addClass("sticky");
	    $('.marvelLogo').addClass("sticky");
	    $('.topNav').addClass("sticky");
	    $('.title').addClass('hidden');
	  }
	  else{
	    $('header').removeClass("sticky");
	    $('.marvelLogo').removeClass("sticky");
	   	$('.topNav').removeClass("sticky");
	   	$('.title').removeClass('hidden');
	  }
	});

	//get search box entry
	$('#search-term').submit(function(event){
		// zero out results if previous search has run
		$('.results').html('');
		event.preventDefault();
		// get the value of the tags the user submitted
		var searchTerm=$('#query').val();
		console.log(searchTerm)
		getRequest(searchTerm);
	});
});

//show results function
var showCharacter = function(searchedName) {

	// clone our result template code
	var result = $('.template .character').clone();

	//set image
	var characterThumb = result.find('.characterImg');
	if (searchedName.thumbnail===null){
		console.log("no picture");
		characterThumb.attr('alt', "Sorry, no picture available");
	}
	else{
		characterThumb.attr('src', searchedName.thumbnail.path + '/portrait_fantastic.'+ searchedName.thumbnail.extension)
	};
	
	//set character name
	var characterName = result.find('.character-name');
	characterName.text(searchedName.name);
	console.log(searchedName.name);

	//  Set character description
	var charDescription = result.find('.description');
	if (searchedName.description===""){
		console.log("no description");
		charDescription.text("Sorry, no description");
	}
	else{
		charDescription.text(searchedName.description);
	};

	// Set comic covers


	//if searched name, has comics to show, show them, if not, do nothing
	// to show comics, use id# to run through "get request"
	
	if (searchedName.comics.available>0){
		var inputId=searchedName.id;
		console.log("comics here!")
		for(i = 0; i < 5; i++){
			getCoverImg(inputId);
		}
	}
	else{
		console.log("no comics")
	};

//for each comic, load img
	// http://placehold.it/168x252?text=cover-img


	// set events
	// var comicEvent = result.find('.events a');
	// if (searchedName.events.returned===0){
	// 	console.log("no events");
	// 	comicEvent.text("Sorry, no major events to share")
	// }
	// else{
	// comicEvent.attr('href', searchedName.events.items[0].resourceURI+"?apikey=a7ad0b28f4e990a41a767a654ea505e1");
	// comicEvent.text(searchedName.events.items[0].name);
	// console.log(searchedName.events.items[0].resourceURI+"?apikey=a7ad0b28f4e990a41a767a654ea505e1");
	// }
	// console.log(comicEvent);
//resesoure uri gives id # of story http://gateway.marvel.com/v1/public/events/116?apikey=a7ad0b28f4e990a41a767a654ea505e1


	return result;
	console.log("yay");
};

// Set comic covers
var showComic = function(coverImg) {
	var comicResult = $('.comicImage').clone();
	var comicImage = comicResult.find('.cover-img');
	$('.cover-img').attr('src','http://placehold.it/168x252?text=cover-img');
	
	return comicResult;
};

//character search function
function getRequest(searchTerm){
	var request = {
		nameStartsWith: searchTerm,
		orderBy: 'name',
		apikey: 'a7ad0b28f4e990a41a767a654ea505e1',
	};
	var result = $.ajax({
		url: "//gateway.marvel.com:80/v1/public/characters",
		data: request,
		dataType: "json",
		type: "GET",
	})
	.done(function(result){
		$.each(result.data.results, function(i, item){
			// console.log(item);
			var characterInfo = showCharacter(item);
			$('.results').append(characterInfo);
 		});
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log("character search error")
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};

function getCoverImg(inputId){
	//call end point
	var coverRequest = {
		characters: inputId,
		apikey: 'a7ad0b28f4e990a41a767a654ea505e1',
	};
	var coverResult = $.ajax({
		url: '//gateway.marvel.com:80/v1/public/comics',
		data: coverRequest,
		dataType: "json",
		type: "GET",
	})
	.done(function(coverResult){
		$.each(coverResult.data.results, function(i, item){
			console.log("running img"+item);
			var coverInfo = showComic(item);
			$('.cover-Result').append(coverInfo);
 		});
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log("cover image error")
		// var errorElem = showError(error);
		// $('.search-results').append(errorElem);
	});
};

//event call function
function getEvents(givenIdNumber){
	var eventRequest = {
	nameStartsWith: searchTerm,
	orderBy: 'name',
	apikey: 'a7ad0b28f4e990a41a767a654ea505e1',
	};
	var eventResult = $.ajax({
		url: "//gateway.marvel.com:80/v1/public/events/",
		data: request,
		dataType: "json",
		type: "GET",
		})
	.done(function(eventResult){
		console.log(eventResult)
	})
}





