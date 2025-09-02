import {Link} from "react-router-dom";
import { FaRegCopyright } from "react-icons/fa";
import styles from "./Footer.module.scss"


function Footer(){


    return(
        <>
            <div className={styles.outerContainer}>
            <section>
                <h2 className={styles.titles}> Credits </h2>
                <p> Website created by [Douwe Wiegersma] </p>
                <p> Movie information and images provided by The Movie Database <a href="https://www.themoviedb.org" target="_blank"  rel="noopener noreferrer">(TMDB)</a>
                </p>
            </section>

            <nav>
            <h2 className={styles.titles}> Useful Links</h2>
            <ul className={styles.list}>
            <li><Link to="/"> Home </Link></li>
                    <li><Link to="/Discover"> Discover </Link></li>
                    <li><Link to="/Watchlist"> Watchlist </Link></li>
                </ul>
            </nav>

            <p> <FaRegCopyright /> 2025 PixelEye. all rights reserved.</p>
            </div>

        </>
    )
}


export default Footer;