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
var showCharacter = function(charSearch) {
	
	// clone our result template code
	var result = $('.templates .character').clone();

	//set image
	// var characterThumb = result.find('.characterImg');
	// characterName.text(thumbnail.path)
	
	//set character name
	var characterName = result.find('.character-name');
	characterName.text(charSearch.name);

	// Set comic covers
	// var covers = result.find('.cover-img');
	// covers.attr('src', comics.items.resourceURI);
	
	// // set events
	// var comicEvent = result.find('events a');
	// comicEvent.attr('href', events.items.resourceURI);
	// comicEvent.text(events.items.name);


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
		console.log(result.data.results);
		// var i=result.data.count;
		// console.log(i);
		// var dataName=result.data.results;

		$.each(result.data.results, function(i, item){
			console.log(item);
			var characterInfo = showCharacter(item);
			$('.results').append(characterInfo);
 		});
  //   $.each(dataName, function(index,value){
  //   	console.log(value.name);
  //    //  html += '<a href="https://www.youtube.com/watch?v='+value.id.videoId+'" target="_blank">';
  //   	// html += '<img src='+value.snippet.thumbnails.medium.url+' />';
  //    //  html+='</a>';
  //    //    $('.search-results').html(html);
		// // $.each(result.data, function(i, data) {
		// // 	console.log(data);
		// 	// var showCharacter = showCharacter(result);
		// 	$('.results').append(showCharacter(dataName));
		// });
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