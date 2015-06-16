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
	cover = result.find('.cover-img');
	getCoverImg();
//for each comic, load img
	// http://placcehold.it/168x252?text=cover-img


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
			console.log(item);
			var characterInfo = showCharacter(item);
			$('.results').append(characterInfo);
 		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};

function getCoverImg(){
	// console.log(coverId);
		// cover.attr('src', 'http://placehold.it/168x252?text=cover-img')

	//call end point
	var coverRequest = {
		characterId:1011276,
		apikey: 'a7ad0b28f4e990a41a767a654ea505e1',
	};
	var coverResult = $.ajax({
		url: "//gateway.marvel.com:80/v1/public/characters/"+characterId+"/comics'",
		data: coverRequest,
		dataType: "json",
		type: "GET",
	})
	.done(function(coverResult){
		$.each(coverResult.data.results, function(i, item){
			// console.log("cover info" +item.pageCount);
			// var characterInfo = showCharacter(item);
			// $('.results').append(characterInfo);
			$('.cover-img').attr('src', item.thumbnail.path+'/portrait_fantastic.'+ item.thumbnail.extension)
 		});
	})
	// console.log results
	// populate with this image: http://placehold.it/168x252?text=cover-img
}


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





