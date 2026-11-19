import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm';
import api_key from '../key.js';

let shows = [];
let result = '';

const getCard = (card) => {
    return `
    <div class="show flex gap-4 items-stretch">
        <img src="https://image.tmdb.org/t/p/w500${card.poster_path}" class="w-[20%] rounded-3xl" alt="${card.overview}">
            <div class="details w-full flex flex-col justify-center gap-3">
                <h3 class="text-white text-[24px] font-semibold">${card.name}</h3>
                <p class="text-[#9CA3AF]">${card.first_air_date}</p>
                <div class="rating flex gap-1 items-center">
                    <span class="text-[#EAB308] font-semibold">${card.vote_average}</span>
                    <img src="./imgs & icons/icons/star.svg" alt="star rating icon" class="w-3">
                </div>
                <p class="text-[#c4c8ce] text-[12px] sm:text-[16px]">${card.overview}</p>
                <button class="w-full text-black bg-[#EAB308] rounded-lg py-2 hover:opacity-60 transition-all duration-300 cursor-pointer"><a href="./pages/details.html?id=${card.id}">View Details</a></button>
            </div>
    </div>
    `
}

const displayThePopularsShowsWhenOpenTheWebsite = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}`);
    const { results } = data;
    for (let i = 0; i < 10; ++i) {
        result += getCard(results[i]);
    }
    document.querySelector(".shows").innerHTML = result;
}

// get the most popular shows
const getPopular = async () => {
    const populars = [];
    const { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}`);
    for (let i = 2; i <= Math.min(data.total_pages, 50); ++i) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&page=${i}`);
        populars.push(...data.results);
    }
    return populars;
}

const setShows = async () => {
    shows = await getPopular();
}

const init = async () => {
    await displayThePopularsShowsWhenOpenTheWebsite();
    await setShows();
}

init();

document.querySelector(".show-more").addEventListener("click", async () => {
    for (let i = 0; i < 5 && shows.length; ++i) {
        result += getCard(shows.shift());
    }
    document.querySelector(".shows").innerHTML = result;
});

const form = document.querySelector(".search");

document.querySelector(".search").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form_data = new FormData(form);
    const movie_name = form_data.get("movie");
    const shows_result = [];
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${encodeURIComponent(movie_name)}`);
    for (let i = 1; i <= Math.min(data.total_pages, 50); ++i) {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${encodeURIComponent(movie_name)}&page=${i}`);
        shows_result.push(...data.results);
    }
    if (!shows_result.length) {
        document.querySelector(".shows").innerHTML = "no shows found";
        shows = [];
        result = '';
    }
    else {
        shows = shows_result;
        result = '';
        for (let i = 0; i < 10 && shows.length; ++i) {
            result += getCard(shows.shift());
        }
        document.querySelector(".shows").innerHTML = result;
    }
});