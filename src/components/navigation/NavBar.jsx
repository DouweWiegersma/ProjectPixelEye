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
        <nav className={styles.outerContainer}>
            <ul className={styles.navigationItems}>
                <li>
                    <NavLink
                        to="/"
                        className={({isActive}) => (isActive ? styles.active : styles.default)}
                    >
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/Discover"
                        className={({isActive}) => (isActive ? styles.active : styles.default)}
                    >
                        Discover
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/Watchlist"
                        className={({isActive}) => (isActive ? styles.active : styles.default)}
                    >
                        Watchlist
                    </NavLink>
                </li>

                {isAuth ? (
                    <>
                        <li className={styles.centerPicture}>
                            <img
                                src={user?.profileImageUrl}
                                alt="Profiel"
                                style={{width: 40, height: 40, borderRadius: "50%"}}
                            />
                            <NavLink
                                to="/Profile"
                                className={({isActive}) => (isActive ? styles.active : styles.default)}
                            >
                                {user.username}
                            </NavLink>
                        </li>
                        <li>
                            <Button
                                label="LogOut"
                                size="large"
                                onClick={logout}
                                variant="primaryBtn"
                            />
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Button
                                label="Sign In"
                                variant="primaryBtn"
                                size="large"
                                onClick={() => navigate("/SignIn")}
                            />
                        </li>
                        <li>
                            <Button
                                label="Sign Up"
                                variant="primaryBtn"
                                size="large"
                                onClick={() => navigate("/SignUp")}
                            />
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default NavBar;