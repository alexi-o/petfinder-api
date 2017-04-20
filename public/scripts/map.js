
//   google.maps.event.addDomListener(map, 'tilesloaded', function codeAddress() {
//   var address = dog.contact.address1.$t + ", " + dog.contact.city.$t + ", " + dog.contact.state.$t + ", " + dog.contact.zip.$t;
//   console.log(address + "ADDRESSSSS TESTTT");
//   var geocoder = new google.maps.Geocoder();
//   console.log('Making marker!');
//   geocoder.geocode({'address': address}), function(results, status) {
//     if (status == 'OK') {
//       map.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Maker({
//         map: map,
//         position: results[0].geometry.location
//       });
//     } else {
//       alert('Geocode was unsuccessful for the following reason: ' + status);
//     };
//   };
// });

// $(document).ready(function() {
//   console.log('MAP.js loaded!');
//     // $.get('/api/dogs', function(dogs) {
//     //     dogs.forEach(function(dog){
//     //      
//     });
//   function initMap() {
//     var uluru = {lat: -25.363, lng: 131.044};
//     var map = new google.maps.Map($('#map'), {
//       zoom: 4,
//       center: uluru
//     });
//     var marker = new google.maps.Marker({
//       position: uluru,
//       map: map
//     });
//   }

//    // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB7CZMeH5ZlzmQLq_RlpWItqmXi44nM5Jg&callback=initMap"
//    //  async defer></script>