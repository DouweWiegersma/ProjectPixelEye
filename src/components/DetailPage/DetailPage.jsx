import { useLocation } from 'react-router-dom';
import styles from './DetailPage.module.scss';
import { FaStar } from 'react-icons/fa6';
import engelsNaarNederlandseDatum from "../../helpers/DutchDate.js";
import {useNavigate} from "react-router-dom";
import Button from "../Button/Button.jsx";
import Rating from "../ratingStars/Rating.jsx";


function DetailPage(props) {
    const navigate = useNavigate();
    const { state } = useLocation();


    const {
        title,
        original_name,
        overview,
        media_type,
        release_date,
        first_air_date,
        vote_average,
        backdrop_path,
        poster_path,
    } = props.title ? props : state || {};

    return (
        <article className={styles['detail-container']}>

            {backdrop_path &&
                <img src={backdrop_path} alt="Backdrop" className={styles.backdrop}/>}
            <div className={styles.content}>
                <header>
                <h2>{title || original_name}</h2>
                    <p> <Rating rating={vote_average}/></p>
                </header>
                <dl>
                    <div className={styles['row-layout']}>
                    <dt>Type:</dt>
                    <dd>{media_type} </dd>
                    </div>
                    <div className={styles['row-layout']}>
                    <dt>Release:</dt>
                    <dd>{engelsNaarNederlandseDatum(release_date || first_air_date)}</dd>
                    </div>
                    <div className={styles['row-layout']}>
                    <dt>Rating: </dt>
                    <dd>{Math.round(vote_average * 10)} <FaStar style={{color: 'yellow'}}/> </dd>
                    </div>
                </dl>

                <section className={styles['poster-and-overview']}>
                    {poster_path && <figure> <img src={poster_path} alt="Poster" className={styles.poster}/>
                    </figure>}

                    <p className={styles.overview}>{overview}</p>
                </section>
            </div>
            <Button label='Vorige' size='large'  variant='primary-btn' onClick={() => navigate(-1)}/>
        </article>
    );
}

export default DetailPage;