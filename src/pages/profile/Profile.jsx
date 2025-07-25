import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import placeholderImage from "../../assets/profile pic.jpg";
import Button from "../../components/Button/Button";
import styles from "./Profile.module.scss";

const API_KEY = "pixeleye:aO8LUAeun6zuzTqZllxY";
const BASE_URL = "https://api.datavortex.nl/pixeleye";
const API_KEY_TMDB = import.meta.env.VITE_TMDB_API_KEY;

function Profile() {
    const { updateProfilePicture } = useContext(AuthContext);
    const { user, token, isAuth, updateUsername} = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [loading, setLoading] = useState(false)
    const [trending, setTrending] = useState([])


    const [username, setUsername] = useState(user.username);
    const [usernameConfirm, setUsernameConfirm] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");


    useEffect(() => {
        if (user?.username && token) {
            downloadProfilePhoto();
        }
    }, [user, token]);

    async function downloadProfilePhoto(){
        try {
            const response = await axios.get(
                `${BASE_URL}/users/${user.username}/download`,
                {
                    headers: {
                        "X-Api-Key": API_KEY,
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: "blob",
                }
            );

            if (response.data.size === 0) {
                console.log("Geen profielfoto gevonden.");
                setProfileImageUrl(null);
                return;
            }
            const imageURL = URL.createObjectURL(response.data);
            setProfileImageUrl(imageURL);
            updateProfilePicture(imageURL);
            setLoading(false)
        } catch (e) {
            console.error("Download mislukt:", e);

        }
    };

    function handleFileChange(e){
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    async function handleUpload(){
        if (!selectedFile) {
            alert("Kies eerst een afbeelding.");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        try {
            const response = await axios.post(
                `${BASE_URL}/users/${user.username}/upload`,
                formData,
                {
                    headers: {
                        "X-API-KEY": API_KEY,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Upload response:", response);
            alert("Upload gelukt!");
            setSelectedFile(null);
            setImagePreview(null);
            downloadProfilePhoto();
        } catch (e) {
            console.error("Upload mislukt:", e);
            alert("Upload mislukt. Check console voor details.");
        }
    };


    async function handleUsernameChange(e) {
        e.preventDefault();
        if (username !== usernameConfirm) {
            setMessage("Gebruikersnamen komen niet overeen.");
            return;
        }

        try {
            const response = await axios.put(
                `${BASE_URL}/users/${user.username}`,
                { username: username },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-Api-Key": API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                updateUsername(username); // update context
                setMessage("Gebruikersnaam bijgewerkt.");
                setUsernameConfirm("");
            }
        } catch (e) {
            console.error("Fout bij wijzigen gebruikersnaam:", e);
            setMessage("Gebruikersnaam wijzigen mislukt.");
        }
    }

    async function handlePasswordChange(e) {
        e.preventDefault();
        if (newPassword !== newPasswordConfirm) {
            setMessage("Wachtwoorden komen niet overeen.");
            return;
        }

        try {
            const response = await axios.put(
                `${BASE_URL}/users/${user.username}`,
                { password: newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "X-Api-Key": API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                setMessage("Wachtwoord succesvol gewijzigd.");
                setNewPassword("");
                setNewPasswordConfirm("");
            }
        } catch (error) {
            console.error("Fout bij wijzigen wachtwoord:", error);
            setMessage("Wachtwoord wijzigen mislukt.");
        }
    }

    useEffect(() => {
        async function Popular() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
                    params: {
                        api_key: API_KEY_TMDB,
                        language: 'nl-NL',
                        page: 1,
                        region: 'NL'
                    }

                })
                console.log(response.data.results)
                setTrending(response.data.results)


            } catch (e) {
                console.error('Geen data beschikbaar!', e)

            }
            setLoading(false)
        }

        Popular()
    }, [API_KEY_TMDB])

    const backdropPaths = trending.filter(movie => movie.backdrop_path).map(movie => movie.backdrop_path)



    if (!isAuth || !user) return <p>Je bent niet ingelogd.</p>;
    if (loading) return <p> loading......</p>

    return (
        <div className={styles.outerContainer}>
            <header className={styles.header}>

                <img src={`https://image.tmdb.org/t/p/original${backdropPaths[5]}`} alt='poster'
                     className={styles.backgroundImg}/>
                <h1 className={styles.title}> Welkom op je profiel pagina</h1>
                <div className={styles.layoutProfilePic}>

                    <img
                        src={imagePreview || profileImageUrl || placeholderImage}
                        alt="Profiel"
                        className={styles.profileImage}
                    />
                    <h2>{user.username}</h2>
                </div>


            </header>


            <div className={styles.formStyle}>
                <form onSubmit={handleUsernameChange} className={styles.formContainer}>

                    <h3>Gebruikersnaam wijzigen</h3>

                    <input
                        className={styles.inputBox}
                        type="text"
                        placeholder="Nieuwe gebruikersnaam"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className={styles.inputBox}
                        type="text"
                        placeholder="Bevestig gebruikersnaam"
                        value={usernameConfirm}
                        onChange={(e) => setUsernameConfirm(e.target.value)}
                    />
                    <Button label="Wijzig gebruikersnaam" variant="secondaryBtn" type="submit"
                            disabled={!username || username !== usernameConfirm}/>

                </form>

                <div className={styles.layoutChangeProfilePic}>
                    <div className={styles.changePic}>
                        <h3> Verander je profiel foto</h3>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className={styles.test}
                        />

                        <Button variant="secondaryBtn" size="large" label="Upload Picture" onClick={handleUpload}/>
                    </div>
                </div>


                <form onSubmit={handlePasswordChange} className={styles.formContainer}>
                    <h3>Wachtwoord wijzigen</h3>

                    <input
                        type="password"
                        placeholder="Nieuw wachtwoord"
                        value={newPassword}
                        className={styles.inputBox}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Bevestig nieuw wachtwoord"
                        value={newPasswordConfirm}
                        className={styles.inputBox}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    />
                    <Button label="Wijzig Wachtwoord" variant="secondaryBtn" type="submit" va
                            disabled={!newPassword || newPassword !== newPasswordConfirm}/>
                </form>
            </div>

            {message && <p>{message}</p>}


        </div>
    );
}

export default Profile;