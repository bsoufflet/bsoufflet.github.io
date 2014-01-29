var map, infowindow;
var markers = [];
var infowindowContents = [];
function initialize() {
  $("#map-canvas").css({'height': $(window).height()/1.5});
	var mapOptions = {
		center: new google.maps.LatLng(43.861, 5.570),
		zoom: 11,
    minZoom: 9,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map-canvas"),
	mapOptions);

  infowindow = new google.maps.InfoWindow();

	/*var layer = new google.maps.FusionTablesLayer({
	  query: {
	    select: 'Geocodable address',
	    from: '1TYmLwnVY0MEBO1To19JRuNJmuFHnUl4IM_-keUE'
	  },
	});
	layer.setMap(map);*/

	var churchIcon = {
	    url: 'img/map-church.png',
	    // This marker is 20 pixels wide by 32 pixels tall.
	    size: new google.maps.Size(32, 37),
	    // The origin for this image is 0,0.
	    origin: new google.maps.Point(0,0),
	    // The anchor for this image is the base of the flagpole at 0,32.
	    anchor: new google.maps.Point(0, 32)
    };
  var churchMarker = new google.maps.Marker({
      position: new google.maps.LatLng(43.86252, 5.43007),
      map: map,
      icon: churchIcon,
      title: "Eglise",
      zIndex: 150
  });

  var sauvanIcon = {
    url: 'img/map-coktail.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 37),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };
  var sauvanMarker = new google.maps.Marker({
      position: new google.maps.LatLng(43.91984, 5.75919),
      map: map,
      icon: sauvanIcon,
      title: "Sauvan",
      zIndex: 150
  });

  var retintonIcon = {
    url: 'img/map-bread.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(32, 37),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };
  var retintonMarker = new google.maps.Marker({
      position: new google.maps.LatLng(43.84469, 5.50569),
      map: map,
      icon: retintonIcon,
      title: "Piroublets",
      zIndex: 150
  });

  populateHebergement();
}
google.maps.event.addDomListener(window, 'load', initialize);

function populateHebergement() {
	var query = "SELECT * FROM " +
        '1TYmLwnVY0MEBO1To19JRuNJmuFHnUl4IM_-keUE ORDER BY Ville';
    var encodedQuery = encodeURIComponent(query);

    // Construct the URL
    var url = ['https://www.googleapis.com/fusiontables/v1/query'];
    url.push('?sql=' + encodedQuery);
    url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
    url.push('&callback=?');

    // Send the JSONP request using jQuery
    $.ajax({
      url: url.join(''),
      dataType: 'jsonp',
      success: function (data) {
        var rows = data['rows'];
        var tbody = $("#hotels table>tbody");
        for (var i in rows) {
          var type = rows[i][0];
          var nom = rows[i][1];
          var ville = rows[i][2];
          var prix = rows[i][3];
          var contact = '<a href="' + rows[i][6] + '" class="btn btn-success btn-xs" target="_blank">Site web</a>';
          var remarque = rows[i][7];
          var carte = '<button type="button" class="btn btn-success btn-xs" onclick="clickMarker('+i+')"><span class="glyphicon glyphicon-map-marker"></span> Voir sur la carte</button>'
          tbody.append( '<tr id="hebergement_' + i + '"><td>' + type + '</td><td>' + nom + '</td><td>' + ville + '</td><td>' + prix + '</td><td>' + contact + '</td><td>' + remarque + '</td><td>' + carte + '</td></tr>' );
          var infowindowContent = "<div><b>"+nom+"</b><br><b>type:</b> "+type+"<br><b>prix:</b> "+prix+"<br><b>remarque:</b> "+remarque+"<br>"+contact+"</div>";
          addMarker(i, rows[i][4], rows[i][5], infowindowContent);
        }
      }
    });
}

function addMarker(i, lat, lng, infowindowContent) {
  infowindowContents[i] = infowindowContent;
  var myLatlng = new google.maps.LatLng(lat, lng);
  markers[i] = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: 'Hello World!'
  });
  google.maps.event.addListener(markers[i], 'click', function() {
    infowindow.setContent(infowindowContents[i]);
    infowindow.open(map, markers[i]);
  });
}

function clickMarker(i) {
  location.hash = "#bottom";
  google.maps.event.trigger(markers[i], 'click');
}
