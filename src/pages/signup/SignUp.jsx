import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import styles from "./SignUp.module.scss";
import Button from "../../components/Button/Button.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";
import Message from "../../components/message/Message.jsx"

function SignUp() {
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ text: '', status: '' });
    const clearMessage = () => setMessage({ text: '', status: '' });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },

        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, "At least 3 characters")
                .required("Username is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(8, "Minimum 8 characters")
                .matches(/[A-Z]/, "At least 1 uppercase letter")
                .matches(/\d/, "At least 1 number")
                .required("Password is required")
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

                setMessage({ text: "Registration successful!", status: 'success' });
                login({ username: values.username });
            } catch (error) {
                setMessage({ text: "Registration failed", status: 'error' });
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
                <h1 className={styles.title}>Sign Up</h1>
                </header>

                <form onSubmit={formik.handleSubmit} className={styles['form-container']}>
                    <label>
                        Email address:
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
                        Username:
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
                        Password:
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
                <Message text={message.text} status={message.status} clearMessage={clearMessage}/>
            </section>
        </main>
    );
}

export default SignUp;