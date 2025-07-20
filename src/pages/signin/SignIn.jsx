import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import styles from "./SignIn.module.scss"
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";


function SignIn() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    function handleChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://api.datavortex.nl/pixeleye/users/authenticate",
                {
                    username: formData.username,
                    password: formData.password,
                },
                {
                    headers: {
                        "X-API-KEY": "pixeleye:aO8LUAeun6zuzTqZllxY",
                        'Content-Type': 'application/json',
                    },
                }

            );
            console.log("Inloggen gelukt:", response);
            login(response.data.jwt);
            navigate('/');




        } catch (e) {
            console.error("Fout bij inloggen:", e.response?.data || e.message);
            setError("Inloggen mislukt. Controleer je gegevens.");
        }
    }


    return (
        <>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
            <h1 className={styles.title}>Inloggen</h1>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                            <label>
                                Gebruikersnaam:
                            <input
                                className={styles.inputStyle}
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            /></label>


                            <label>
                                Wachtwoord:
                            <input
                                className={styles.inputStyle}
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            </label>


                            <Button label='Log In' variant='primaryBtn' size='large' type='submit'/>
                    </form>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            </div>
        </>
    );
}

export default SignIn;