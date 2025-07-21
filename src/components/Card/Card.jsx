import styles from './Card.module.scss'
import { IoAddCircleSharp } from "react-icons/io5";
import Button from "../Button/Button.jsx";
import { TiDelete } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";



function Card({ id, title, overview, media_type, release_date, first_air_date, vote_average, backdrop_path, poster_path, original_name}){
    const { user } = useContext(AuthContext)
    const [showMore, toggleShowMore] = useState(false)


    function toggleMore(){
        if(showMore === false){
            toggleShowMore(true)
        }
        else{
            toggleShowMore(false)
        }
    }

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
                overview,
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

            <main className={styles.innerContainer}>

                <header className={styles.titleContainer}>
                    <h1 className={styles.title}>  {media_type} </h1>
                    <p className={styles.rating}><FaStar className={styles.star}/>{Math.round(vote_average * 10)}</p>
                </header>

                <h2> {title} {original_name}</h2>
                <figure>{poster_path ?  <img src={poster_path} alt='poster' className={styles.posterImg}/> : <p> geen poster beschikbaar</p>} </figure>
                <p>Release date: {release_date} {first_air_date}</p>

                <div className={styles.buttonContainer}>
                    <Button label={<IoAddCircleSharp style={{width: '50px', height: '50px'}}/>} variant='addBtn'
                            shape='circle' onClick={handleAdd}/>
                    <Button variant='secondaryBtn' size='large' label='More Info' onClick={toggleMore}/>
                    {showMore ? (
                        <div className={styles.details}>
                            <div className={styles.detailsInner}>
                                <div className={styles.rowLayout}>
                                <h1> {original_name} {title} </h1>
                                <Button label='X' onClick={toggleMore} shape='square' variant='primaryBtn' size='medium'/>
                                </div>
                                 <p className={styles.overview}> { overview } </p>
                            </div>
                            </div>
                            ) : (<></>
                            ) }

                            <Button label={<TiDelete style={{width: '50px', height: '50px'}}/>} variant='removeBtn'
                                    shape='circle' onClick={handleDelete}/>
                        </div>
                        </main>
                        </div>
        </>


    )
}

export default Card;