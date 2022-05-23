let $body = document.body
let $container = $('<div></div>')
// $container.appendTo($body)
const $search = $("#submit")
let $buttonsContainer = $("<div class='buttonsContainer'></div>")
 $buttonsContainer.appendTo($body)
let $homeBtn = $("<button class='homeBtn'>Home</button>")
 $homeBtn.appendTo($buttonsContainer)
let $upcomingReleasesBtn = $("<button>Upcoming Releases</button>")
 $upcomingReleasesBtn.appendTo($buttonsContainer)
let $latestReleasesBtn = $("<button>Latest Releases</button>")
 $latestReleasesBtn.appendTo($buttonsContainer)


// ================= Welcome Message ========================
let $welcomeMessageContainer = $("<div class='welcomeMessageContainer'></div>")
 $welcomeMessageContainer.appendTo($body)
let $welcomeMessage = $("<div class='welcomeMessage'></div>")
 $welcomeMessage.text('Hello, my name is Gibran Reyes and this is my Front End Project. It was made with the help of the RAWG.IO API, a massive video game database. All the information you see was pullled from RAWG.IO. Within this project you can search for video games, view upcoming releases and video games that have been released recently. Game on.')
 $welcomeMessage.appendTo($welcomeMessageContainer)
let $welcomeMessageImg = $("<img =class'welcomeMessageImg'></img>")
 $welcomeMessageImg.attr("src", "pic.jpg")
 $welcomeMessageImg.appendTo($welcomeMessage)
//================= Welcome Message ==========================

let $resultsContainer = $("<div class='resultsContainer'></div>")
 $resultsContainer.appendTo($body)

//home button to reload the page
$homeBtn.click(function(){
     window.location.reload()
})

//========================== SEARCH FEATURE =========================
$search.click(function(){
var $game = $("input[name= 'search']").val()
console.log($game)

$.get(`https://api.rawg.io/api/games?search=${$game}&search_precise=true&key=8470d1cdee404549ac2275b1a249b140`, function(data) {
// console.log(data.results)
$(".game-card").remove();
$(".welcomeMessage").remove();

console.log(data.results)

let $results = data.results

$results.forEach(function(elem){
// creates a list of platforms     
function listPlat(){
    var platArr = [];
     for(let i = 0; i < JSON.stringify(elem.platforms.length); i++){
         platArr.push(elem.platforms[i].platform.name);
         }
         platArr = platArr.join(' | ')
         return platArr;
}
//creates a list of genres
function listGenre() {
     var genreArr = [];
     for(let i = 0; i < JSON.stringify(elem.genres.length); i++){
          genreArr.push(elem.genres[i].name);
     }
          genreArr = genreArr.join(' | ')
          return genreArr;
}
// console.log(listGenre())
// console.log('====== break ======')
     let $container = $('<div></div>')
     // $container.appendTo($resultsContainer)
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
     $heading.text(elem.name)
     $heading.attr("href",)
     $heading.appendTo($container)  
     $image.attr("src", elem.background_image)
     $image.appendTo($container)
     $releaseDate.appendTo($container)
     $rating.appendTo($container)
     $genresHeading.appendTo($container)
     $genres.text(listGenre())
     $genres.appendTo($container)
     $platHeading.appendTo($container)
     $platforms.text(listPlat())
     $platforms.appendTo($container)
    })
  })
})
//=======================  SEARCH FEATURE ==========================



//====================  SHOW UPCOMING RELEASES  ================
$upcomingReleasesBtn.click(function(){
$.get(`https://api.rawg.io/api/games?dates=2022-04-30,2022-12-30&ordering=-added&key=8470d1cdee404549ac2275b1a249b140`, function(data) {
$(".game-card").remove();
$(".welcomeMessage").remove();
// console.log(data.results)
let $results = data.results

$results.forEach(function(elem){
// creates a list of platforms
function listPlat(){
     var platArr = [];
     for(let i = 0; i < JSON.stringify(elem.platforms.length); i++){
          platArr.push(elem.platforms[i].platform.name);
          }
          platArr = platArr.join(' | ')
           return platArr;
     }
//creates a list of genres
function listGenre() {
     var genreArr = [];
     for(let i = 0; i < JSON.stringify(elem.genres.length); i++){
          genreArr.push(elem.genres[i].name);
          }
          genreArr = genreArr.join(' | ')
          return genreArr;
     }              
     // console.log(listGenre())
     // console.log('====== break ======')         
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
     $heading.text(elem.name)
     $heading.attr("href",)
     $heading.appendTo($container)  
     $image.attr("src", elem.background_image)
     $image.appendTo($container)
     $releaseDate.appendTo($container)
     $genresHeading.appendTo($container)
     $genres.text(listGenre())
     $genres.appendTo($container)
     $platHeading.appendTo($container)
     $platforms.text(listPlat())
     $platforms.appendTo($container)
          // console.log(elem.name)
    })
  })
})
//====================  SHOW UPCOMING RELEASES  ================

//====================  SHOW LATEST RELEASES  ==================
$latestReleasesBtn.click(function(){
$.get(`https://api.rawg.io/api/games?dates=2022-01-01,2022-04-30&platforms=18,1,7&key=8470d1cdee404549ac2275b1a249b140`, function(data) {
$(".game-card").remove();
$(".welcomeMessage").remove();
     // console.log(data.results)
let $results = data.results

$results.forEach(function(elem){
// creates a list of platforms     
function listPlat(){
     var platArr = [];
     for(let i = 0; i < JSON.stringify(elem.platforms.length); i++){
          platArr.push(elem.platforms[i].platform.name);
          }
          platArr = platArr.join(' | ')
          return platArr;
     }
//creates a list of genres
function listGenre() {
     var genreArr = [];
     for(let i = 0; i < JSON.stringify(elem.genres.length); i++){
          genreArr.push(elem.genres[i].name);
          }
          genreArr = genreArr.join(' | ')
          return genreArr;
     }       
     // console.log(listGenre())
     // console.log('====== break ======')        
     let $container = $('<div></div>')
     // $container.appendTo($resultsContainer)
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
     $heading.text(elem.name)
     $heading.attr("href",)
     $heading.appendTo($container)  
     $image.attr("src", elem.background_image)
     $image.appendTo($container)
     $releaseDate.appendTo($container)
     $rating.appendTo($container)
     $genresHeading.appendTo($container)
     $genres.text(listGenre())
     $genres.appendTo($container)
     $platHeading.appendTo($container)
     $platforms.text(listPlat())
     $platforms.appendTo($container)
     // console.log(elem.name)
    })
  })
})
//====================  SHOW LATEST RELEASES  ==================