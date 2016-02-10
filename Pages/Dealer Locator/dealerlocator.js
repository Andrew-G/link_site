var map;
var markers = [];
var infoWindow;
var locationSelect;
/* padding - top bar - padding - search - lee way*/
var mapHeight = (window.innerHeight) - 16 - 70 - 16 - 144 - 5;
var resultsHeader = '<li class="heading">Select a result</li>';

function load() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: new google.maps.LatLng(-25.085599, 134.019470),
		zoom: 4,
		mapTypeId: 'roadmap',
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		}
	});
	infoWindow = new google.maps.InfoWindow();
	locationSelect = document.getElementById("locationSelect");
	locationSelect.onchange = function () {
		var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
		if (markerNum != "none") {
			google.maps.event.trigger(markers[markerNum], 'click');
		}
	};
	/* Sets map to be fullscreen */
	document.getElementById("map").style.height = mapHeight + "px";
}

function searchLocations() {
	/* Hides keyboard */
	$('input#addressInput').blur();
	/* Shows results offcanvas */
	$('.off-canvas-wrap').foundation('offcanvas', 'show', 'offcanvas-overlap');
	/* Hides search div, shows new search div */
	$('#search-div').hide();
	$('#new-search-div').show();
	/* Scrolls down to the map */
	scrollToAnchor('map');
	var address = document.getElementById("addressInput").value + ", australia";
	var desiredStockist = $('#typeSelect').val();
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		address: address
	}, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			searchLocationsNear(results[0].geometry.location, desiredStockist);
		} else {
			document.getElementById('locationSelect').innerHTML = '<li class="heading">Address not found.</li><li>' + address + '</li>';
		}
	});
}

function clearLocations() {
	infoWindow.close();
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers.length = 0;
	locationSelect.innerHTML = "";
	var option = document.createElement("div");
	option.value = "none";
	locationSelect.appendChild(option);
}

function getRadius() {
	var radius = document.getElementById('radiusSelect').value;
	return radius;
}

function searchLocationsNear(center, theDesiredStockist) {
	clearLocations();
	
	var searchUrl = 'FindLocationAuto.php?lat=' + center.lat() + '&lng=' + center.lng() + '&radius=' + getRadius();
	downloadUrl(searchUrl, function (data) {
		var xml = parseXml(data);
		var markerNodes = xml.documentElement.getElementsByTagName("marker");

		if (markerNodes.length == 0) {
			var radius = getRadius();
			document.getElementById('locationSelect').innerHTML = '<li class="heading">No dealers within ' + radius + 'kms.</li><li>Try expanding your search radius</li>';
			var southWest = new google.maps.LatLng(-38.754083, 112.939453);
			var northEast = new google.maps.LatLng(-12.168226, 152.709961);
			var bounds = new google.maps.LatLngBounds(southWest, northEast);
		} else {
			document.getElementById('locationSelect').innerHTML = resultsHeader;
			var bounds = new google.maps.LatLngBounds();
			for (var i = 0; i < markerNodes.length; i++) {
				if (theDesiredStockist == markerNodes[i].getAttribute("brand") || theDesiredStockist == "all") {
					var name = markerNodes[i].getAttribute("name");
					var initAddress = markerNodes[i].getAttribute("address");
					/* Adds spaces to the commas */
					var address = initAddress.replace(/,/g , ", ");
					var website = markerNodes[i].getAttribute("website");
					var phone = markerNodes[i].getAttribute("phone");
					var distance = parseFloat(markerNodes[i].getAttribute("distance"));
					var latlng = new google.maps.LatLng(
						parseFloat(markerNodes[i].getAttribute("lat")),
						parseFloat(markerNodes[i].getAttribute("lng"))
					);

					createOption(name, distance, i, address);
					createMarker(latlng, name, address, website, phone);
					bounds.extend(latlng);
				}
			}
		}
		map.fitBounds(bounds);
	});
}

function showMarker(markerNum) {
	$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'offcanvas-overlap');
	scrollToAnchor('map');
	google.maps.event.trigger(markers[markerNum], 'click');
}

function createMarker(latlng, name, address, website, phone) {
	var html = "<span style='text-align: left; font-family: Arial Black, Gadget, sans-serif; font-size: 13px; color: #333333;height:100px;'><strong>" + name + "</strong></span><br/><span style='text-align: left; font-family: Arial, helvetica, sans-serif; font-size: 12px; color: #333333;'>" + address + "<br /><b>Phone:</b> " + '<a href="tel:' + phone + '">' + phone + "</a><br /><b>Web:</b> <a style='color:red' target='_blank' href='" + website + "'>" + website + "</a></span>";
	var marker = new google.maps.Marker({
		map: map,
		position: latlng
	});
	google.maps.event.addListener(marker, 'click', function () {
		infoWindow.setContent(html);
		infoWindow.open(map, marker);
	});
	markers.push(marker);
}

function createOption(name, distance, num, address) {
	var option = document.createElement("li");
	option.value = num;
	option.innerHTML = '<a href="#" onclick="showMarker(' + num + ');"><p><b>' + name + '</b> (<font color=red>' + distance.toFixed(1) + ' kms</font>)</p><p>' + address + '</p></a>';
	locationSelect.appendChild(option);
}

function downloadUrl(url, callback) {
	var request = window.ActiveXObject ?
		new ActiveXObject('Microsoft.XMLHTTP') :
		new XMLHttpRequest;

	request.onreadystatechange = function () {
		if (request.readyState == 4) {
			request.onreadystatechange = doNothing;
			callback(request.responseText, request.status);
		}
	};

	request.open('GET', url, true);
	request.send(null);
}

function parseXml(str) {
	if (window.ActiveXObject) {
		var doc = new ActiveXObject('Microsoft.XMLDOM');
		doc.loadXML(str);
		return doc;
	} else if (window.DOMParser) {
		return (new DOMParser).parseFromString(str, 'text/xml');
	}
}

function showSearchDiv() {
	$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'offcanvas-overlap');
	/* Shows search div, hides new search div */
	$('#new-search-div').hide();
	$('#search-div').show();
	scrollToAnchor('search-div');
	clearLocations();
}

function scrollToAnchor(aid){
    var aTag = $("div[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

function doNothing() {}