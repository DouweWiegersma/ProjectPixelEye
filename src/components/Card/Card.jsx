
import styles from './Card.module.scss'
import { IoAddCircleSharp } from "react-icons/io5";
import Button from "../Button/Button.jsx";
import { TiDelete } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import {useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";


function Card({ id, title, media_type, release_date, first_air_date, vote_average, backdrop_path, poster_path, original_name}){
    const { user } = useContext(AuthContext)

    async function handleAdd() {
        const token = localStorage.getItem("token");
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
                currentInfo = JSON.parse(response.data.info);
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

            console.log("Film succesvol toegevoegd aan watchlist!");

        } catch (e) {
            console.error("Fout bij toevoegen aan watchlist:", e);
        }
    }



    async function handleDelete() {
        const token = localStorage.getItem("token");
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
                currentInfo = JSON.parse(response.data.info);
            }

            const updatedInfo = currentInfo.filter((movie) => movie.id !== id);


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


    return(
        <>
        <div className={styles.outerContainer}>
            {backdrop_path ? <img src={backdrop_path} alt="backgroundImage" className={styles.backdropImg}/> : <p> geen poster beschikbaar</p>}

            <div className={styles.innerContainer}>

                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>  {media_type} </h1>
                    <p className={styles.rating}><FaStar className={styles.star}/>{Math.round(vote_average * 10)}</p>
                </div>

                <h2> {title} {original_name}</h2>
                <span>{poster_path ?  <img src={poster_path} alt='poster' className={styles.posterImg}/> : <p> geen poster beschikbaar</p>} </span>
                <p>Release date: {release_date} {first_air_date}</p>

                <div className={styles.buttonContainer}>
                    <Button label={<IoAddCircleSharp style={{width: '50px', height: '50px'}}/>} variant='addBtn'
                            shape='circle' onClick={handleAdd}/>

                    <Button variant='secondaryBtn' size='large' label='More Info'/>

                    <Button label={<TiDelete style={{width: '50px', height: '50px'}}/>} variant='removeBtn'
                            shape='circle' onClick={handleDelete}/>
                </div>
            </div>
        </div>
        </>


    )
}

export default Card;