import {useEffect, useState} from "react";
import axios from "axios";
import styles from './Home.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillFire } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { HiViewfinderCircle } from "react-icons/hi2";
import Button from "../../components/Button/Button.jsx";
import { FaStar } from "react-icons/fa6";



function Home() {

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const [trending, setTrending] = useState([])
    const [count, setCount] = useState(0)
    const [showMore, toggleShowMore] = useState(false)
    const [loading, setLoading] = useState(true)


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
            setLoading(false)
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
        toggleShowMore(false)
    }
    function back(){
        setCount(count - 1)
        toggleShowMore(false)
    }

    function show(){
        if(showMore === false) {
            toggleShowMore(true)
        }
        else{
            toggleShowMore(false)
        }
    }
    if(loading) return( <p>Laden...</p>)





    return (
        
        <>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <header className={styles.layoutWrapper}>
                        <div className={styles.backdropContainer}>
                            <img src={`https://image.tmdb.org/t/p/original${backdropPaths[count]}`} alt={title[count]}
                                 className={styles.backdropImg}/>
                        </div>


                        <section className={styles.wrapper}>
                            <article className={styles.posterLayout}>
                                <div className={styles.layoutTrending}>
                                    <h2 className={`${styles.trending} ${styles.flickerText}`}><AiFillFire/>Trending!!</h2>
                                <div className={styles.row}>
                                <button type='button' onClick={back} disabled={count === 0} className={styles.iconBtn}>
                                    <IoIosArrowBack/></button>
                                <img src={`https://image.tmdb.org/t/p/w200${poster[count]}`} alt={title[count]}
                                     className={styles.poster}/>
                                <button type='button' onClick={next} disabled={count === 10} className={styles.iconBtn}>
                                    <IoIosArrowForward/></button>
                                </div>
                            </div>
                            </article>


                            <section className={styles.contentWrapper}>

                                <div className={styles.layoutRow}>
                                    <h2 className={styles.movieTitle}>{title[count]}</h2>

                                    <p className={styles.movieRating}><FaStar/>{Math.round(rating[count] * 10)} </p>
                                </div>

                                    <Button label={showMore === false ? <h3>Overview</h3> : <h3>Hide Overview</h3>}
                                            size='large' variant='secondaryBtn'
                                            onClick={show}/>
                                    <p className={styles.movieDescription}> {showMore === true ? overview[count] : ''}</p>

                            </section>


                        </section>
                    </header>


                    <main className={styles.siteDescription}>
                        <section className={styles.layoutContentDescription}>
                            <div>
                            <h1 className={styles.pageTitle}> Welkom bij Pixel eye!</h1>
                                <h2> "klik, filter en laat de filmmagie beginnen!"</h2>
                            </div>
                            <p> Zin in een film, maar geen idee wat? Kies je favoriete gerne,
                                stel je filters in en klik op zoeken. Voilá -- een verrassende selectie films verschijnt
                                alsof door tovenarij. Jouw volgende movie night start hier!</p>
                        </section>


                        <section className={styles.layoutContentDescription}>
                             <h3> <HiViewfinderCircle style={ { color: 'blue', marginRight: '15'}} /> Ontdek:</h3>
                            <p>
                            Krijg dagelijks aanbevelingen op maat, of laat je verassen door onze random film picker
                            </p>

                             <h3> <MdFormatListBulletedAdd style={{ color: 'blue', marginRight: '15'}}/>Watchlist: </h3>
                            <p>
                                Sla films op die je later wilt kijken. Geen notities meer op je telefoon - al je favorieten op één plek.
                            </p>

                            <h3><VscAccount style={ { color: 'blue', marginRight: '15'}} /> Account nodig?</h3>
                            <p>
                            Ja, je hebt een gratis account nodig om je watchlist op te slaan, je voorkeuren bij te houden
                            en films te waarderen. Zo zorgen we ervoor dat jouw filmwereld helemaal van jou is
                            </p>
                        </section>


                    </main>


                </div>
            </div>
        </>


    )
}

export default Home;
