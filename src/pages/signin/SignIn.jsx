import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import styles from "./SignIn.module.scss"
import Button from "../../components/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/spinner/Spinner.jsx";
import Message from "../../components/message/Message.jsx"

function SignIn() {
    const { login} = useContext(AuthContext);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [message, setMessage] = useState({ text: '', status: '' });
    const clearMessage = () => setMessage({ text: '', status: '' });
    const [loading, setLoading] = useState(false);
    function handleChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    async function handleSubmit(e) {
        setLoading(true)
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
            setMessage({ text: "inloggen succesvol!", status: 'success' });
            login(response.data.jwt);
            navigate('/');

        } catch (e) {
            console.error("Fout bij inloggen:", e.response?.data || e.message);
            setMessage({ text: "Fout bij inloggen", status: 'error' });
        }
        finally {
            setLoading(false)
        }
    }

    if(loading) return (<Spinner spinner='spinner' size='medium' border='non' container='container'/>)

    return (
        <>
                <main className={styles['outer-container']}>
                    <section className={styles['inner-container']}>

                        <header>
                            <h1 className={styles.title}>Inloggen</h1>
                        </header>
                            <form onSubmit={handleSubmit} className={styles['form-container']}>
                                <label>
                                    Gebruikersnaam:
                                    <input
                                        className={styles['input-style']}
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    /></label>


                                <label>
                                    Wachtwoord:
                                    <input
                                        className={styles['input-style']}
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>


                                <Button label='Log In' variant='primary-btn' size='large' type='submit'/>

                            </form>
                            <Message text={message.text} status={message.status} clearMessage={clearMessage}  />

                        </section>
                </main>
        </>
    );
}

export default SignIn;