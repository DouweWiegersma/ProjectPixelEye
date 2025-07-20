import { useContext } from "react";
import { AuthContext } from "/src/context/AuthContext.jsx";
import styles from "./Profile.module.scss"
function Profile() {


    const {isAuth, user, logout} = useContext(AuthContext);

    if (!isAuth || !user) {
        return <p>Je bent niet ingelogd.</p>;
    }

    return (
        <>
            <div className={styles.outerContainer}>
            <h2>Welkom, {user.username}</h2>
            {/*<p>Je ID is: {user.id}</p>*/}
            {/*<p>Je rol is: {user.role}</p>*/}

            </div>
        </>
    );
}

export default Profile;