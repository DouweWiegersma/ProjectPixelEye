import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";
import styles from "./SignIn.module.scss";
import Button from "../../components/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner.jsx";
import Message from "../../components/message/Message.jsx";

function SignIn() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", status: "" });
    const clearMessage = () => setMessage({ text: "", status: "" });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },

        validationSchema: Yup.object({
            username: Yup.string()
                .min(3, "At least 3 characters")
                .required("Username is required"),
            password: Yup.string()
                .min(6, "At least 6 characters")
                .required("Password is required"),
        }),

        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await axios.post(
                    "https://api.datavortex.nl/pixeleye/users/authenticate",
                    {
                        username: values.username,
                        password: values.password,
                    },
                    {
                        headers: {
                            "X-API-KEY": "pixeleye:aO8LUAeun6zuzTqZllxY",
                            "Content-Type": "application/json",
                        },
                    }
                );

                setMessage({ text: "Login successful!", status: "success" });
                login(response.data.jwt);
                navigate("/");
            } catch (error) {
                console.error("Login failed:", error.response?.data || error.message);
                setMessage({ text: "Login failed", status: "error" });
            } finally {
                setLoading(false);
            }
        },
    });

    if (loading)
        return (
            <Spinner
                spinner="spinner"
                size="medium"
                border="non"
                container="container"
            />
        );

    return (
        <main className={styles["outer-container"]}>
            <section className={styles["inner-container"]}>
                <header>
                    <h1 className={styles.title}>Sign In</h1>
                </header>

                <form
                    onSubmit={formik.handleSubmit}
                    className={styles["form-container"]}
                >
                    <label>
                        Username:
                        <input
                            className={styles["input-style"]}
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
                            className={styles["input-style"]}
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

                    <Button
                        type="submit"
                        label="Sign In"
                        variant="primary-btn"
                        size="large"
                    />
                </form>

                <Message
                    text={message.text}
                    status={message.status}
                    clearMessage={clearMessage}
                />
            </section>
        </main>
    );
}

export default SignIn;