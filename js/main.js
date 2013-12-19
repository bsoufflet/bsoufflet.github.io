function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(43.861, 5.570),
		zoom: 11,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
	mapOptions);

	var layer = new google.maps.FusionTablesLayer({
	  query: {
	    select: 'Geocodable address',
	    from: '1TYmLwnVY0MEBO1To19JRuNJmuFHnUl4IM_-keUE'
	  },
	});
	layer.setMap(map);

	var churchMarker = {
	    url: 'img/map-church.png',
	    // This marker is 20 pixels wide by 32 pixels tall.
	    size: new google.maps.Size(32, 37),
	    // The origin for this image is 0,0.
	    origin: new google.maps.Point(0,0),
	    // The anchor for this image is the base of the flagpole at 0,32.
	    anchor: new google.maps.Point(0, 32)
    };
	var churchLatLng = new google.maps.LatLng(43.86252, 5.43007);
    var churchMarker = new google.maps.Marker({
        position: churchLatLng,
        map: map,
        icon: churchMarker,
        title: "Eglise",
        zIndex: 1
    });

}
google.maps.event.addDomListener(window, 'load', initialize);

$( document ).ready(function() {
	var query = "SELECT * FROM " +
        '1TYmLwnVY0MEBO1To19JRuNJmuFHnUl4IM_-keUE';
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
          var contact = rows[i][4];
          tbody.append( '<tr><td>' + type + '</td><td>' + nom + '</td><td>' + ville + '</td><td>' + prix + '</td><td>' + contact + '</td></tr>' );
        }
      }
    });
});
