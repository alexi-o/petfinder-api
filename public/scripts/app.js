var pageDogs = [];
var loveDogs = [];
var hateDogs = [];

$(document).ready(function() {
  console.log('app.js loaded!');
  initialize();
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
          $("#dogStuff").empty();
          console.log(search);
          $.ajax({
            method: 'GET',
            url: '/api/dogs/'+ search,
            data: search,
            success:[function(data){
            console.log(data);
              // dodatgs.forEach(function(dog){
              //   pageDogs.push(dog);
              //   console.log(pageDogs.length);
              //   renderDog(dog);
            // });
          }],
       }); 
    });
        $('#dogStuff').on('click', '.hate-dog', function(e){
            e.preventDefault();
            console.log("Hate dog clicked!");
            var dogId = $(this).val();
            console.log($(this).parents('.dog'));
            var dogHate = $(this).parents('.dog');
            console.log(dogHate + " will be removed");
              for(var i = 0; i<pageDogs.length; i++){
                console.log(pageDogs[i].id);
                if (pageDogs[i]._id === dogId){
                  loveDogs.push(pageDogs[i]);
                  $.ajax({ 
                    method: 'DELETE',
                    url: '/api/dogs/' + pageDogs[i]._id,
                    success: [function(data){
                    console.log(data + "DONE DATA");
                    console.log("Removing " + dogHate);
                    $(dogHate).remove();
                    }]
                  });
                } 
              }
    }); 
        $('.love-dog').on('click', function(e){
            e.preventDefault();
            console.log("Love dog clicked!");
            var dogId = $(this).attr('value');
            console.log(dogId);
              for(var i = 0; i<pageDogs.length; i++){
                console.log("Checking....");
                console.log(pageDogs[i].id);
                if (pageDogs[i].id === dogId){
                  console.log("Love match!");
                  loveDogs.push(pageDogs[i]);
                  $.ajax({
                    method: 'POST',
                    url: '/api/lovers',
                    data: pageDogs[i]
                  });
                } 
              }
    });    
        $('.map-dog').on('click', function(e){
            e.preventDefault();
            console.log("Map dog clicked!");
            var dogId = $(this).attr('value');
            console.log(dogId);
              for(var i = 0; i<pageDogs.length; i++){
                if (pageDogs[i]._id === dogId){
                  console.log("Map dog matched!");
                  console.log(pageDogs[i]);
                  codeAddress(JSON.stringify(pageDogs[i].contact.zip));
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
                url: '/api/dogs/searches/',
                data: age,
                success: [function(data){
                  data.forEach(function(dog){
                  $("#dogStuff").empty();
                  renderDog(dog);
                  });
                }]
          });
            } else if ($(this).val() === 'S' || $(this).val() === 'M' || $(this).val() === 'L' || $(this).val() === 'XL') {
              console.log('Size');
              var size = $(this).val();
              console.log('Size = ' + size);
              $.ajax({
                method: 'GET',
                url: '/api/dogs/searches/',
                success: [function(data){
                  data.forEach(function(dog){
                  $("#dogStuff").empty();
                  renderDog(dog);
                  });
                }]
        });
      }
    });
  });
});

function unRender(dog) {

}

function renderDog(dog) {
  console.log('rendering dog:', dog + " " + dog._id);
  var dogHtml =
  "        <!-- one dog -->" +
  "        <div class='row dog' data-dog-id='" +dog._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin dog internal row -->" +
  "                <div class='column'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail dog-art'>" +
  "                     <img src='" + dog.photos.photo2 +  " alt='dog image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Dog Name:</h4>" +
  "                        <span class='dog-name'>" + dog.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Age:</h4>" +
  "                        <span class='dog-age'>" +  dog.age + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Size:</h4>" +
  "                        <span class='dog-size'>" + dog.size + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Contact:</h4>" +
  "                        <span class='dog-description'>" + "Phone: " + dog.contact.phone + ", Email: " + dog.contact.email + "</span>" +
  "                      </li>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Location:</h4>" +
  "                        <span class='dog-description'>" + dog.contact.address + ", " + dog.contact.city + ", " + dog.contact.state + ", " + dog.contact.zip + "</span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of dog internal row -->" +
  "                 <div class='panel-footer'>" +
  "                   <button class='btn btn-primary map-dog' value='" + dog._id + "'>Map Me!</button>" +
  "                   <button class='btn btn-danger pull-right hate-dog' value='" + dog._id + "'>Hate This Dog!</button>" +
  "                   <button class='btn btn-success pull-right love-dog' value='" + dog._id + "''>Love This Dog!</button>" +
  "                     </div>" + 
  "                </div>" +
  "              </div>" +
  "            </div>" +
  "          </div>" +
  "          <!-- end one dog -->";

$("#dogStuff").prepend(dogHtml);

}