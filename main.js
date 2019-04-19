$(document).ready(()=>{

  //alert(1);
$('#searchForm').on('submit',(e)=>{
// console.log($('#searchText').val());
   let searchText=$('#searchText').val();

  getmovies(searchText);
  e.preventDefault();
});

});

function getmovies(searchText) {
axios.get('https://api.themoviedb.org/3/search/movie?api_key=0e4330fe45dc086495df289bb301ee1a&query='+searchText)
 // axios.get('https://api.themoviedb.org/3/movie/%7Bmovie_id%7D/images?language=en-US&api_key=0e4330fe45dc086495df289bb301ee1a')
   .then((response)=>{
console.log(response);

let movies=response.data.results;
let output='';

$.each(movies,(index,movie)=>{
  // console.log(movie.title);
  output+=`

  <div class="col-md-3">

  <div class="well text-center">
   <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" class="img-thumbnail"></img>

    <h5>${movie.title}</h5>


  <a onclick= "movieSelected(${movie.id})" class="btn btn-primary" id="info" href="#">Movie info</a>
  </div>

  </div>

  `;
});

$('#movies').html(output)//jquery

  })
  .catch((err)=>{

    console.log(err);
  });
}



function movieSelected(id) {
sessionStorage.setItem('movieid',id);
window.location='movie.html';
return false;
}

function getmovie() {
  let movieId=sessionStorage.getItem('movieid');
  // function getmovies(searchText) {

    // console.log(searchText);
    // Make a request for a user with a given ID
   axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=0e4330fe45dc086495df289bb301ee1a")
       .then((response)=>{
  console.log(response);
let movies=response.data;
let output=`
<div class="row">
<div class="col-md-4">
 <img src="https://image.tmdb.org/t/p/w185${movies.poster_path}" class="img-thumbnail"></img>
</div>

<div class="col-md-8">
<h2>${movies.title}</h2>
<ul class="list group">
  <li class="list-group-item">Genre: ${movies.genres[0].name} </li>
  <li class="list-group-item">Released: ${movies.release_date} </li>
     <li class="list-group-item">Runtime: ${movies.runtime+ "&nbspMinutes"} </li>
  <li class="list-group-item">Rated: ${movies.popularity} </li>
    <li class="list-group-item">Tag line: ${movies.tagline} </li>
  <li class="list-group-item">Revenue: ${movies.revenue} </li>
  <li class="list-group-item">Budget: ${movies.budget} </li>
  <li class="list-group-item"><Production Companies: ${movies.production_companies[0].name}</li>


</ul>
</div>
</div>

<div class="row">
<div class="well">
<h3>Overview</h3>
${movies.overview}
<hr>
<a href="http://imdb.com/title/${movies.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
      <a href="index.html" class="btn btn-default">Go Back To Search</a></div>
</div>

`;

$('#movie').html(output)
    })
    .catch((err)=>{

      console.log(err);
    });
  }


// }
