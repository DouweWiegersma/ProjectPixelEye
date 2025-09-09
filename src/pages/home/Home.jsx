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
import Spinner from "../../components/spinner/Spinner.jsx";
import Message from "../../components/message/Message.jsx"
import Rating from "../../components/ratingStars/Rating.jsx";

function Home() {

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const [trending, setTrending] = useState([])
    const [count, setCount] = useState(0)
    const [showMore, toggleShowMore] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ text: '', status: '' });
    const clearMessage = () => setMessage({ text: '', status: '' });

    useEffect(() => {
        const controller = new AbortController();
        async function Popular() {
            setLoading(true)
            try {
                const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
                    params: {
                        api_key: API_KEY,
                        language: 'en-EN',
                        page: 1,
                        region: 'NL'
                    },
                    signal: controller.signal

                })
                setTrending(response.data.results)


            } catch (e) {
                console.error('No data available!', e)

            }
            finally {
                setLoading(false)
            }
        }
        Popular()
        return () => {
            controller.abort();
        }
    }, [])


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

    if (loading) return( <Spinner spinner='spinner' size='large' border='non' container='container'/>)





    return (
        
        <>
            <div className={styles['outer-container']}>
                <div className={styles['inner-container']}>
                    <header className={styles['layout-wrapper']}>

                        <figure className={styles['backdrop-container']}>
                            <img src={`https://image.tmdb.org/t/p/original${backdropPaths[count]}`} alt={title[count]}
                                 className={styles['backdrop-img']}/>
                        </figure>


                        <section className={styles.wrapper}>
                            <article className={styles['poster-layout']}>
                                <div className={styles['layout-trending']}>
                                    <h2 className={`${styles.trending} ${styles['flicker-text']}`}><AiFillFire/>Trending!!</h2>
                                    <div className={styles.row}>
                                <button type='button' onClick={back} disabled={count === 0} className={styles['icon-btn']}>
                                    <IoIosArrowBack/></button>
                                        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                            <Rating rating={trending[count]?.vote_average} />
                                <img src={`https://image.tmdb.org/t/p/w200${poster[count]}`} alt={title[count]}
                                     className={styles.poster}/>
                                        </div>

                                <button type='button' onClick={next} disabled={count === 10} className={styles['icon-btn']}>
                                    <IoIosArrowForward/></button>
                                    </div>
                                </div>
                            </article>


                            <section className={styles['content-wrapper']}>
                                <div className={styles['layout-row']}>
                                    <h2 className={styles['movie-title']}>{title[count]}</h2>
                                    <p className={styles['movie-rating']}><FaStar/>{Math.round(rating[count] * 10)} </p>
                                </div>
                                    <Button label={showMore === false ? <h3>Overview</h3> : <h3>Hide Overview</h3>}
                                            size='large' variant='secondary-btn'
                                            onClick={show}/>
                                    <p className={styles['movie-description']}> {showMore === true ? overview[count] : ''}</p>

                            </section>
                        </section>
                    </header>
                    <div style={{display: "flex", justifyContent: "center",alignItems: "center", margin: 20}}>
                    <Message text={message.text} status={message.status} clearMessage={clearMessage}  />
                    </div>

                    <main className={styles['site-description']}>
                        <section className={styles['layout-content-description']}>
                            <header>
                            <h1 className={styles['page-title']}> Welcome to Pixel Eye!</h1>
                                <h2> "Click. Filter. Let the movie magic begin!"</h2>
                            </header>
                            <p> Not sure what to watch? Choose your favorite genres, set your filters, and hit search. A curated selection appears instantly — your next movie night starts now!</p>
                        </section>


                        <section className={styles['layout-content-description']}>
                             <h3> <HiViewfinderCircle style={ { color: 'blue', marginRight: '15'}} /> Discover:</h3>
                            <p>
                                Search movies or series by title, or spin the Movie/TV Roulette for personalized suggestions!
                            </p>

                             <h3> <MdFormatListBulletedAdd style={{ color: 'blue', marginRight: '15'}}/>Watchlist: </h3>
                            <p>
                                Save your favorites to watch later. Keep all your movies and shows in one place — no scattered notes.
                            </p>

                            <h3><VscAccount style={ { color: "blue", marginRight: '15'}} /> Account?</h3>
                            <p>
                                Create an account to manage your watchlist and discover movies tailored to you. Your personalized movie world awaits!
                            </p>
                        </section>
                    </main>


                </div>
            </div>
        </>


    )
}

export default Home;
