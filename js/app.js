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
// 	
	var showCharacter = function(searchedName) {
		// $('.template').removeClass('hidden');
		// $('.templates').addClass('visible');
		// clone our result template code
		var result = $('.template .character').clone();
		console.log("0");

		//set image
		// var characterThumb = result.find('.characterImg');
		// characterThumb.attr('src', item.thumbnail.path+'.jpg')
		
		//set character name
		var characterName = result.find('.character-name');
		// $('.character-name').text(searchedName.name);
		characterName.text(searchedName.name);
console.log(searchedName.name);
		// Set comic covers
		var covers = result.find('.cover-img');
		// covers.attr('src', searchedName.comics.items.resourceURI);
		console.log(covers);

		// // set events
		var comicEvent = result.find('.events a');
		// comicEvent.attr('href', searchedName.events.items.resourceURI);
		// comicEvent.text(searchedName.events.items.name);
		console.log(comicEvent);

		return result;
		console.log("yay");
	};

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
			$('.result').append(characterInfo);
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