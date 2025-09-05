import styles from './Card.module.scss'
import { IoAddCircleSharp } from "react-icons/io5";
import Button from "../Button/Button.jsx";
import { TiDelete } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import React, {useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import {truncateTitle} from "../../helpers/TruncateTitle.js";
import {useNavigate} from "react-router-dom";
import engelsNaarNederlandseDatum from "../../helpers/DutchDate.js";
import {useState} from "react";
import Spinner from "../spinner/Spinner.jsx";
import Rating from "../ratingStars/Rating.jsx";
import poster from "../../assets/poster-placeholder.png"
import GenreBadge from "../genre/GenreBadge.jsx";
function Card({genre_ids = [],
                  movieGenres = [],
                  tvGenres = [], profile_path, know_for, popularity, disableAdd, disableDelete, id, setRefresh, title, overview, media_type, release_date, first_air_date, vote_average, backdrop_path, poster_path, original_name}){
    const { user} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)



    async function handleAdd() {
        const token = localStorage.getItem("token");
            setLoading(true)
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

            let currentInfo = [];

            if (response.data.info) {
                try {
                    const parsed = JSON.parse(response.data.info);
                    currentInfo = Array.isArray(parsed) ? parsed : [];
                } catch (err) {
                    console.warn("Fout bij JSON parsen van info:", err);
                    currentInfo = [];
                }
            }



            const bestaatAl = currentInfo.some((item) => String(item.id) === String(id));
            if (bestaatAl) {
                alert("This movie is already in your watchlist.");
                return;
            }
            const newMovie = {
                id,
                title,
                poster_path,
                backdrop_path,
                media_type,
                vote_average,
                release_date,
                first_air_date,
                original_name,
                overview,
                popularity,
                know_for,
                profile_path,
                genre_ids: genre_ids || [],

            };

            const updatedInfo = [...currentInfo, newMovie];

            await axios.put(
                `https://api.datavortex.nl/pixeleye/users/${user.username}`,
                {
                    info: JSON.stringify(updatedInfo),
                },
                {
                    headers: {
                        "X-API-KEY": "pixeleye:aO8LUAeun6zuzTqZllxY",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
            alert("Movie successfully added to your watchlist!");
            setRefresh(prev => !prev);
        } catch (e) {
            console.error("Error adding to watchlist:", e);
        }
        finally {
            setLoading(false)
        }
    }


    async function handleDelete() {
        const token = localStorage.getItem("token");
        setLoading(true)
        try {
            const response = await axios.get(
                `https://api.datavortex.nl/pixeleye/users/${user.username}`,
                {
                    headers: {
                        "X-API-KEY": "pixeleye:aO8LUAeun6zuzTqZllxY",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let currentInfo = [];

            if (response.data.info) {
                try {
                    const parsed = JSON.parse(response.data.info);
                    currentInfo = Array.isArray(parsed) ? parsed : [];
                } catch (e) {
                    console.warn("Could not parse info:", e);
                    currentInfo = [];
                }

            }

            const updatedInfo = currentInfo.filter((movie) => String(movie.id) !== String(id));

            await axios.put(
                `https://api.datavortex.nl/pixeleye/users/${user.username}`,
                { info: JSON.stringify(updatedInfo) },
                {
                    headers: {
                        "X-API-KEY": "pixeleye:aO8LUAeun6zuzTqZllxY",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRefresh(prev => !prev);

        } catch (e) {
            console.error("Fout bij verwijderen uit watchlist:", e);
        }
        finally {
            setLoading(false)
        }
    }

    const navigate = useNavigate();

    function handleMoreInfo() {
        setLoading(true)
        navigate(`/details/${id}`, {
            state: {
                id,
                title,
                overview,
                media_type,
                release_date,
                first_air_date,
                vote_average,
                backdrop_path,
                poster_path,
                original_name,
                popularity,
                know_for,
                profile_path,
                genre_ids,
            }
        });
        setLoading(false)
    }


    if (loading) return (<Spinner spinner='spinner' size='large' border='non' container='container'/>)
    return (
        <article className={styles['outer-container']} >
            {backdrop_path ? (
                <img
                    src={backdrop_path}
                    alt="Achtergrondafbeelding"
                    className={styles['backdrop-img']}
                />
            ) : profile_path ? (
                    <img src={profile_path} alt='profile' />

            ) : (
                poster)}

            <div className={styles['inner-container']}>
                <header className={styles['title-container']}>
                    <h2 className={styles.title}>{media_type}</h2>
                    <p className={styles.stars}><Rating rating={vote_average} id={id}/></p>
                    <p className={styles.rating}>
                        <FaStar className={styles.star}/>
                        {Math.round(vote_average ? vote_average : popularity * 10)}
                    </p>

                </header>

                <h3>{truncateTitle(title || original_name)}</h3>
                <div className={styles.badge}>
                    {genre_ids?.map((id) => (
                        <GenreBadge
                            key={id}
                            id={id}
                            type={media_type || (title ? "movie" : "tv")}
                            movieGenres={movieGenres}
                            tvGenres={tvGenres}
                        />
                    ))}
                </div>

                <figure>
                    {poster_path ? (
                        <img
                            src={poster_path}
                            alt="poster"
                            className={styles['poster-img']}
                        />
                    ) : (
                        <p></p>
                    )}
                </figure>
                {release_date || first_air_date ? (
                    <p>
                        Release date:{' '}
                        {engelsNaarNederlandseDatum(release_date || first_air_date)}
                    </p>) : (
                    <p>Know for: {know_for}</p>)}

                <footer className={styles['button-container']}>
                    <Button
                        label={<IoAddCircleSharp style={{width: "50px", height: "50px"}}/>}
                        variant="add-btn"
                        shape="circle"
                        onClick={handleAdd}
                        disabled={disableAdd}
                    />
                    <Button
                        variant="secondary-btn"
                        size="large"
                        label="More Info"
                        onClick={handleMoreInfo}
                    />
                    <Button
                        label={<TiDelete style={{width: "50px", height: "50px"}}/>}
                        variant="remove-btn"
                        shape="circle"
                        onClick={handleDelete}
                        disabled={disableDelete}

                    />
                </footer>
            </div>
        </article>


    )
}

export default Card;