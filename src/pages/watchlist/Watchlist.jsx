import styles from "./Watchlist.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";
import Spinner from "../../components/spinner/Spinner.jsx";

function Watchlist() {
    const { user, token} = useContext(AuthContext);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(true)



    useEffect(() => {
        const controller = new AbortController();
        if (!user?.username || !token) return;
        setError(null)
        async function fetchWatchlist() {
            setLoading(true)
            try {
                const response = await axios.get(
                    `https://api.datavortex.nl/pixeleye/users/${user?.username}`,
                    {
                        headers: {
                            "X-API-KEY": "pixeleye:aO8LUAeun6zuzTqZllxY",
                            "Authorization": `Bearer ${token}`,
                        },
                        signal: controller.signal,
                    }
                );
                if (response.data.info) {
                    const parsed = response.data.info ? JSON.parse(response.data.info) : [];
                    setWatchlist(parsed);
                } else {
                    console.log("geen info gevonden")
                    setWatchlist([]);
                }
            } catch (e) {
                if (axios.isCancel(e)) return;
                console.error("Fout bij ophalen van de watchlist:", e);
                setError("Fout bij ophalen van je watchlist.");
            }
            finally {
                setLoading(false);
            }
        }
        fetchWatchlist();
        return () => {
            controller.abort()
        }
    }, [user?.username, user?.id, token, refresh]);



    if (loading) return <Spinner spinner='spinner' size='medium' border='border-dotted' container='container'/>;
    if (error) return <p>{error}</p>;

    return (
        <main className={styles['outer-container']}>

            <div className={styles['inner-container']}>

                    <header className={styles['image-container']}>
                        <div className={`${styles.image3} ${styles['image-style']}`}></div>
                        <div className={`${styles.image1} ${styles['image-style']}`}><h1 className={styles.title}>Mijn
                            Watchlist</h1></div>
                        <div className={`${styles.image2} ${styles['image-style']}`}></div>
                    </header>




                {watchlist.length > 0 ? (
                    <section className={styles['layout-cards']}>
                        {watchlist.map((item) => (
                            <Card
                                disableAdd={true}
                                setRefresh={setRefresh}
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                poster_path={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                                media_type={item.media_type}
                                vote_average={item.vote_average}
                                backdrop_path={item.backdrop_path}
                                release_date={item.release_date}
                                first_air_date={item.first_air_date}
                                original_name={item.original_name}
                                overview={item.overview}
                            />
                        ))}
                    </section>
                ) : (
                    <div className={styles.watchlist}>
                    <p className={styles.empty}>Er zit nog niks in je Watchlist </p>
                    <p> <Link to="/Discover" className={styles.empty}>Klik hier... Om films toe te voegen </Link> </p>
                        <Spinner spinner='spinner' size='large' border='none' container='container'/>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Watchlist;