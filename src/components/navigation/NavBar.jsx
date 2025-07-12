import styles from "./NavBar.module.scss"
import { NavLink } from "react-router-dom";


function NavBar(){


    return(
        <>
            <ul className={styles.navigationItems}>
                <li> <NavLink to="/" className={({isActive}) => isActive === true ? styles.active : styles.default}> Home </NavLink> </li>
                <li> <NavLink to="/Discover" className={({isActive}) => isActive === true ? styles.active : styles.default}> Discover </NavLink> </li>
                <li> <NavLink to="/Watchlist" className={({isActive}) => isActive === true ? styles.active : styles.default}> Watchlist </NavLink> </li>
                <li>
                    <button className={styles.loginBtn}>Login</button>
                </li>
            </ul>

        </>
    )
}

export default NavBar;