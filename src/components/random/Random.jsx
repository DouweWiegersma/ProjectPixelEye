import styles from './Random.module.scss'
import {useEffect, useState} from "react";
import Button from "../Button/Button.jsx";
import axios from "axios";
import Card from "../Card/Card.jsx";
import {generateReleaseYears} from "../../helpers/GetYears.js";

function Random(){

    const [mediaType, toggleMediaType] = useState(true)
    const [movies, toggleMovies] = useState(false)
    const [tvShows, toggleTvShows] = useState(false)
    const [random, toggleRandom] = useState(false)
    const [trigger, toggleTrigger] = useState(false)
    const [genre, setGenre] = useState([])
    const [movieGenre, setMovieGenre] = useState([])



    const [data, setData] = useState({
        genre: '',
        media_type: '',
        title: '',
        id: '',
        backdrop_path: '',
        vote_average: 0,
        release_date: '',
        overview: '',
        poster_path: '',
        name: '',
        first_air_date: ''
    })
    const [form, setForm] = useState({
        mediaType : 'tv' ,
        rating: 0,
        genre: '',
        releaseYear: 0,
        language: '',
        releaseYearTv: ''


    })


    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {

        async function keyword()
        {
            toggleTvShows(false)
            toggleMovies(false)
            toggleTrigger(false)
            try {
                const [allData, tvGenres, movieGenres] = await Promise.all([
                        axios.get(`https://api.themoviedb.org/3/discover/${form.mediaType}`, {
                    params: {
                        api_key: API_KEY,
                        with_genres: form.genre,
                        'vote_average.gte': form.rating,
                        primary_release_year: form.mediaType === 'movie' ? form.releaseYear : undefined,
                        with_original_language: form.language,
                        first_air_date_year: form.mediaType === 'tv' ? form.releaseYearTv : undefined,
                    },
                }),
                axios.get(`https://api.themoviedb.org/3/genre/tv/list`, {
                    params: {
                        api_key: API_KEY,
                    },
                }),
                    axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                    params: {
                        api_key: API_KEY,
                    },
                })

                ])

                const response = allData.data.results;
                const response1 = tvGenres.data.genres;
                const response2 = movieGenres.data.genres;

                console.log(response1)
                console.log(response)


                const randomIndex = Math.floor(Math.random() * response.length);
                setData(response[randomIndex]);
                setGenre(response1);
                setMovieGenre(response2);




            }
            catch (e){
                console.error('Geen data beschikbaar', e)
            }
        }
        keyword()
    }, [trigger])


    function handleChange(e){
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        toggleRandom(true)
        toggleMovies(false)
        toggleTvShows(false)
        toggleTrigger(true)

        console.log('formulier is ingediend met data:', form)
    }
    function formTvShow() {
        toggleTvShows(true);
        toggleMediaType(false);
        setForm((prevForm) => ({
            ...prevForm,
            mediaType: 'tv',
        }));
    }
    function formMovie() {
        toggleMovies(true);
        toggleMediaType(false);
        setForm((prevForm) => ({
            ...prevForm,
            mediaType: 'movie',
        }));}

    function reset(){
        toggleMediaType(true)
        toggleMovies(false)
        toggleRandom(false)
        toggleTvShows(false)

    }
    const years = generateReleaseYears();





    return(
        <>

            {mediaType ? (
                <>
            <Button label={'Tv Show'} variant='secondaryBtn' shape='large' onClick={formTvShow}/>
            <Button label={'Movies'} variant='secondaryBtn' shape='large' onClick={formMovie}/>
                </>) : (
                <Button label={'Reset'} variant='secondaryBtn' shape='large' onClick={reset}/> )}


            { movies ? (

            <>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <h2> Roulette Movies</h2>
                <label className={styles.gap}>Rating:
                    <input type='range' id='rating' min='1' max='10' step='1' value={form.rating} name='rating'
                           onChange={handleChange}/><p>{form.rating}+</p>
                </label>

                <label htmlFor='releaseYear' className={styles.gap}>Release Year:
                    <select name='releaseYear' id='releaseYear' onChange={handleChange}>
                        <option value={form.releaseYear}>-- Select Year --</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </label>

                <label htmlFor='language' className={styles.gap}>Language:
                    <select name='language' value={form.language} onChange={handleChange}>
                        <option value="">Selecteer een taal</option>
                        <option value="en">Engels</option>
                        <option value="nl">Nederlands</option>
                        <option value="fr">Frans</option>
                        <option value="de">Duits</option>
                        <option value="es">Spaans</option>
                        <option value="it">Italiaans</option>
                        <option value="ja">Japans</option>
                        <option value="ko">Koreaans</option>
                        <option value="zh">Chinees</option>
                        <option value="hi">Hindi</option>
                        <option value="ar">Arabisch</option>
                        <option value="ru">Russisch</option>
                        <option value="pt">Portugees</option>
                        <option value="tr">Turks</option>
                        <option value="sv">Zweeds</option>
                    </select>
                </label>

                    <label htmlFor='genre' className={styles.gap}>Categorie:
                        <select name='genre' value={form.genre} onChange={handleChange}>
                            <option value=''>-- Kies een genre --</option>
                            {movieGenre.map((movieGenre) => (
                                <option key={movieGenre.id} value={movieGenre.id}>
                                    {movieGenre.name}
                                </option>
                            ))}
                        </select>
                    </label>
                <label>
                    <Button type='submit' size='large' label={'zoeken'} variant='primaryBtn'/>
                </label>
            </form>
            </>
                ) : (<> </>)}


            {random ? (

                <Card
                      media_type={form.mediaType}
                      title={data?.title}
                      release_date={data?.release_date}
                      first_air_date={data?.first_air_date}
                      vote_average={data?.vote_average}
                      backdrop_path={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
                      poster_path={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                      original_name={data?.name}/>
            ) : (<> </>)}


            {tvShows ? (
            <>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <h2> Roulette Tv Shows</h2>
                    <label className={styles.gap}>Rating:
                        <input type='range' id='rating' min='1' max='10' step='1' value={form.rating} name='rating'
                               onChange={handleChange}/><p>{form.rating}+</p>
                    </label>

                    <label htmlFor='releaseYearTv' className={styles.gap}>Release Year:
                        <select name='releaseYearTv' id='releaseYearTv' onChange={handleChange}>
                            <option value={form.releaseYearTv}>-- Select Year --</option>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor='language' className={styles.gap}>Language:
                        <select name='language' value={form.language} onChange={handleChange}>
                            <option value="">Selecteer een taal</option>
                            <option value="en">Engels</option>
                            <option value="nl">Nederlands</option>
                            <option value="fr">Frans</option>
                            <option value="de">Duits</option>
                            <option value="es">Spaans</option>
                            <option value="it">Italiaans</option>
                            <option value="ja">Japans</option>
                            <option value="ko">Koreaans</option>
                            <option value="zh">Chinees</option>
                            <option value="hi">Hindi</option>
                            <option value="ar">Arabisch</option>
                            <option value="ru">Russisch</option>
                            <option value="pt">Portugees</option>
                            <option value="tr">Turks</option>
                            <option value="sv">Zweeds</option>
                        </select>
                    </label>

                        <label htmlFor='genre' className={styles.gap}>Categorie:
                            <select name='genre' value={form.genre} onChange={handleChange}>
                                <option value=''>-- Kies een genre --</option>
                                {genre.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    <label>
                        <Button type='submit' size='large' label={'zoeken'} variant='primaryBtn'/>
                    </label>
                </form>
            </>) : (<> </>)}


        </>
    )
}

export default Random;