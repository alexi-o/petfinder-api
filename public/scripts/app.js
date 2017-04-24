var pageDogs = [];
var loveDogs = [];
var hateDogs = [];
var searchDogs = [];

$(document).ready(function() {
  console.log('app.js loaded!');
  initialize();
  $.get('/api/dogs', function(dogs) {
        dogs.forEach(function(dog){
        pageDogs.push(dog);
        console.log("Rendered: " + dog);
        renderDog(dog);
        codeAddress(dog.contact.zip, dog.name + ", " + dog.contact.phone + ", " + dog.contact.email);
    });
        $('#all-dogs').on('click', function(e){
          e.preventDefault();
          console.log("Back to all the dogs!");
          $("#dogStuff").empty();
          pageDogs.forEach(function(dog){
            console.log("Back to all the dogs!");
            renderDog(dog);
            codeAddress(dog.contact.zip, dog.name + ", " + dog.contact.phone + ", " + dog.contact.email);
          });
        });
        $('#button-search').on('click', function(e){
          e.preventDefault();
          console.log("Learn more clickedd!");
          var search = $('#search').val();
          $("#dogStuff").empty();
          searchDogs = [];
          console.log(search);
            for(var i = 0; i<pageDogs.length; i++){
              console.log(pageDogs[i].contact.city);
              if(search === pageDogs[i].zip || search === pageDogs[i].contact.city){
                searchDogs.push(pageDogs[i]);
                searchDogs.forEach(function(dog){
                  renderDog(dog);
                  codeAddress(dog.contact.zip, dog.name + ", " + dog.contact.phone + ", " + dog.contact.email);
                });
              }
            }

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
        $('#dogStuff').on('click', '.love-dog', function(e){
            e.preventDefault();
            console.log("Love dog clicked!");
            var dogId = $(this).attr('value');
            var dogLove = $(this).parents('.dog');
            console.log(dogId);
              for(var i = 0; i<pageDogs.length; i++){
                console.log(pageDogs[i]._id);
                if (pageDogs[i]._id === dogId){
                  console.log("Love match!");
                  loveDogs.push(pageDogs[i]);
                  $(dogLove).remove();
                  // $.ajax({
                  //   method: 'POST',
                  //   url: 
                  // })
                } 
              }
    });
        $('#loved-dogs').on('click', function(e){
          e.preventDefault();
          console.log("Love dogs!");
          $("#dogStuff").empty();
          loveDogs.forEach(function(dog){
            renderDog(dog);
            codeAddress(dog.contact.zip, dog.name + ", " + dog.contact.phone + ", " + dog.contact.email);
          });
    });

        // $('.map-dog').on('click', function(e){
        //     e.preventDefault();
        //     console.log("Map dog clicked!");
        //     var dogId = $(this).attr('value');
        //     console.log(dogId);
        //       for(var i = 0; i<pageDogs.length; i++){
        //         if (pageDogs[i]._id === dogId){
        //           console.log("Map dog matched!");
        //           console.log(pageDogs[i]);
        //           codeAddress(pageDogs[i].contact.zip, pageDogs[i].contact.phone + ", " + pageDogs[i].contact.zip);
        //         }
        //       }
        //   });
        $('#selector').change(function(e){
          e.preventDefault();
          $("#dogStuff").empty();
          searchDogs = [];
          console.log("CLICKED SELECTOR");
          console.log($(this).val());
            for(var i = 0; i<pageDogs.length; i++){
              console.log(pageDogs[i].name);
              if($(this).val() === pageDogs[i].age || $(this).val() === pageDogs[i].size){
                searchDogs.push(pageDogs[i]);
                console.log(pageDogs[i]);
                searchDogs.forEach(function(dog){
                  renderDog(dog);
                });
              } else {
      }
    }
  });
});

function renderDog(dog) {
  console.log('rendering dog:', dog + " " + dog._id);
  var dogHtml =
  "        <!-- one dog -->" +
  "        <div class='row dog' data-dog-id='" +dog._id + "'>" +
  "          <div class='col-lg-10'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin dog internal row -->" +
  "                <div class='column'>" +
  "                  <div class='col-md-4 col-xs-12 thumbnail dog-art'>" +
  "                     <img src='" + dog.photos.photo2 +  " alt='dog image'>" +
  "                  </div>" +
  "                  <div class='col-md-8 col-xs-12'>" +
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
  "                        <span class='dog-description'>" + dog.contact.city + ", " + dog.contact.state + ", " + dog.contact.zip + "</span>" +
  "                      </li>" +
    "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Location:</h4>" +
  "                        <span class='dog-description'>" + dog.description + "</span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of dog internal row -->" +
  "                 <div class='panel-footer'>" +
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