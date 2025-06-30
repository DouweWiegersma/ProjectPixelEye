import styles from './NavBar.module.scss'


function NavBar(){


    return(
        <>
            <ul className={styles.navigationItems}>
                <li>Random</li>
                <li>Discover</li>
                <li>Watchlist</li>
                <li>
                    <button className={styles.loginBtn}>Login</button>
                </li>
            </ul>

        </>
    )
}

export default NavBar;