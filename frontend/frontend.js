

let $body = document.body
let $container = $('<div></div>')
let $resultsContainer = $("<div class='resultsContainer'></div>")
 $resultsContainer.appendTo($body)
let $registrationFormContainer = $(".registrationForm-container")
$registrationFormContainer.hide();


// ===================== Buttons ============================
const $searchBtn = $("#submit");
const $homeBtn = $("#homeBtn");
const $upcomingReleasesBtn= $("#upcomingReleasesBtn");
const $latestReleasesBtn = $("#latestReleasesBtn");
const $wishlistBtn = $("#wishlistBtn");
const $favoritesBtn = $("#favoritesBtn");
const $addToWishlistBtn = $("#addToWishlistBtn");
const $registerBtn = $("#registerBtn");
const $createUserBtn = $("#createUserBtn");
// ==================== Buttons =============================

// ==================== Log In or Register ==================
const $login = $(".form-container")

$registerBtn.click(function(){
     $login.remove();
     $welcomeMessageContainer.remove();
     $registrationFormContainer.show();
})

     $createUserBtn.click(function(){
         
          async function createUser() {
          const formData = new FormData();
           let name = document.getElementById('create-user-firstname').value;
           let userName = document.querySelector('#create-username').value;
           let password = document.querySelector('input[name="createpassword"]').value;
           console.log(name);

           const newUser = {
                name: name,
                user_name: userName,
                password: password
           };

           console.log(newUser)

         await fetch('http://localhost:5050/users/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
           })
           .then(response => response.json())
           .then(data => console.log(data))
           .catch(error => { 
                console.log(error) 
               });
          }
          createUser();

          //gets one user
          //  fetch('http://localhost:5050/users', {
          //           method: 'GET',
          //           headers: {
          //                'Content-Type': 'application/json',
          //           },
          //      //      body: newUser
          //      })
          //      .then(response => response.json())
          //      .then(data => console.log(data))
          //      .catch((error) => {
          //           console.log('Error:', error)
          //      });

          //    createUser('http://localhost:5050/users/', {newUser})
          //      .then(data => {console.log(data)});
})

// async function createUser(url = '', data = {}) {
//      // Default options are marked with *
//      const response = await fetch(url, {
//        method: 'POST', // *GET, POST, PUT, DELETE, etc.
//        mode: 'no-cors', // no-cors, *cors, same-origin
//      //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//      //   credentials: 'same-origin', // include, *same-origin, omit
//      //   headers: {
//      //     'Content-Type': 'application/json'
//      //     // 'Content-Type': 'application/x-www-form-urlencoded',
//      //   },
//      //   redirect: 'follow', // manual, *follow, error
//      //   referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//        body: JSON.stringify(data) // body data type must match "Content-Type" header
//      });
//      return response; // parses JSON response into native JavaScript objects
//    }


// ================= Welcome Message ========================
const $welcomeMessageContainer = $("#welcomeMessageContainer")
const $welcomeMessage = $("#welcomeMessage")
const $welcomeMessageImg = $("#welcomeMessageImg")



// ======================== HOME ================================
$homeBtn.click(function(){
     window.location.reload()
})



//========================== SEARCH FEATURE =========================
$searchBtn.click(function(){
     const $game = $("input[name= 'search']").val()
     console.log($game)

  $.get(`https://api.rawg.io/api/games?search=${$game}&search_precise=true&key=8470d1cdee404549ac2275b1a249b140`, function(data) {
      $(".game-card").remove();
      $login.remove();
      $welcomeMessageContainer.remove();
      console.log(data.results)
      let $results = data.results

      $results.forEach((elem) => {
           createResultCard(elem);
          })
     })
})




//====================  SHOW UPCOMING RELEASES  ====================
$upcomingReleasesBtn.click(function(){
     $.get(`https://api.rawg.io/api/games?dates=2022-04-30,2022-12-30&ordering=-added&key=8470d1cdee404549ac2275b1a249b140`, function(data) {
          $(".game-card").remove();
          $login.remove();
          $welcomeMessageContainer.remove();
          let $results = data.results

      $results.forEach((elem) => {
           createResultCard(elem);

          })
     })
})




//====================  SHOW LATEST RELEASES  ==================
$latestReleasesBtn.click(function(){
     $.get(`https://api.rawg.io/api/games?dates=2022-01-01,2022-04-30&platforms=18,1,7&key=8470d1cdee404549ac2275b1a249b140`, function(data) {
          $(".game-card").remove();
          $login.remove();
          $welcomeMessageContainer.remove();
          let $results = data.results

      $results.forEach((elem) => {
           createResultCard(elem);
          })
     })
})


// ==================== ADD TO WISHLIST =====================





// ================== Helper Functions =========================

//creates a list of genres
function listGenre(elem) {
     var genreArr = [];
     for(let i = 0; i < JSON.stringify(elem.genres.length); i++){
          genreArr.push(elem.genres[i].name);
     }
     genreArr = genreArr.join(' | ')
     return genreArr;
}  

//creates a list  of platforms
function listPlat(elem){
     var platArr = [];
     for(let i = 0; i < JSON.stringify(elem.platforms.length); i++){
          platArr.push(elem.platforms[i].platform.name);
     }
     platArr = platArr.join(' | ')
     return platArr;
}

//creates card from  api data     
function createResultCard(elem){
     let $container = $('<div></div>')
     $container.attr("class","game-card")
     $container.appendTo($resultsContainer)
     const $heading = $("<h2 class='game-title'></h2>");
     const $image = $("<img class='game-image'></ul>");
     const $platHeading = $("<h3 class='platforms'>Platform(s):</h3>")
     const $platforms = $("<text></text>")
     const $genresHeading = $("<h3 class='genres'>Genre(s):</h3>")
     const $genres = $("<text></text>")
     const $releaseDate = $(`<text>Release Date: ${elem.released}</text>`)
     const $rating = $(`<text>Rating: ${elem.rating}/ 5</text>`)
     const $addToWishlistBtn = $("<button id = 'addToWishlistBtn'>Add To Wishlist</button>")
     $heading.text(elem.name)
     $heading.attr("href",)
     $heading.appendTo($container)  
     $image.attr("src", elem.background_image)
     $image.appendTo($container)
     $releaseDate.appendTo($container)
     $rating.appendTo($container)
     $genresHeading.appendTo($container)
     $genres.text(listGenre(elem))
     $genres.appendTo($container)
     $platHeading.appendTo($container)
     $platforms.text(listPlat(elem))
     $platforms.appendTo($container)
     $addToWishlistBtn.appendTo($container)
}