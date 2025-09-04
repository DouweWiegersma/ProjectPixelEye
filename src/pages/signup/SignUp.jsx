import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import styles from "./SignUp.module.scss";
import Button from "../../components/Button/Button.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";

function SignUp() {
    const { login } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },

        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, "Minimaal 3 tekens")
                .required("Gebruikersnaam is verplicht"),
            email: Yup.string()
                .email("Ongeldig e-mailadres")
                .required("E-mail is verplicht"),
            password: Yup.string()
                .min(8, "Minimaal 8 tekens")
                .matches(/[A-Z]/, "Minstens 1 hoofdletter")
                .matches(/\d/, "Minstens 1 cijfer")
                .required("Wachtwoord is verplicht")
        }),

        onSubmit: async (values) => {

            const userPayload = {
                username: values.username,
                email: values.email,
                password: values.password,
                info: "{}",
                authorities: [{ authority: "USER" }],
            };
                setLoading(true)
            try {
                await axios.post("https://api.datavortex.nl/pixeleye/users", userPayload, {
                    headers: {
                        "X-API-KEY": "pixeleye:aO8LUAeun6zuzTqZllxY",
                    }
                });

                setMessage("Registratie succesvol!");
                login({ username: values.username });
            } catch (error) {
                setMessage("Fout bij registreren: " + (error.response?.data || error.message));
            }
            finally {
                setLoading(false)
            }

        },
    });

        if(loading) return(<Spinner spinner='spinner' size='medium' border='non' container='container'/>)
    return (
        <main className={styles['outer-container']}>
            <section className={styles['inner-container']}>
                <header>
                <h1 className={styles.title}>Registreren</h1>
                </header>

                <form onSubmit={formik.handleSubmit} className={styles['form-container']}>
                    <label>
                        E-mailadres:
                        <input
                            className={styles['input-style']}
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className={styles.error}>{formik.errors.email}</p>
                        )}
                    </label>

                    <label>
                        Gebruikersnaam:
                        <input
                            className={styles['input-style']}
                            type="text"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <p className={styles.error}>{formik.errors.username}</p>
                        )}
                    </label>

                    <label>
                        Wachtwoord:
                        <input
                            className={styles['input-style']}
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className={styles.error}>{formik.errors.password}</p>
                        )}
                    </label>

                    <Button type="submit" label="Sign Up" variant="primary-btn" size="large" />
                </form>
                {message && <p>{message}</p>}
            </section>
        </main>
    );
}

export default SignUp;