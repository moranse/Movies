const apiKey = "bb98eb79";

function searchMovie() {
  const userInput = document.getElementById("userInput").value;
    if (!userInput) {//chek if got input from user
    alert("Please enter movie name");
    return;
  }
  const url = `http://www.omdbapi.com/?t=${userInput}&apikey=${apiKey}`;

  fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
      if (data.Response === "False") {
        console.error("Movie not found:", data.Error);
        alert("Movie not found, try different name");
        return;
      }
      
      forceClean();//clean page before new search
      
      document.querySelector("img").src = data.Poster;
      document.querySelectorAll("p")[0].innerHTML = `Title: ${data.Title}`;
      document.querySelectorAll("p")[1].innerHTML = `Genre: ${data.Genre}`;
      document.querySelectorAll("p")[2].innerHTML = `Year: ${data.Year}`;
      document.querySelectorAll("p")[3].innerHTML = `Plot: ${data.Plot}`;
      document.querySelectorAll("p")[4].innerHTML = `Director: ${data.Director}`;
      document.querySelectorAll("p")[5].innerHTML = `Actors: ${data.Actors}`;

      let ratingList = "";
      if (data.Ratings) {
        for (let rating of data.Ratings) {
          ratingList += `<p>Source: ${rating.Source}, Value: ${rating.Value}</p>`;
        }
      }
      document.getElementById("ratings").innerHTML = ratingList;
    })
}

function clearMovieDetails() {
    document.querySelector("img").src = "";
    document.querySelectorAll("p")[0].innerHTML = "";
    document.querySelectorAll("p")[1].innerHTML = "";
    document.querySelectorAll("p")[2].innerHTML = "";
    document.querySelectorAll("p")[3].innerHTML = "";
    document.querySelectorAll("p")[4].innerHTML = "";
    document.querySelectorAll("p")[5].innerHTML = "";
    document.getElementById("ratings").innerHTML="";
}

function forceClean(){//for clean page
    if(userInput.value===""){
        clearMovieDetails()
      }
  }