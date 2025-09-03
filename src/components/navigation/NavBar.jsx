import styles from "./NavBar.module.scss"
import { NavLink } from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {ProfilePhotoContext} from "../../context/ProfilePhotoContext.jsx";


function NavBar(){
    const navigate = useNavigate()
    const { isAuth, user, logout, users} = useContext(AuthContext)
    const { downloadProfilePhoto, profileImageUrl, loadingPhoto,setProfileImageUrl, setLoadingPhoto, imagePreview} = useContext(ProfilePhotoContext)
    return (
        <nav className={styles['outer-container']}>

            <ul className={styles['navigation-items']}>
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
                        <li className={styles['center-picture']}>
                            {loadingPhoto ? (
                                <p>Loading...</p>
                            ) : (
                                <img
                                    src={imagePreview || profileImageUrl}
                                    alt="Profiel"
                                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                                />
                            )}
                            <NavLink
                                to="/Profile"
                                className={({ isActive }) => (isActive ? styles.active : styles.default)}
                            >
                                <span>{user?.username}</span>
                            </NavLink>
                        </li>
                        <li>
                            <Button
                                label="LogOut"
                                size="large"
                                onClick={logout}
                                variant="primary-btn"
                            />
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Button
                                label="Sign In"
                                variant="primary-btn"
                                size="large"
                                onClick={() => navigate("/SignIn")}
                            />
                        </li>
                        <li>
                            <Button
                                label="Sign Up"
                                variant="primary-btn"
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