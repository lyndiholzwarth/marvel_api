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

	// this function takes the question object returned by StackOverflow and creates new result to be appended to DOM
	var showCharacter = function(charName) {
	
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
	var params= {
	nameStartsWith: searchTerm,
	orderBy: 'name',
	apikey: 'a7ad0b28f4e990a41a767a654ea505e1',
	};
  	url = '//developer.marvel.com/v1/public/characters';
  	$.getJSON(url, params, function(data){
      console.log(data);
      // var myData= data.items;
      // console.log(myData);
    	// $.each(myData)
      // showResults(data.items);
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