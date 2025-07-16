
import styles from './Card.module.scss'
import { IoAddCircleSharp } from "react-icons/io5";
import Button from "../Button/Button.jsx";
import { TiDelete } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import defaultPoster from "../../assets/default poster.jpg";

function Card({ item, onAddToWatchlist, title, media_type, release_date, first_air_date, vote_average, backdrop_path, poster_path, original_name}){

    function handleClick(){
            console.log('click me')

    }

    return(
        <>
        <div className={styles.outerContainer}>
            {{backdrop_path} ? <img src={backdrop_path} alt="backgroundImage" className={styles.backdropImg}/> : <p> geen poster beschikbaar</p>}

            <div className={styles.innerContainer}>

                <div className={styles.titleContainer}>
                    <h1 className={styles.title}> {media_type} </h1>
                    <p className={styles.rating}><FaStar className={styles.star}/>{Math.round(vote_average * 10)}</p>
                </div>

                <h2> {title} {original_name}</h2>
                <span>{poster_path ?  <img src={poster_path} alt='poster' className={styles.posterImg}/> : <p> geen poster beschikbaar</p>} </span>
                <p>Release date: {release_date} {first_air_date}</p>

                <div className={styles.buttonContainer}>
                    <Button label={<IoAddCircleSharp style={{width: '50px', height: '50px'}}/>} variant='addBtn'
                            shape='circle' onClick={handleClick}/>

                    <Button variant='primaryBtn' size='large' label='More Info'/>

                    <Button label={<TiDelete style={{width: '50px', height: '50px'}}/>} variant='removeBtn'
                            shape='circle' onClick={() => onAddToWatchlist(item)}/>
                </div>
            </div>
        </div>


        </>


    )
}

export default Card;