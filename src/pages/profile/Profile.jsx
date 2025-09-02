import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ProfilePhotoContext } from "../../context/ProfilePhotoContext.jsx";
import placeholderImage from "../../assets/profile pic.jpg";
import Button from "../../components/Button/Button";
import styles from "./Profile.module.scss";

const API_KEY = "pixeleye:aO8LUAeun6zuzTqZllxY";
const BASE_URL = "https://api.datavortex.nl/pixeleye";
const API_KEY_TMDB = import.meta.env.VITE_TMDB_API_KEY;

function Profile() {
    const { user, token, isAuth, updateUsername } = useContext(AuthContext);
    const {
        profileImageUrl,
        loadingPhoto,
        downloadProfilePhoto,
        setProfileImageUrl,
    } = useContext(ProfilePhotoContext);

    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [trending, setTrending] = useState([]);
    const [username, setUsername] = useState("");
    const [usernameConfirm, setUsernameConfirm] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");

    const getLocalStorageKey = () =>
        user ? `profileImageUrl_${user.username}` : null;

    // Zorg dat profielfoto altijd correct wordt geladen
    useEffect(() => {
        if (!user?.username || !token) return;
        setLoading(false)
        const key = getLocalStorageKey();
        const storedImage = key ? localStorage.getItem(key) : null;

        if (storedImage) {
            setProfileImageUrl(storedImage);
        } else {
            downloadProfilePhoto();
        }
        setLoading(false)
    }, [user, token, downloadProfilePhoto, setProfileImageUrl]);

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    // Upload profielfoto
    async function handleUpload(e) {
        e.preventDefault();
        if (!selectedFile) return alert("Kies eerst een afbeelding.");

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            await axios.post(`${BASE_URL}/users/${user.username}/upload`, formData, {
                headers: {
                    "X-API-KEY": API_KEY,
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            // Na upload opnieuw downloaden in Base64 en context bijwerken
            await downloadProfilePhoto();
            setSelectedFile(null);
            setImagePreview(null);
            setMessage("Profielfoto succesvol geüpload!");
            setTimeout(() => setMessage(""), 3000);
        } catch (e) {
            console.error("Upload mislukt:", e);
            alert("Upload mislukt. Check console voor details.");
        }
    }

    // Username wijzigen
    const handleUsernameChange = async (e) => {
        e.preventDefault();
        if (username !== usernameConfirm) return;

        try {
            await axios.put(`${BASE_URL}/users/${user.username}`, { username }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "X-Api-Key": API_KEY,
                    "Content-Type": "application/json",
                },
            });

            const newUsername = updateUsername(username);
            await downloadProfilePhoto(newUsername); // gebruik direct nieuwe username
            setUsername("");
            setUsernameConfirm("");
            setMessage("Gebruikersnaam bijgewerkt!");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            console.error(err);
            setMessage("Netwerkfout bij wijzigen gebruikersnaam.");
        }
    };

    // Wachtwoord wijzigen
    async function handlePasswordChange(e) {
        e.preventDefault();
        if (newPassword !== newPasswordConfirm) {
            setMessage("Wachtwoorden komen niet overeen.");
            return;
        }

        try {
            await axios.put(
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
            // const newPassword = updateUsername(username);
            // await downloadProfilePhoto(newPassword);
            setNewPassword("");
            setNewPasswordConfirm("");
            setMessage("Wachtwoord succesvol gewijzigd.");
            setTimeout(() => setMessage(""), 3000);
        } catch (e) {
            console.error("Fout bij het wijzigen van je wachtwoord", e);
            setMessage("wijzigen wachtwoord is mislukt.");
        }
    }

    // Populaire films ophalen
    useEffect(() => {
        async function fetchTrending() {
            setLoading(true);
            try {
                const response = await axios.get(
                    "https://api.themoviedb.org/3/trending/movie/day",
                    {
                        params: {
                            api_key: API_KEY_TMDB,
                            language: "nl-NL",
                            page: 1,
                            region: "NL",
                        },
                    }
                );
                setTrending(response.data.results);
            } catch (e) {
                console.error("Geen data beschikbaar!", e);
            } finally {
                setLoading(false);
            }
        }

        fetchTrending();
    }, []);

    const backdropPaths = trending
        .filter((movie) => movie.backdrop_path)
        .map((movie) => movie.backdrop_path);

    if (!isAuth || !user) return <p>Je bent niet ingelogd.</p>;
    if (loading) return <p>Loading...</p>;
    if (loadingPhoto) return <p>Foto laden...</p>;
    return (
        <main className={styles.outerContainer}>
            <header className={styles.header}>

                <img src={`https://image.tmdb.org/t/p/original${backdropPaths[5]}`} alt='poster'
                     className={styles.backgroundImg}/>
                <h1 className={styles.title}> Welkom op je profiel pagina</h1>
                <figure className={styles.layoutProfilePic}>

                    <img
                        src={imagePreview || profileImageUrl || placeholderImage}
                        alt="Profiel"
                        className={styles.profileImage}
                    />
                    <figcaption>
                        <h2>{user?.username}</h2>
                    </figcaption>
                </figure>
            </header>


            <section className={styles.formStyle}>
                <form onSubmit={handleUsernameChange} className={styles.formContainer}>

                    <label htmlFor="username"> Gebruikersnaam wijzigen </label>
                    <input
                        id="username"
                        className={styles.inputBox}
                        type="text"
                        placeholder="Nieuwe gebruikersnaam"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="usernameConfirm"> Bevestig gebruikersnaam</label>
                    <input
                        id="usernameConfirm"
                        className={styles.inputBox}
                        type="text"
                        placeholder="Bevestig gebruikersnaam"
                        value={usernameConfirm}
                        onChange={(e) => setUsernameConfirm(e.target.value)}
                    />
                    <Button label="Wijzig gebruikersnaam" variant="secondaryBtn" type="submit"
                            disabled={!username || username !== usernameConfirm}/>
                </form>

                <form className={styles.layoutChangeProfilePic} onSubmit={handleUpload}>
                    <div className={styles.changePic}>
                        <h3> Verander je profiel foto</h3>
                        <label htmlFor="profilePic"> Upload nieuwe profielfoto</label>
                        <input
                            id="profilePic"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className={styles.test}
                        />
                        <Button variant="secondaryBtn" size="large" label="Upload Picture" type="submit"/>
                    </div>
                </form>


                <form onSubmit={handlePasswordChange} className={styles.formContainer}>
                    <h3>Wachtwoord wijzigen</h3>
                    <label htmlFor="newPassword">Nieuw wachtwoord</label>
                    <input
                        id="newPassword"
                        type="password"
                        placeholder="Nieuw wachtwoord"
                        value={newPassword}
                        className={styles.inputBox}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label htmlFor="newPasswordConfirm">Bevestig nieuw wachtwoord</label>
                    <input
                        id="newPasswordConfirm"
                        type="password"
                        placeholder="Bevestig nieuw wachtwoord"
                        value={newPasswordConfirm}
                        className={styles.inputBox}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    />
                    <Button label="Wijzig Wachtwoord" variant="secondaryBtn" type="submit"
                            disabled={!newPassword || newPassword !== newPasswordConfirm}/>
                </form>
            </section>
            <p style={{display: "flex", justifyContent: "center"}}>{message}</p>


        </main>

    );
    }


export default Profile;