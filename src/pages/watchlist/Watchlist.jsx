import styles from "./Watchlist.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import {Link} from "react-router-dom";

function Watchlist() {
    const { user } = useContext(AuthContext);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchWatchlist() {
            try {
                const response = await axios.get(
                    `https://api.datavortex.nl/pixeleye/users/${user.username}`,
                    {
                        headers: {
                            "X-API-KEY": "pixeleye:aO8LUAeun6zuzTqZllxY",
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                );
                if (response.data.info) {
                    const parsed = JSON.parse(response.data.info);
                    setWatchlist(parsed);
                } else {
                    console.log("geen info gevonden")
                    setWatchlist([]);
                }
            } catch (e) {
                console.error("Fout bij ophalen van de watchlist:", e);
                setError("Fout bij ophalen van je watchlist.");
            }
            setLoading(false);


        }

        fetchWatchlist();
    }, [user?.username, token, watchlist]);

    if (loading) return <p>Laden...</p>;
    if (error) return <p>{error}</p>;

    return (
        <section className={styles.outerContainer}>
            <main className={styles.innerContainer}>
                <header>
                    <div className={styles.imageContainer}>
                        <div className={`${styles.image3} ${styles.imageStyle}`}></div>
                        <div className={`${styles.image1} ${styles.imageStyle}`}><h1 className={styles.title}>Mijn
                            Watchlist</h1></div>
                        <div className={`${styles.image2} ${styles.imageStyle}`}></div>
                    </div>
                </header>


                {watchlist.length > 0 ? (
                    <section className={styles.layoutCards}>
                        {watchlist.map((item) => (
                            <Card
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
                    <>
                    <p className={styles.empty}>Je watchlist is leeg. </p>
                    <p> <Link to="/Discover" className={styles.empty}>Ontdek films/series </Link> </p>
                    </>
                )}
            </main>
        </section>
    );
}

export default Watchlist;