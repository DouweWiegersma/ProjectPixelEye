import styles from './Discover.module.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "../../components/Card/Card.jsx";
import background from "../../assets/movie background.jpg"
import Random from "../../components/random/Random.jsx";


function Discover(){

        const [data, setData] = useState({
            media_type: '',
            title: '',
            key: 0,
            id: 0,
            backdrop_path: '',
            vote_average: 0,
            release_date: '',
            overview: '',
            poster_path: '',
            name: '',
            first_air_date: ''
    })


    const [search, setSearch] = useState('')
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        async function keyword()
        {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/search/multi', {
                    params: {page: '1',
                        query: search,
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
    }, [search])

        const backDrop = data[0]?.backdrop_path ? `https://image.tmdb.org/t/p/original${data[0]?.backdrop_path}` : background






    return(
        <>
            <div className={styles.outerContainer}>
                    <div className={styles.innerContainer}>
                        <hearder>
                            <img src={backDrop} alt='background' className={styles.backgroundPic}/>
                            <div className={styles.searchBarContainer}>
                                <label id='searchBar' className={styles.labelSearchBar}>Movie / Tv-Shows
                                    <input value={search}
                                           type='text'
                                           onChange={(e) => {
                                               setSearch(e.target.value)
                                           }} className={styles.searchBar} placeholder='Search......'/>
                                </label>
                                <Random/>
                            </div>
                        </hearder>


                        <div className={styles.resultLayout}>
                            {data.length > 0 ? (
                                data.map((data) => (
                                    <Card
                                        key={data?.id}
                                        id={data?.id}
                                        media_type={data?.media_type}
                                        title={data?.title}
                                        release_date={data?.release_date}
                                        first_air_date={data?.first_air_date}
                                        vote_average={data?.vote_average}
                                        backdrop_path={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
                                        poster_path={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                                        original_name={data?.name}
                                    />
                                ))
                            ) : search && <p> Geen resultaten gevonden</p>}
                        </div>


                    </div>
                </div>
            </>
            )
            }

            export default Discover;