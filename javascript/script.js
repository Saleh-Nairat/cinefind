import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm';

const api_key = 'd2764e5027b3ac6457052f1be0dac63b';
let populars = [] , movies = [];
let result = '';

const displayThePopularsMoviesWhenOpenTheWebsite = async()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`);
    const {results} = data;
    for(let i = 0 ; i < 10 ; ++i){
        result += 
        `
            <div class="movie flex gap-4 items-stretch">
                    <img src="https://image.tmdb.org/t/p/w500${results[i].poster_path}" class="w-[20%] rounded-3xl" alt="${results[i].overview}">
                    <div class="details w-full flex flex-col justify-center gap-3">
                        <h3 class="text-white text-[24px] font-semibold">${results[i].title}</h3>
                        <p class="text-[#9CA3AF]">${results[i].release_date}</p>
                        <span class="text-[#EAB308] font-semibold">${results[i].vote_average}</span>
                        <p class="text-[#c4c8ce] text-[12px] sm:text-[16px]">${results[i].overview}</p>
                        <button class="w-full text-black bg-[#EAB308] rounded-lg py-2 hover:opacity-60 transition-all duration-300 cursor-pointer"><a href="">View Details</a></button>
                    </div>
                </div>
        `
    }
    document.querySelector(".movies").innerHTML = result;
}

displayThePopularsMoviesWhenOpenTheWebsite();

// get the most popular populars
const getPopular = async ()=>{
    const populars = [];
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`);
    for(let i = 2 ; i <= Math.min(data.total_pages , 500) ; ++i){
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=${i}`);
        populars.push(...data.results);
    }
    return populars;
}

const init = async ()=>{
    populars = await getPopular();
    movies = populars;
}

init();

document.querySelector(".show-more").addEventListener("click" , async()=>{
    for(let i = 0 ; i < 5 && movies.length ; ++i){
        result += 
        `
            <div class="movie flex gap-4 items-stretch">
                    <img src="https://image.tmdb.org/t/p/w500${movies[0].poster_path}" class="w-[20%] rounded-3xl" alt="${movies[0].overview}">
                    <div class="details w-full flex flex-col justify-center gap-3">
                        <h3 class="text-white text-[24px] font-semibold">${movies[0].title}</h3>
                        <p class="text-[#9CA3AF]">${movies[0].release_date}</p>
                        <span class="text-[#EAB308] font-semibold">${movies[0].vote_average}</span>
                        <p class="text-[#c4c8ce] text-[12px] sm:text-[16px]">${movies[0].overview}</p>
                        <button class="w-full text-black bg-[#EAB308] rounded-lg py-2 hover:opacity-60 transition-all duration-300 cursor-pointer"><a href="">View Details</a></button>
                    </div>
                </div>
        `
        movies.shift();
    }
    document.querySelector(".movies").innerHTML = result;
});

const form = document.querySelector(".search");

document.querySelector(".search").addEventListener("submit" , async(e)=>{
    e.preventDefault();
    const form_data = new FormData(form);
    const movie_name = form_data.get("movie");
    const movies_result = [];
    const {data} = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${encodeURIComponent(movie_name)}`);
    for(let i = 1 ; i <= data.total_pages ; ++i){
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${encodeURIComponent(movie_name)}&page=${i}`);
        movies_result.push(...data.results);
    }
    if(!movies_result.length){
        document.querySelector(".movies").innerHTML = "no movies found";
    }
    else{
        movies = movies_result;
        console.log(movies);
        result = '';
        for(let i = 0 ; i < 10 && movies.length ; ++i){
            result += 
            `
                <div class="movie flex gap-4 items-stretch">
                        <img src="https://image.tmdb.org/t/p/w500${movies[0].poster_path}" class="w-[20%] rounded-3xl" alt="${movies[0].overview}">
                        <div class="details w-full flex flex-col justify-center gap-3">
                            <h3 class="text-white text-[24px] font-semibold">${movies[0].name}</h3>
                            <p class="text-[#9CA3AF]">${movies[0].first_air_date}</p>
                            <span class="text-[#EAB308] font-semibold">${movies[0].vote_average}</span>
                            <p class="text-[#c4c8ce] text-[12px] sm:text-[16px]">${movies[0].overview}</p>
                            <button class="w-full text-black bg-[#EAB308] rounded-lg py-2 hover:opacity-60 transition-all duration-300 cursor-pointer"><a href="">View Details</a></button>
                        </div>
                    </div>
            `
            movies.shift();
        }
        document.querySelector(".movies").innerHTML = result;
    }
});