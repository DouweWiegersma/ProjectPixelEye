import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { ProfilePhotoContext } from "../../context/ProfilePhotoContext.jsx";
import placeholderImage from "../../assets/profile pic.jpg";
import Button from "../../components/Button/Button";
import styles from "./Profile.module.scss";
import Spinner from "../../components/spinner/Spinner.jsx";
import Message from "../../components/message/Message.jsx"

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
    const [message, setMessage] = useState({ text: '', status: '' });
    const clearMessage = () => setMessage({ text: '', status: '' });

    useEffect(() => {
        if (!user?.username || !token) return;

        const fetchProfileImage = async () => {
            setLoading(true);
            try {
                const key = getLocalStorageKey();
                const storedImage = key ? localStorage.getItem(key) : null;

                if (storedImage) {
                    setProfileImageUrl(storedImage);
                } else {
                    await downloadProfilePhoto();
                }
            } catch (e) {
                console.error("Error fetching profile picture:", e);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileImage();
    }, [user, token, downloadProfilePhoto, setProfileImageUrl]);

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }


    async function handleUpload(e) {
        e.preventDefault();
        if (!selectedFile) return alert("Please select an image first");

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            await axios.post(`${BASE_URL}/users/${user.username}/upload`, formData, {
                headers: {
                    "X-API-KEY": API_KEY,
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            });


            await downloadProfilePhoto();
            setSelectedFile(null);
            setImagePreview(null);
            setMessage({ text: "Profile picture uploaded successfully!", status: 'success' });
            setTimeout(() => setMessage(""), 3000);
        } catch (e) {
            console.error("Upload failed:", e);
            setMessage({ text: "Profile picture upload failed!", status: 'error' });
        }
    }


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
            await downloadProfilePhoto(newUsername);
            setUsername("");
            setUsernameConfirm("");

            setMessage({ text: "Username updated!", status: 'success' });
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            console.error(err);
            setMessage({ text: "Error updating username", status: 'error' });
        }
    };


    async function handlePasswordChange(e) {
        e.preventDefault();
        if (newPassword !== newPasswordConfirm) {
            setMessage({ text: "Passwords do not match", status: 'error' });
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
            setNewPassword("");
            setNewPasswordConfirm("");
            setMessage({ text: "Password successfully changed!", status: 'success' });
            setTimeout(() => setMessage(""), 3000);
        } catch (e) {
            console.error("Error changing your password.", e);
            setMessage({ text: "wijzigen wachtwoord is mislukt", status: 'error' });
        }
    }


    useEffect(() => {
        const controller = new AbortController();
        async function fetchTrending() {
            setLoading(true);
            try {
                const response = await axios.get(
                    "https://api.themoviedb.org/3/trending/movie/day",
                    {
                        params: {
                            api_key: API_KEY_TMDB,
                            language: "en-En",
                            page: 1,
                            region: "NL",
                        },
                        signal: controller.signal,
                    }
                );
                setTrending(response.data.results);
            } catch (e) {
                console.error("No data available!", e);
            } finally {
                setLoading(false);
            }
        }
        fetchTrending();
        return () => {
            controller.abort();
        }
    }, []);

    const backdropPaths = trending
        .filter((movie) => movie.backdrop_path)
        .map((movie) => movie.backdrop_path);

    if (!isAuth || !user) return <p>Je bent niet ingelogd.</p>;
    if (loading) return <Spinner spinner='spinner' size='medium' border='border-dotted' container='container'/>;
    if (loadingPhoto) return <Spinner spinner='spinner' size='small' border='border-dotted'/>;
    return (
        <main className={styles['outer-container']}>
            <header className={styles.header}>

                <img src={`https://image.tmdb.org/t/p/original${backdropPaths[5]}`} alt='poster'
                     className={styles['background-img']}/>
                <h1 className={styles.title}> Welcome to your profile page!</h1>
                <figure className={styles['layout-profile-pic']}>
                    <img
                        src={imagePreview || profileImageUrl || placeholderImage}
                        alt="Profiel"
                        className={styles['profile-image']}
                    />
                    <figcaption>
                        <h2>{user?.username}</h2>
                    </figcaption>
                </figure>
            </header>


            <section className={styles['form-style']}>
                <form onSubmit={handleUsernameChange} className={styles['form-container']}>
                    <h3> Change username</h3>
                    <label htmlFor="username"> New username </label>
                    <input
                        id="username"
                        className={styles['input-box']}
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="usernameConfirm"> Confirm username</label>
                    <input
                        id="usernameConfirm"
                        className={styles['input-box']}
                        type="text"
                        placeholder="username"
                        value={usernameConfirm}
                        onChange={(e) => setUsernameConfirm(e.target.value)}
                    />
                    <Button label="Change username" variant="secondary-btn" type="submit"
                            disabled={!username || username !== usernameConfirm}/>
                </form>

                <form className={styles['layout-change-profile-pic']} onSubmit={handleUpload}>
                    <div className={styles['change-pic']}>
                        <h3> Change your profile picture</h3>
                        <label htmlFor="profilePic"> Upload new profile picture</label>
                        <input
                            id="profilePic"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}

                        />
                        <Button variant="secondary-btn" size="large" label="Upload Picture" type="submit"/>
                    </div>
                </form>


                <form onSubmit={handlePasswordChange} className={styles['form-container']}>
                    <h3>Change password</h3>
                    <label htmlFor="newPassword">New password</label>
                    <input
                        id="newPassword"
                        type="password"
                        placeholder="password"
                        value={newPassword}
                        className={styles['input-box']}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label htmlFor="newPasswordConfirm">Confirm password</label>
                    <input
                        id="newPasswordConfirm"
                        type="password"
                        placeholder="password"
                        value={newPasswordConfirm}
                        className={styles['input-box']}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    />
                    <Button label="Change password" variant="secondary-btn" type="submit"
                            disabled={!newPassword || newPassword !== newPasswordConfirm}/>
                </form>
            </section>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Message text={message.text} status={message.status} clearMessage={clearMessage} />
            </div>

        </main>

    );
    }


export default Profile;