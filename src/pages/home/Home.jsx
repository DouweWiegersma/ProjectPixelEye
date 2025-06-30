import {useEffect, useState} from "react";
import axios from "axios";
import styles from './Home.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { AiFillFire } from "react-icons/ai";

function Home() {

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const [trending, setTrending] = useState([])
    const [count, setCount] = useState(0)


    useEffect(() => {
        async function Popular() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
                    params: {
                        api_key: API_KEY,
                        language: 'nl-NL',
                        page: 1,
                        region: 'NL'
                    }

                })
                console.log(response.data.results)
                setTrending(response.data.results)

            } catch (e) {
                console.error('Geen data beschikbaar!', e)

            }
        }

        Popular()
    }, [API_KEY])


    const backdropPaths = trending.filter(movie => movie.backdrop_path).map(movie => movie.backdrop_path)
    const title = trending.filter(movie => movie.original_title).map(movie => movie.original_title)
    const rating = trending.filter(movie => movie.vote_average).map(movie => movie.vote_average
    )
    const overview = trending.filter(movie => movie.overview).map(movie => movie.overview
    )
    const poster = trending.filter(movie => movie.poster_path).map(movie => movie.poster_path
    )


    function next(){
        setCount(count + 1)
    }
    function back(){
        setCount(count - 1)
    }

    return (
        
        <>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>

                    <div className={styles.layoutWrapper}>
                        <div className={styles.backdropContainer}>
                            <img src={`https://image.tmdb.org/t/p/original${backdropPaths[count]}`} alt={title[count]}
                                 className={styles.backdropImg}/>
                        </div>


                        <div className={styles.wrapper}>
                            <button type='button' onClick={back} disabled={count === 0} className={styles.iconBtn}>
                                <IoIosArrowBack/></button>
                            <img src={`https://image.tmdb.org/t/p/w200${poster[count]}`} alt={title[count]}
                                 className={styles.poster}/>
                            <button type='button' onClick={next} disabled={count === 10} className={styles.iconBtn}>
                                <IoIosArrowForward/></button>


                            <div className={styles.contentWrapper}>
                                <div>
                                <h2 className={`${styles.trending} ${styles.flickerText}`}><AiFillFire />Trending!! </h2>
                                </div>
                                <h2 className={styles.movieTitle}>{title[count]}</h2>
                                <p className={styles.movieRating}>Rating: {rating[count]}</p>
                                <button type='button' className={styles.iconBtn}>
                                    <p className={styles.movieDescription}>{overview[count]}</p>
                                    <IoIosArrowDown/>
                                </button>

                            </div>


                        </div>
                    </div>


                    <main className={styles.siteDescription}>
                        <div className={styles.layoutContentDescription}>
                            <div>
                                <h1 className={styles.pageTitle}> Welkom bij Pixel eye!</h1>
                                <h2> "klik, filter en laat de filmmagie beginnen!"</h2>
                            </div>
                            <p> Zin in een film, maar geen idee wat? Kies je favoriete gerne,
                                stel je filters in en klik op zoeken. Voilá -- een verrassende selectie films verschijnt
                                alsof door tovenarij. Jouw volgende movie night start hier!</p>
                        </div>


                        <div className={styles.layoutContentDescription}>
                            <div>
                                <h1 className={styles.pageTitle}> Welkom bij Pixel eye!</h1>
                                <h2> "klik, filter en laat de filmmagie beginnen!"</h2>
                            </div>
                            <p> Zin in een film, maar geen idee wat? Kies je favoriete gerne,
                                stel je filters in en klik op zoeken. Voilá -- een verrassende selectie films verschijnt
                                alsof door tovenarij. Jouw volgende movie night start hier!</p>
                        </div>

                    </main>


                </div>
            </div>
        </>


    )
}

export default Home;
