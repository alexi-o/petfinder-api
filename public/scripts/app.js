$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/dogs', function(dogs) {
        dogs.forEach(function(dog){
        renderDog(dog);
        console.log("Render");
    });
  });    
});

function renderDog(dog) {
  console.log('rendering dog:', dog);
  var dogHtml =
  "        <!-- one dog -->" +
  "        <div class='row dog' data-dog-id='" + dog.id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin dog internal row -->" +
  "                <div class='column'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail dog-art'>" +
  "                     <img src='" + dog.media.photos.photo[3].$t +  " alt='dog image'>" +
  "                  </div>" +

  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Dog Name:</h4>" +
  "                        <span class='dog-name'>" + dog.name.$t + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Age:</h4>" +
  "                        <span class='dog-age'>" +  dog.age.$t + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Size:</h4>" +
  "                        <span class='dog-size'>" + dog.size.$t + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Description:</h4>" +
  "                        <span class='dog-description'>" + dog.description.$t + "</span>" +
  "                      </li>" +
    "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Contact:</h4>" +
  "                        <span class='dog-description'>" + "Phone: " + dog.contact.phone.$t + ", Email: " + dog.contact.email.$t + "</span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of dog internal row -->" +

  "              </div>" +
  "            </div>" +
  "          </div>" +
  "          <!-- end one dog -->";


$("#dogStuff").append(dogHtml);
}