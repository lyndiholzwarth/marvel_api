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
	result = $('.template .character').clone();
	result.attr('id', 'char-'+searchedName.id);

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

	var inputId=searchedName.id;
	//set major events
	getEvents(inputId);
	//set cover images
	getCoverImg(inputId);

	return result;
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
	var searchResults = result.data.results;
	if (searchResults.length===0){
		$('.results').append("There are no Marvel characters whose name starts with those letters. Please try something else.").addClass('noResult');
	}
	else{
		$('.results').removeClass('noResult');
		$.each(result.data.results, function(i, item){
			console.log(item);
			var characterInfo = showCharacter(item);
			$('.results').append(characterInfo);
 		});
	}
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.result').append(errorElem);
	});
};

//comic cover search function
function getCoverImg(inputId){
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
			var comics = coverResult.data.results;
			if (comics.length===0){
				var noComics=
					'<div class="col-sm-6">'+
					'<p>Sorry no covers available</p>'+
					'</div>';
				$('#char-'+inputId).find('#covers').append(noComics);
			}
			else{
				for (var i =0; i<12; i++){
					var item = comics[i];
					var comicThumbHtml=
						'<div class="col-sm-3">'+
							'<div class="comicInfo">'+
							'<img src="'+item.thumbnail.path+'/portrait_fantastic.'+ item.thumbnail.extension+'" class="cover-img">'+
							'</div>'+
						'</div>';
	      			$('#char-'+inputId).find('#covers').append(comicThumbHtml);
      			}
	 		}
		})
		.fail(function(jqXHR, error, errorThrown){
			var errorElem = showError(error);
			$('.result').append(errorElem);
		});
};

//major event search function
function getEvents(inputId){
	var eventRequest = {
	characters: inputId,
	apikey: 'a7ad0b28f4e990a41a767a654ea505e1',
	};
	var eventResult = $.ajax({
		url: "//gateway.marvel.com:80/v1/public/events",
		data: eventRequest,
		dataType: "json",
		type: "GET",
		})
	.done(function(eventResult){
		console.log("&&&&&&&&");
		console.log(eventResult);
		var majorEvents = eventResult.data.results;
			if (majorEvents.length===0){
				var noEvents=
					'<div class="col-sm-6">'+
					'<p>Sorry no major events available</p>'+
					'</div>';
				$('#char-'+inputId).find('#events').append(noEvents);
			}
			else{
				for (var i =0; i<6; i++){
					var item = majorEvents[i];
					console.log(i +"counter here")
					var comicThumbHtml=
						'<div class="col-sm-6">'+
							'<div class="comicInfo">'+
								'<img src="'+item.thumbnail.path+'/portrait_fantastic.'+ item.thumbnail.extension+'" class="cover-img">'+
								'<h2 class="topic">'+item.title +'<h2>'+
								'<p class="right">'+item.description +
								'<br><a href="'+item.urls[0].url+'" target="_blank" class="eventsLink">Learn more here</a>'+
								'</p>'+
							'</div>'+
						'</div>';
	      			$('#char-'+inputId).find('#events').append(comicThumbHtml);
	      		}
      		};
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.result').append(errorElem);
	});
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
	var errorElem = $('.templates .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};
