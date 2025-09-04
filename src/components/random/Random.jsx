import styles from './Random.module.scss'
import React, {useEffect, useState} from "react";
import Button from "../Button/Button.jsx";
import axios from "axios";
import Card from "../Card/Card.jsx";
import {generateReleaseYears} from "../../helpers/GetYears.js";
import Spinner from "../spinner/Spinner.jsx";
import Message from "../../components/message/Message.jsx"

function Random(){

    const [mediaType, toggleMediaType] = useState(true)
    const [movies, toggleMovies] = useState(false)
    const [tvShows, toggleTvShows] = useState(false)
    const [random, toggleRandom] = useState(false)
    const [trigger, toggleTrigger] = useState(false)
    const [genre, setGenre] = useState([])
    const [movieGenre, setMovieGenre] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ text: '', status: '' });
    const clearMessage = () => setMessage({ text: '', status: '' });


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
    const initialFormState = {
        mediaType : 'tv' ,
        rating: 0,
        genre: '',
        releaseYear: 0,
        language: '',
        releaseYearTv: '',
        overview: '',
        id: 0,


    }

    const [form, setForm] = useState(initialFormState);


    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const controller = new AbortController();
        async function keyword()
        {
            setLoading(true)
            toggleTvShows(false)
            toggleMovies(false)
            toggleTrigger(false)


            try {
                const [allData, tvGenres, movieGenres] = await Promise.all([
                        axios.get(`https://api.themoviedb.org/3/discover/${form.mediaType}`, {
                            signal: controller.signal,
                    params: {
                        api_key: API_KEY,
                        with_genres: form.genre,
                        'vote_average.gte': form.rating,
                        primary_release_year: form.mediaType === 'movie' ? form.releaseYear : undefined,
                        with_original_language: form.language,
                        first_air_date_year: form.mediaType === 'tv' ? form.releaseYearTv : undefined,
                        overview: form.overview,
                    },
                }),
                axios.get(`https://api.themoviedb.org/3/genre/tv/list`, {
                    signal: controller.signal,
                    params: {
                        api_key: API_KEY,
                    },
                }),
                    axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                        signal: controller.signal,
                    params: {
                        api_key: API_KEY,
                    },
                })
                ])

                const response = allData.data.results;
                const response1 = tvGenres.data.genres;
                const response2 = movieGenres.data.genres;

                const randomIndex = Math.floor(Math.random() * response.length);
                setData(response[randomIndex]);
                setGenre(response1);
                setMovieGenre(response2);
            }
            catch (e){
                console.error('Geen data beschikbaar', e)

            }
            finally {
                setLoading(false)
            }

        }
        keyword()
        return () => {
            controller.abort();
        }
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
        setForm(initialFormState);


    }
    const years = generateReleaseYears();

    if (loading) return(<Spinner spinner='spinner' size='medium' border='non' container='container'/>)





    return(
        <>
            <fieldset className={styles['media-type-group']}>
                <legend>Zoek iets willekeurigs:</legend>
                {mediaType ? (
                <div className={styles['media-type-group']}>
            <Button label={'Tv Show'} variant='secondary-btn' shape='large' onClick={formTvShow}/>
            <Button label={'Movies'} variant='secondary-btn' shape='large' onClick={formMovie}/>
                </div>) : (
                <Button label={'Reset'} variant='secondary-btn' shape='large' onClick={reset}/> )}
            </fieldset>

            { movies &&

            <div>
            <form className={styles['form-container']} onSubmit={handleSubmit}>
                <h2> Roulette Movies</h2>
                <label className={styles.gap}>Rating:
                    <input type='range' id='rating' min='1' max='10' step='1' value={form.rating} name='rating'
                           onChange={handleChange} />
                    <output>{form.rating}+</output>
                </label>

                <label htmlFor='releaseYear' className={styles.gap}>Release Year:
                    <select name='releaseYear' id='releaseYear' onChange={handleChange} className={styles['option-box']} >
                        <option value={form.releaseYear} >-- Selecteer een jaar --</option>
                        {years.map((year) => (
                            <option key={year} value={year} >{year}</option>
                        ))}
                    </select>
                </label>

                <label htmlFor='language' className={styles.gap}>Language:
                    <select name='language' value={form.language} onChange={handleChange} className={styles['option-box']} required>
                        <option value="">-- Selecteer een taal --</option>
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
                        <select name='genre' value={form.genre} onChange={handleChange} className={styles['option-box']} required>
                            <option value=''>-- Categorie --</option>
                            {movieGenre.map((movieGenre) => (
                                <option key={movieGenre.id} value={movieGenre.id}>
                                    {movieGenre?.name}
                                </option>
                            ))}
                        </select>
                    </label>
                <label>
                    <Button type='submit' size='large' label={'zoeken'} variant='primary-btn'/>
                </label>
            </form>
            </div>
            }
            <Message text={message.text} clearMessage={clearMessage} status={message.status}/>


            {random &&
                <Card
                    media_type={form?.mediaType}
                      title={data?.title}
                      release_date={data?.release_date}
                      first_air_date={data?.first_air_date}
                      vote_average={data?.vote_average}
                      backdrop_path={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
                      poster_path={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                      original_name={data?.name}
                      overview={data?.overview}/>
            }
            {tvShows &&
                <form className={styles['form-container']} onSubmit={handleSubmit}>
                    <h2> Roulette Tv Shows</h2>
                    <label className={styles.gap}>Rating:
                        <input type='range' id='rating' min='1' max='10' step='1' value={form.rating} name='rating'
                               onChange={handleChange}/><p>{form?.rating}+</p>
                    </label>

                    <label htmlFor='releaseYearTv' className={styles.gap}>Release Year:
                        <select name='releaseYearTv'  id='releaseYearTv' onChange={handleChange} className={styles['option-box']}>
                            <option value={form?.releaseYearTv}  >-- Selecteer een jaar --</option>
                            {years.map((year) => (
                                <option key={year} value={year} >{year}</option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor='language' className={styles.gap}>Language:
                        <select name='language' className={styles['option-box']} value={form.language} onChange={handleChange} required>
                            <option value="">-- Selecteer een taal --</option>
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
                            <select name='genre' className={styles['option-box']} value={form.genre} onChange={handleChange} required>
                                <option value=''>-- Categorie --</option>
                                {genre.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre?.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    <label>
                        <Button type='submit' size='large' label={'zoeken'} variant='primary-btn'/>
                    </label>
                </form>}
            </>
    )
}

export default Random;