// import {useEffect} from "react";
// import axios from "axios";
// import todayPlusDays from "../helpers/TodayPlusDays.js";
// import styles from "./home/Home.module.scss";
//
// useEffect(() => {
//     const fetchReleasedMovies = async () => {
//         try {
//             // Eerst 1 pagina ophalen om te weten hoeveel pagina's er zijn
//             const firstResponse = await axios.get('https://api.themoviedb.org/3/movie/popular', {
//                 params: {
//                     api_key: API_KEY,
//                     language: 'en-US',
//                     adults: true,
//                     page: 1,
//                 },
//             });
//
//             const totalPages = firstResponse.data.total_pages;
//             let allResults = [...firstResponse.data.results];
//
//             // De rest van de pagina's ophalen
//             for (let page = 2; page <= totalPages; page++) {
//                 const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
//                     params: {
//                         api_key: API_KEY,
//                         language: 'en-US',
//                         page: page,
//                     },
//                 });
//
//                 allResults = [...allResults, ...response.data.results];
//             }
//
//             // Vandaag in formaat YYYY-MM-DD
//             const today = new Date().toISOString().split('T')[0];
//
//
//             // Filter: alleen films waarvan de release_date <= vandaag
//             const filtered = allResults.filter((movie) => {
//                 if (!movie.release_date) return false;
//                 return movie.release_date > today && movie.release_date < todayPlusDays(10) && movie.original_language === 'en'
//             });
//
//             setReleasedMovies(filtered);
//         } catch (error) {
//             console.error('Error fetching movies:', error);
//         }
//     };
//
//     fetchReleasedMovies();
// }, []);
// // const today = new Date().toISOString().split('T')[0];
// const imageBaseUrl = 'https://image.tmdb.org/t/p/w1280';
// // const posterUrl = imageBaseUrl + movie[0].poster_path;
// return (
//     <div>
//         <ul className={styles.imgBackground1}>
//             {releasedMovies.map((movie, index) => (
//                 <li key={`${movie.id}-${index}`} className={styles.imgBackground1}>
//                     <div className={styles.imgBackground1}><img src={`${imageBaseUrl}/${movie.backdrop_path}`} alt='title' className={styles.imgBackground}/></div>
//                     {console.log(movie)}
//                 </li>
//
//             ))}
//         </ul>
//
//     </div>