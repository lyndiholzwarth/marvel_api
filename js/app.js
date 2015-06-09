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
		event.preventDefault();
		searchTerm=$('#query').val();
		console.log(searchTerm)
		getRequest(searchTerm);
	});

// 	
var showCharacter = function(data) {
	
	// clone our result template code
	var result = $('.templates .character').clone();

	//set image
	var characterThumb = result.find('.characterImg');
	// characterName.text(thumbnail.path)
	
	//set character name
	var characterName = result.find('.character-name');
	characterName.text(name);

	// Set comic covers
	var covers = result.find('.cover-img');
	covers.attr('src', comics.items.resourceURI);
	
	// set events
	var comicEvent = result.find('events a');
	comicEvent.attr('href', events.items.resourceURI);
	comicEvent.text(events.items.name);


	return result;
};


});


function getRequest(searchTerm){
	var request= {
	nameStartsWith: searchTerm,
	orderBy: 'name',
	apikey: 'a7ad0b28f4e990a41a767a654ea505e1',
	};
  	// url = '//gateway.marvel.com:80/v1/public/characters';	
	var result = $.ajax({
		url: "//gateway.marvel.com:80/v1/public/characters",
		data: request,
		dataType: "json",
		type: "GET",
		})
	.done(function(result){
		console.log(result);
		var i=result.data.count;
		console.log(i);
		var name=result.data.results[0].name;
		console.log(name);

		// var searchResults = showSearchResults(request.nameStartsWith, result.data.count);
		// console.log(searchResults);

		// $('.search-results').html(searchResults);

		$.each(result.data, function(i, data) {
			console.log(data);
			var showCharacter = showCharacter(data);
			$('.results').append(showCharacter);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};



// function showResults(results){
//     var html="";
//    // 'https://www.youtube.com/watch?v='
//     $.each(results, function(index,value){
//       html += '<a href="https://www.youtube.com/watch?v='+value.id.videoId+'" target="_blank">';
//     	html += '<img src='+value.snippet.thumbnails.medium.url+' />';
//       html+='</a>';
//         $('.search-results').html(html);
//     });
// };