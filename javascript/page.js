import axios from 'https://cdn.jsdelivr.net/npm/axios@1.7.9/+esm';
import api_key from '../key.js';

const hero_section = document.querySelector(".hero");
const parmas = new URLSearchParams(window.location.search);

const getShowDetails = async()=>{
    return await axios.get(`https://api.themoviedb.org/3/movie/${params.get('id')}?api_key=${api_key}`);
}