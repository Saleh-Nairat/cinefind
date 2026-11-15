import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm';

const api_key = 'd2764e5027b3ac6457052f1be0dac63b';

const getPopular = async ()=>{
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`);
    return data;
}

const displayPopular = async ()=>{
    const {results} = await getPopular();
    console.log(results);
    let result = '';
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

displayPopular();