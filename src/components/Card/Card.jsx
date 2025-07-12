import {useEffect, useState} from "react";
import axios from "axios";
import styles from './Card.module.scss'
import { IoAddCircleSharp } from "react-icons/io5";
import Button from "../Button/Button.jsx";
import { TiDelete } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";

function Card(){

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const [data, setData] = useState({
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
        useEffect(() => {
            async function keyword()
            {
                try {
                    const response = await axios.get('https://api.themoviedb.org/3/search/multi', {
                        params: {page: '1',
                        query: 'revenge',
                        api_key: API_KEY},
                        headers: {
                            accept: 'application/json',
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmM3NThlMjI3MGJhZGRkOTk1ZDI3ZjA5ZTUzN2MxMCIsIm5iZiI6MTc1MDg0NTQxNC4yNDEsInN1YiI6IjY4NWJjN2U2MmFjNDgyNjdhMWVlNjc1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k20X1mNoNT_dDnc4dTeZ4lTkg8AzmShbQakV7NdIlr0'
                        }
                    })
                    console.log(response.data)
                    setData(response.data.results[0])
                }
                catch (e){
                    console.error('Geen data beschikbaar', e)
                }
            }
            keyword()
        }, [API_KEY])

    function handleClick(){

    }

    return(
        <>
        <div className={styles.outerContainer}>
            <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} alt="backgroundImage" className={styles.backdropImg}/>
            <div className={styles.innerContainer}>
                <div className={styles.titleContainer}>
                <h1 className={styles.title}> {data.media_type} </h1>
                <p className={styles.rating}><FaStar className={styles.star}/>{Math.round(data?.vote_average * 10)}</p>
                </div>

                <h2> {data.title} {data.name}</h2>
                <span className={styles.poster}> <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`} alt={data.title} className={styles.posterImg}/> </span>
                <p>Release date: {data.release_date} {data.first_air_date}</p>
                <div className={styles.buttonContainer}>
                    <Button label={<IoAddCircleSharp style={{width: '50px', height: '50px'}}/>} variant='addBtn'
                            shape='circle' onClick={handleClick}/>

                    <Button variant='primaryBtn' size='large' label='More Info' />

                    <Button label={<TiDelete style={{width: '50px', height: '50px'}}/>} variant='removeBtn'
                            shape='circle' onClick={handleClick}/>
                </div>
            </div>
        </div>


        </>


    )
}

export default Card;