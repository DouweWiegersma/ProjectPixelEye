import styles from './Card.module.scss'
import { IoAddCircleSharp } from "react-icons/io5";
import Button from "../Button/Button.jsx";
import { TiDelete } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import {truncateTitle} from "../../helpers/TruncateTitle.js";
import {useNavigate} from "react-router-dom";
import engelsNaarNederlandseDatum from "../../helpers/DutchDate.js";

function Card({ id, title, overview, media_type, release_date, first_air_date, vote_average, backdrop_path, poster_path, original_name}){
    const { user } = useContext(AuthContext)



    async function handleAdd() {
        const token = localStorage.getItem("token");
        alert("Toegevoegd aan je watchlist");

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
            };


            const bestaatAl = currentInfo.some((item) => item.id === id);
            if (bestaatAl) {
                alert("Deze film staat al in je watchlist.");
                return;
            }

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

            console.log("Film succesvol toegevoegd aan watchlist!");
        } catch (e) {
            console.error("Fout bij toevoegen aan watchlist:", e);
        }
    }


    async function handleDelete() {
        const token = localStorage.getItem("token");
        alert("Het verwijderen is gelukt!");

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
                    console.warn("Kon info niet parsen:", e);
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

            console.log("Film verwijderd uit watchlist");

        } catch (e) {
            console.error("Fout bij verwijderen uit watchlist:", e);
        }
    }

    const navigate = useNavigate();

    function handleMoreInfo() {
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
            }
        });
    }



    return (
        <article className={styles.outerContainer}>
            {backdrop_path ? (
                <img
                    src={backdrop_path}
                    alt="Achtergrondafbeelding"
                    className={styles.backdropImg}
                />
            ) : (
                <p>Geen poster beschikbaar</p>
            )}

            <div className={styles.innerContainer}>
                <header className={styles.titleContainer}>
                    <h2 className={styles.title}>{media_type}</h2>
                    <p className={styles.rating}>
                        <FaStar className={styles.star}/>
                        {Math.round(vote_average * 10)}
                    </p>
                </header>

                <h3>{truncateTitle(title || original_name)}</h3>

                <figure>
                    {poster_path ? (
                        <img
                            src={poster_path}
                            alt="Poster"
                            className={styles.posterImg}
                        />
                    ) : (
                        <p>Geen poster beschikbaar</p>
                    )}
                </figure>

                <p>
                    Release datum:{" "}
                    {engelsNaarNederlandseDatum(release_date || first_air_date)}
                </p>

                <footer className={styles.buttonContainer}>
                    <Button
                        label={<IoAddCircleSharp style={{width: "50px", height: "50px"}}/>}
                        variant="addBtn"
                        shape="circle"
                        onClick={handleAdd}
                    />
                    <Button
                        variant="secondaryBtn"
                        size="large"
                        label="More Info"
                        onClick={handleMoreInfo}
                    />
                    <Button
                        label={<TiDelete style={{width: "50px", height: "50px"}}/>}
                        variant="removeBtn"
                        shape="circle"
                        onClick={handleDelete}
                    />
                </footer>
            </div>
        </article>


    )
}

export default Card;