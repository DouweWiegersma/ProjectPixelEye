import {useContext, useEffect} from "react";
import { AuthContext } from "/src/context/AuthContext.jsx";
import styles from "./Profile.module.scss"
import {useState} from "react";
// import axios from "axios";
import profilePicture from "../../assets/profile pic.jpg"
function Profile() {


    const {isAuth, user, logout} = useContext(AuthContext);
    const [image, setImage] = useState('')
    if (!isAuth || !user) {
        return <p>Je bent niet ingelogd.</p>;
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);
                localStorage.setItem("profileImage", reader.result);
            };

            reader.readAsDataURL(file);
        }
    };


    return (
        <>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                <span className={styles.profilePic}> <img src={image || profilePicture} alt='Pic' style={{ width: 50, height: 50, borderRadius: "50%" }}/> </span>
                <h2>Welkom, {user.username}</h2>


                <label className={styles.labelUpload}>Profiel foto:</label>
                <input type="file" accept="image/" onChange={handleImageChange} className={styles.uploadBtn} />

                </div>


                {/*<p>Je ID is: {user.id}</p>*/}
                {/*<p>Je rol is: {user.role}</p>*/}

            </div>
        </>
    );
}

export default Profile;