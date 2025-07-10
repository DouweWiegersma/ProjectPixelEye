import {useEffect, useState} from "react";
import axios from "axios";
import styles from './Card.module.scss'

function Card(){

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const [data, setData] = useState({
        title: '',
        id: '',
        backdrop_path: '',
        vote_average: 0

    })
        useEffect(() => {
            async function keyword()
            {
                try {
                    const response = await axios.get('https://api.themoviedb.org/3/search/multi', {
                        params: {page: '1',
                        query: 'fast and the furious',
                        api_key: API_KEY},
                        headers: {
                            accept: 'application/json',
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmM3NThlMjI3MGJhZGRkOTk1ZDI3ZjA5ZTUzN2MxMCIsIm5iZiI6MTc1MDg0NTQxNC4yNDEsInN1YiI6IjY4NWJjN2U2MmFjNDgyNjdhMWVlNjc1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k20X1mNoNT_dDnc4dTeZ4lTkg8AzmShbQakV7NdIlr0'
                        }
                    })
                    console.log(response.data)
                    setData(response.data.results)
                }
                catch (e){
                    console.error('Geen data beschikbaar', e)
                }
            }
            keyword()
        }, [API_KEY])

    return(
        <>
            <div className={styles.outerContainer}>
            <p className={styles.title}>{data.title} {data.backdrop_path}</p>
            {data.id}
                <p> hallo</p>
            </div>


        </>


    )
}

export default Card;