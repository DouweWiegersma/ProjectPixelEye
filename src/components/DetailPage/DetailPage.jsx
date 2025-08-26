import { useLocation } from 'react-router-dom';
import styles from './DetailPage.module.scss';
import { FaStar } from 'react-icons/fa6';
import engelsNaarNederlandseDatum from "../../helpers/DutchDate.js";

function DetailPage() {
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
    } = state || {};

    return (
        <div className={styles.detailContainer}>
            {backdrop_path && <img src={backdrop_path} alt="Backdrop" className={styles.backdrop}/>}
            <div className={styles.content}>
                <h1>{title || original_name}</h1>
                <p>Type: {media_type} </p>
                <p>Release: {engelsNaarNederlandseDatum(release_date || first_air_date)}</p>
                <p>Rating: {Math.round(vote_average * 10)} <FaStar style={{color: 'yellow'}}/></p>

                <div className={styles.posterAndOverview}>
                    {poster_path && <img src={poster_path} alt="Poster" className={styles.poster}/>}

                    <p className={styles.overview}>{overview}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;