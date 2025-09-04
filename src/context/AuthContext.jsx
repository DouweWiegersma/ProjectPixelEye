import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

const API_KEY = "pixel:aO8LUAeun6zuzTqZllxY";
const BASE_URL = "https://api.datavortex.nl/pixeleye";

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        token: null,
        user: {
            username: null,
            displayName: null,
            id: 0,
            role: null,
            profileImageUrl: null,
        },
    });

    const navigate = useNavigate();


    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth));
        }
    }, []);


    useEffect(() => {
        if (auth.isAuth) {
            localStorage.setItem("auth", JSON.stringify(auth));
        } else {
            localStorage.removeItem("auth");
        }
    }, [auth]);


    function login(token) {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;

        const newAuth = {
            isAuth: true,
            token,
            user: {
                username,
                displayName: username,
                id: decodedToken.userId,
                role: decodedToken.role,
                profileImageUrl: null,
            },
        };

        setAuth(newAuth);
        navigate("/profile");
    }

    function logout() {
        setAuth({
            isAuth: false,
            token: null,
            user: { username: null, id: 0, role: null, profileImageUrl: null },
        });
        localStorage.removeItem("auth");
        navigate("/");
    }


    function updateUsername(newUsername) {
        setAuth((prev) => {
            const updated = {
                ...prev,
                user: { ...prev.user, username: newUsername },
            };
            localStorage.setItem("auth", JSON.stringify(updated));
            return updated;
        });
    }

    function updateProfilePicture(url) {
        setAuth((prev) => {
            const updated = {
                ...prev,
                user: { ...prev.user, profileImageUrl: url },
            };
            localStorage.setItem("auth", JSON.stringify(updated));
            return updated;
        });
    }

    async function updatePassword(newPassword) {
        try {
            await axios.post(
                `${BASE_URL}/users/${auth.user.username}`,
                { password: newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                        "X-Api-Key": API_KEY,
                        "Content-Type": "application/json",
                    },
                }
            );
            return true;
        } catch (err) {
            console.error("Wachtwoord updaten mislukt", err);
            return false;
        }
    }


    const contextData = {
        ...auth,
        login,
        logout,
        updateUsername,
        updateProfilePicture,
        updatePassword,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;