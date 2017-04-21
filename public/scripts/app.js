var pageDogs = [];
var loveDogs = [];
var hateDogs = [];

$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/dogs', function(dogs) {
        dogs.forEach(function(dog){
        pageDogs.push(dog);
        console.log("Rendered: " + dog);
        renderDog(dog);
    });

        $('#button-search').on('click', function(e){
          e.preventDefault();
          console.log("Learn more clickedd!");
          var search = $('#search').val();
          console.log(search);
          $.ajax({
            method: 'GET',
            url: '/api/dogs/'+ search,
            data: search,
            success:[function(dogs){
            console.log(dogs);
              dogs.forEach(function(dog){
                pageDogs.push(dog);
                console.log(pageDogs.length);
                renderDog(dog);
            });
          }],
       }); 
    });
        $('.hate-dog').on('click', function(e){
            e.preventDefault();
            console.log("Hate dog clicked!");
            var dogId = $(this).attr('value');
            console.log(dogId);
              $.ajax({
                method: 'DELETE',
                url: '/api/dogs/'+dogId,
                data: dogId,
                success: [function(dog){
                  pageDogs.pop(dog);
                  console.log(pageDogs);
          }],
       }); 
    });
        $('.love-dog').on('click', function(e){
            e.preventDefault();
            console.log("Love dog clicked!");
            var dogId = $(this).attr('value');
            console.log(dogId);
              for(var i = 0; i<pageDogs.length; i++){
                console.log("Checking....");
                console.log(pageDogs[i].id.$t);
                if (pageDogs[i].id.$t === dogId){
                  console.log("Match!");
                  loveDogs.push(pageDogs[i]);
                } 
              }
    });    
        $('#map-dog').on('click', function(e){
            e.preventDefault();
            console.log("Map dog clicked!");
            var dogId = $(this).attr('value');
            console.log(dogId);
              for(var i = 0; i<pageDogs.length; i++){
                if (pageDogs[i].id.$t === dogId){
                  console.log("Match!");
                  console.log(pageDogs[i]);
                }
              }
          });
        $('#selector').change(function(e){
          e.preventDefault();
          console.log("CLICKED SELECTOR");
            if($(this).val() === 'Baby' || $(this).val() === 'Young' || $(this).val() === 'Adult'){
              console.log('Age');
              var age = $(this).val();
              console.log('Age = ' + age);
              $.ajax({
                method: 'GET',
                url: '/api/dogs/search/'+ age,
                data: age,
                success:[function(dogs){
                console.log(dogs);
                  dogs.forEach(function(dog){
                    pageDogs.push(dog);
                    console.log(pageDogs.length);
                    renderDog(dog);
            });
          }],
       }); 
            } else if ($(this).val() === 'Small' || $(this).val() === 'Medium' || $(this).val() === 'Large' || $(this).val() === 'Extra Large') {
              console.log('Size');
              var size = $(this).val()[0];
              console.log('Size = ' + size);

          }
        });
  });
});

function unRender(dog) {

}

function renderDog(dog) {
  console.log('rendering dog:', dog + " " + dog.id.$t);
  var dogHtml =
  "        <!-- one dog -->" +
  "        <div class='row dog' data-dog-id='" +dog.id.$t + "'>" +
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
  "                        <h4 class='inline-header'>Breed:</h4>" +
  "                        <span class='dog-description'>" + dog.breeds.breed.$t + "</span>" +
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
  "                   <button class='btn btn-primary map-dog' value='" + dog.id.$t + "'>Map Me!</button>" +
  "                   <button class='btn btn-danger pull-right hate-dog' value='" + dog.id.$t + "'>Hate This Dog!</button>" +
  "                   <button class='btn btn-success pull-right love-dog' value='" + dog.id.$t + "''>Love This Dog!</button>" +
  "                     </div>" + 
  "                </div>" +
  "              </div>" +
  "            </div>" +
  "          </div>" +
  "          <!-- end one dog -->";

$("#dogStuff").prepend(dogHtml);

}