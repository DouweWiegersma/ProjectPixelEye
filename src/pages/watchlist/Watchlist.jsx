import styles from "./Watchlist.module.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

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
            } finally {
                setLoading(false);
            }
        }
        fetchWatchlist();
    }, [user?.username, token]);

    if (loading) return <p>Laden...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.outerContainer}>
            <div className={styles.innerContainer}>
            <h1 className={styles.title}>Mijn Watchlist</h1>
            {watchlist.length > 0 ? (
                <div className={styles.layoutCards}>
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
                        />
                    ))}
                </div>
            ) : (
                <p>Je watchlist is leeg.</p>
            )}
            </div>
        </div>
    );
}

export default Watchlist;