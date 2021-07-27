$(function() {
	
	$("#search").keypress(keywordSearch);
	
	//getBusiness(keywordSearch);
	
	function getBusinessReviews(id) {
		$.ajax({
			url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id+"/reviews",
			headers: {
				Authorization: "Bearer wGRJ1bokra5Wv9aPSnXG8EzHvEn01bT9jlC55vKaiep1kXA352kFp0z2tC4WxMBuWSaNXitTbZClg3zXF6tn9uwNn9E5IlRmswL0TUL8WpjqwQlGlu61ZPTmqbnwYHYx"
			},
				method: "GET",
				dataType: "json",
				data: {
					term: keyword,
					location: "Omaha"
				},
				error: ajaxError,
				success: function(data) {
					console.log(data);
					console.log(data.reviews[1].text);
					console.log(data.reviews[1].user);
				}
		})
	}
	
	function getBusiness(id) {
		$.ajax({
			url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/"+id,
			headers: {
					Authorization: "Bearer wGRJ1bokra5Wv9aPSnXG8EzHvEn01bT9jlC55vKaiep1kXA352kFp0z2tC4WxMBuWSaNXitTbZClg3zXF6tn9uwNn9E5IlRmswL0TUL8WpjqwQlGlu61ZPTmqbnwYHYx"
				},
				method: "GET",
				dataType: "json",
				data: {
				
				},
				error: ajaxError,
				success: function(data) {
					console.log(data);

			}
		})
	}
	
	function keywordSearch(event) {
	if (event.which == 13) {
		
		var keyword = $("#search").val();
		console.log(keyword);
		getBusinesses(keyword);
		}
	}
	
	function getBusinesses(keyword) {
	
			$.ajax({
				url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search",
				headers: {
					Authorization: "Bearer wGRJ1bokra5Wv9aPSnXG8EzHvEn01bT9jlC55vKaiep1kXA352kFp0z2tC4WxMBuWSaNXitTbZClg3zXF6tn9uwNn9E5IlRmswL0TUL8WpjqwQlGlu61ZPTmqbnwYHYx"
				},
				method: "GET",
				dataType: "json",
				data: {
					term: keyword,
					location: "Omaha"
				},
				error: ajaxError,
				success: function(data) {
					console.log(data);					
										
					buildBusinesses(data);
				}
			})	
		}	
	
});

function ajaxError() {
	alert("Ajax Error!");
}

function buildBusinesses(data) {
	
	$(".card").remove();
	for (var i=0; i<data.businesses.length; i++) {
		
		var $bus = data.businesses[i];
		var $business = $("#business-card").clone();
		$business.removeAttr("id");
		$business.addClass("card");
		$business.find(".business-image img").attr("src", $bus.image_url);
		$business.find(".business-title").append($bus.name);
		$business.find(".business-rating").append($bus.rating);
		$business.find(".review-count").append($bus.review_count);
		$business.find(".business-address").append($bus.location.display_address);
		$("#businesses").append($business);
	}
}