import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm';
import api_key from '../key.js';

const hero_section = document.querySelector(".hero");
const params = new URLSearchParams(window.location.search);
let show = null;

const getShowDetails = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${params.get('id')}?api_key=${api_key}`);
    return data;
}

const showHero = () => {
    document.querySelector(".hero").innerHTML = `
        <img src="https://image.tmdb.org/t/p/original${show.backdrop_path}" alt="${show.name}" class="w-full h-120 bg-contain">
    `
}

const showCard = (show) => {
    const card = 
    `
        <div class="show flex gap-4">
            <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="w-[15%] rounded-3xl" alt="${show.overview}">
                <div class="details w-full flex flex-col justify-center gap-3">
                    <h3 class="text-white text-[24px] font-semibold">${show.name}</h3>
                    <p class="text-[#9CA3AF]">${show.first_air_date}</p>
                    <div class="rating flex gap-1 items-center">
                        <span class="text-[#EAB308] font-semibold">${show.vote_average}</span>
                        <img src="../imgs & icons/icons/star.svg" alt="star rating icon" class="w-3">
                    </div>
                    <p class="text-[#c4c8ce] text-[12px] sm:text-[16px]">${show.overview}</p>
                </div>
            </div>
    `;
    document.querySelector(".card").innerHTML = card;
}

const init = async () => {
    show = await getShowDetails();
    await showHero();
    await showCard(show);
}

init();