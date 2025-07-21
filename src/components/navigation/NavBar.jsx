import styles from "./NavBar.module.scss"
import { NavLink } from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../Button/Button.jsx";
import {useNavigate} from "react-router-dom";


function NavBar(){
    const navigate = useNavigate()
    const { isAuth, user, logout, login} = useContext(AuthContext)
    return (
        <>
            <div className={styles.outerContainer}>
        <ul className={styles.navigationItems}>
            <li><NavLink to="/"
                         className={({isActive}) => isActive === true ? styles.active : styles.default}> Home </NavLink>
            </li>
            {isAuth ? (
                <>
            <li> <NavLink to="/Discover"
                         className={({isActive}) => isActive === true ? styles.active : styles.default}> Discover </NavLink>
            </li>
            <li><NavLink to="/Watchlist"
                         className={({isActive}) => isActive === true ? styles.active : styles.default}> Watchlist </NavLink>
            </li></>) : (<><li> Discover</li>  <li>Watchlist</li></>)}

            {isAuth ? (
                <>
                    <li><NavLink to="/Profile"
                                 className={({isActive}) => isActive === true ? styles.active : styles.default}> {user.username} </NavLink>
                    </li>
                    <li><Button label="LogOut" size="large" onClick={logout} variant="primaryBtn"/></li>
                </>
            ) : (
                <>
                <li><Button label="Login" variant="primaryBtn" size="large" onClick={() => navigate("/SignIn")}/></li>
                <li> <Button label="SignUp" variant="primaryBtn" size="large" onClick={() => navigate("/SignUp")}/> </li>
                </>
    )
}

            </ul>
            </div>

        </>
    )
}

export default NavBar;