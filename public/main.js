let $body = document.body;
let $container = $('<div></div>');
let $resultsContainer = $("<div class='resultsContainer'></div>");
 $resultsContainer.appendTo($body);
let $registrationFormContainer = $(".registrationForm-container");
$registrationFormContainer.hide();
let $deleteAccountFormContainer = $(".deleteAccountForm-container");
$deleteAccountFormContainer.hide();

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
const $loginBtn = $("#loginBtn");
const $cancelRegistrationBtn = $("#cancelRegistrationBtn");
const $deleteAccountBtn = $("#deleteAccountBtn");
const $deleteUserBtn = $("#deleteUserBtn");
const $cancelDeletionBtn = $("#cancelDeletionBtn");
// ==================== Buttons =============================

// ==================== Log In, Register, Delete ==================
const $login = $(".form-container")

$registerBtn.click(function(){
     $login.remove();
     $welcomeMessageContainer.remove();
     $registrationFormContainer.show();
})

$createUserBtn.click(function(){

     async function createUser() {
           let name = document.getElementById('create-user-firstname').value;
           let userName = document.querySelector('#create-username').value;
           let password = document.querySelector('input[name="createpassword"]').value;

           const newUser = {
                name: name,
                user_name: userName,
                password: password
           };
           console.log(newUser)

     await fetch('https://frozen-escarpment-78396.herokuapp.com/users/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
          })
           .then(response => response.json())
           .then(data => console.log(data))
           .catch(error => { 
                console.log(error)
                confirm('that user already exists!') 
               });
               confirm('New user created! Redirecting to home page.')
               done();
          }
          createUser();
          
});

$cancelRegistrationBtn.click(function(){
     window.location.reload()
     });


$deleteAccountBtn.click(function(){
     $login.remove();
     $welcomeMessageContainer.remove();
     $deleteAccountFormContainer.show();
})
     
$deleteUserBtn.click(function(){
     async function deleteThisUser() {
          let userName = document.querySelector('#delete-user').value;
          
          const deleteThisUser = {
               user_name: userName
          };
          console.log(deleteThisUser)

     await fetch('https://frozen-escarpment-78396.herokuapp.com/users', {
               method: 'DELETE',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(deleteThisUser),
         })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => { 
               console.log(error)
               confirm("That user doesn't exists!") 
              });
              confirm('Your account has been deleted :sad face: ')
              console.log("Account has been deleted")
              done();
            
         }
         deleteThisUser();
})

$cancelDeletionBtn.click(function(){
     window.location.reload()
     });
          // //gets all users
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
     $registrationFormContainer.hide();
     $deleteAccountFormContainer.hide();

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
          $registrationFormContainer.hide();
          $deleteAccountFormContainer.hide();
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
          $registrationFormContainer.hide();
          $deleteAccountFormContainer.hide();
          let $results = data.results

      $results.forEach((elem) => {
           createResultCard(elem);
          })
     })
})


// ======================= WISHLIST ==============================


$wishlistBtn.click(function(){
     $login.remove();
     $welcomeMessageContainer.remove();
     $registrationFormContainer.hide();
     $deleteAccountFormContainer.hide();
     $(".game-card").remove();

     const userPrompt = prompt('Whats you username?');
     console.log(userPrompt)

     // $.get(`http://localhost:5050/wishlist/${userPrompt}`, function(data){
     $.get(`https://frozen-escarpment-78396.herokuapp.com/wishlist/${userPrompt}`, function(data){
          let $results = data
          console.log(data);
          
          $results.forEach((elem) => {
               if (elem.length === 0) {
                    console.log('Emptiness')
               } else
          createWishlistResultCard(elem);    
          })
     })
})


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

function listPlatWL(elem){
     var platArr = [];
     for(let i = 0; i < JSON.stringify(elem.platforms.length); i++){
          platArr.push(elem.platforms[i]);
     }
     platArr = platArr.join('')
     // console.log(platArr)
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
     console.log(elem)
     
     $addToWishlistBtn.click(function(){
          const userPrompt = prompt('Whats you username?');

          async function addToWishlist(elem) {
               let title = elem.name;
               let releaseDate = elem.released;
               let platforms = listPlat(elem);
               
               const wantThisGame = {
                    title: title,
                    release_date: releaseDate,
                    platforms: platforms,
                    user_name: userPrompt
               };
               console.log(wantThisGame)
    
     //     await fetch('http://localhost:5050/wishlist', {
          await fetch('https://frozen-escarpment-78396.herokuapp.com/wishlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(wantThisGame),
              })
               .then(response => response.json())
               .then(data => console.log(data))
               .catch(error => { 
                    console.log(error)
                    confirm('that game already exists!') 
                   });
                   confirm("Awesome Choice! It's been added to wishlist!!")
              }
              addToWishlist(elem)

     })
}

function createWishlistResultCard(elem) {
     let $container = $('<div></div>')
     $container.attr("class","game-card")
     $container.appendTo($resultsContainer)
     const $heading = $("<h2 class='game-title'></h2>")
     const $platHeading = $("<h3 class='platforms'>Platform(s):</h3>")
     const $platforms = $("<text></text>")
     // const $genresHeading = $("<h3 class='genres'>Genre(s):</h3>")
     // const $genres = $("<text></text>")
     const $releaseDate = $(`<text>Release Date: ${elem.release_date}</text>`)
     const $deleteFromWishlistBtn = $("<button id = 'addToWishlistBtn'>Delete From Wishlist</button>")
     // const $rating = $(`<text>Rating: ${elem.score}/ 5</text>`)
     $heading.text(elem.title)
     $heading.attr("href",)
     $heading.appendTo($container)
     $releaseDate.appendTo($container)
     // $rating.appendTo($container)
     // $genresHeading.appendTo($container)
     // $genres.text(listGenre(elem))
     // $genres.appendTo($container)
     $platHeading.appendTo($container)
     $platforms.text(listPlatWL(elem))
     $platforms.appendTo($container)
     $deleteFromWishlistBtn.appendTo($container)

     $deleteFromWishlistBtn.click(function(){

          async function deleteFromWishlist(elem) {
               let title = elem.title;
               let userName = elem.user_name
               
               const deleteThisGame = {
                    title: title,
                    user_name: userName
               };
               console.log(deleteThisGame)
    
     //     await fetch('http://localhost:5050/wishlist', {
          await fetch('https://frozen-escarpment-78396.herokuapp.com/wishlist', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(deleteThisGame),
              })
               .then(response => response.json())
               .then(data => console.log(data))
               .catch(error => { 
                    console.log(error)
                    confirm("That game doesn't exists!") 
                   });
                   confirm('Removed from wishlist!!')
                   console.log("The game has been removed from db")
              }
              deleteFromWishlist(elem);
              $container.remove();

     })


}

function done() {
     setInterval(function(){
     window.location.reload();
     },3000);
   }