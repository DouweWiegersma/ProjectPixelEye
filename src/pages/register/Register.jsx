import React, { useState } from "react";
import axios from "axios";

function Register() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    function handleChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    async function handleSubmit(e){
        e.preventDefault();

        const userPayload = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            info: "{}", // lege string of later je watchlist als JSON
            authorities: [{authority: "USER"}]
        };

        try {
            await axios.post(
                "https://api.datavortex.nl/pixeleye/users",
                userPayload,
                {
                    headers: {
                        "X-API-KEY": "pixeleye:aO8LUAeun6zuzTqZllxY",
                    },
                }
            );
            setMessage("Registratie succesvol!");
        } catch (error) {
            setMessage("Fout bij registreren: " + (error.response?.data || error.message));
        }
    }

        return (
            <div>
                <h2>Registreren</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Gebruikersnaam:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </label>


                    <label>
                        E-mailadres:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Wachtwoord:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>


                    <button type="submit">Registreer</button>
                </form>

                {message && <p>{message}</p>}
            </div>
        );
    }
export default Register;

