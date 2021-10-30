"use strict";

const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d128359c080a209d181c208396090fb8&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?api_key=d128359c080a209d181c208396090fb8&query='";

const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

async function getMovies(url, searchTerm) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    if (data.results.length === 0) {
        console.log("Nothing found");
        main.innerHTML = `<h1>Nothing found for "${searchTerm}"</h1>`;
        return;
    }
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { title, poster_path, release_date, vote_average, overview } =
            movie;

        let year = release_date.slice(0, 4);
        if (!year) year = "Year Unknown";

        const movieEl = document.createElement("div");

        movieEl.classList.add("movie");

        movieEl.innerHTML = `
        
                <img src="${IMG_PATH + poster_path}" alt="${title}"
                    
                />
                <div class="movie-info">
                    <h3>${title} (${year})</h3>
                    <span class="${getClassByRate(
                        vote_average
                    )}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                </div>
            
            `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) return "green";
    if (vote >= 5) return "orange";
    return "red";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm && searchTerm !== "") {
        getMovies(SEARCH_API + searchTerm, searchTerm);
        search.value = "";
    } else {
        window.location.reload();
    }
});
