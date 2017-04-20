$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/dogs', function(dogs) {
        dogs.forEach(function(dog){
        renderDog(dog);       
        console.log("Render");
    });
        $('#learn-more').on('click', function(e){
          e.preventDefault();
          console.log("Learn more clicked!");
          var dogId = $(this).attr('id');
          console.log(dogID);
          // $.get('/api/dogs/:id', function(dog){
          //   renderDog(dog);
          //   console.log("Rendered " + id);
          // });
    });
        $('#hate-dog').on('click', function(e){
          e.preventDefault();
          console.log("Hate dog clicked!");
    });
        $('#love-dog').on('click', function(e){
          e.preventDefault();
          console.log("Love dog clicked!");
          var dogId = $(this).attr('id');
          console.log(dogId);
    });
  });    
});

function renderDog(dog) {
  console.log('rendering dog:', dog + " " +dog.id.$t);
  var dogHtml =
  "        <!-- one dog -->" +
  "        <div class='row dog' data-dog-id='" + dog.id.$t + "'>" +
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
    "                      </li>" +
    "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Location:</h4>" +
  "                        <span class='dog-description'>" + dog.contact.address1.$t + ", " + dog.contact.city.$t + ", " + dog.contact.state.$t + ", " + dog.contact.zip.$t + "</span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of dog internal row -->" +
  "                 <div class='panel-footer'>" +
  "                   <button class='btn btn-primary learn-more' id=' " + dog.id.$t + "'>Learn More</button>" +
    "                   <button class='btn btn-danger pull-right' id=' " + dog.id.$t + "'>Hate This Dog!</button>" +
    "                   <button class='btn btn-success love-dog pull-right' id=' " + dog.id.$t + "''>Love This Dog!</button>" +
  "                     </div>" + 
  "                </div>" +
  "              </div>" +
  "            </div>" +
  "          </div>" +
  "          <!-- end one dog -->";

$("#dogStuff").append(dogHtml);

}