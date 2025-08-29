import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {useEffect} from "react";
import axios from "axios";


export const AuthContext = createContext({})

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        token: null,
        user: {
            username: null,
            id: 0,
            role: null,
            profileImageUrl: null,
        },

    })

    const updateProfilePicture = (url) => {
        setAuth((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                profileImageUrl: url,
            },
        }));
        localStorage.setItem("profileImageUrl", url);
    };

    useEffect(() => {
        async function restoreAuth() {
            const token = localStorage.getItem("token");
            const storedUsername = localStorage.getItem("username");
            const storedProfileImage = localStorage.getItem("profileImageUrl");
            if (token && storedUsername) {
                try {
                    const response = await axios.get(`https://api.datavortex.nl/pixeleye/users/${storedUsername}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "X-Api-Key": "pixel:aO8LUAeun6zuzTqZllxY",
                        },
                    })

                    console.log(response)

                    const decodedToken = jwtDecode(token);
                    setAuth((prev) => ({
                        ...prev,
                        isAuth: true,
                        token: token,
                        user: {
                            username: storedUsername || decodedToken.sub,
                            id: decodedToken.userId,
                            role: decodedToken.role,
                            profileImageUrl: storedProfileImage || null,
                        },
                    }));
                } catch (error) {
                    localStorage.removeItem("token");
                    setAuth({
                        isAuth: false,
                        token: null,
                        user: {username: null, id: 0, role: null, profileImageUrl: null},
                    });
                }
            }
        }
        restoreAuth();
    }, []);


    const navigate = useNavigate()

    async function login(token) {
        localStorage.setItem('token', token)
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        localStorage.setItem("username", decodedToken.sub)

        setAuth({
            isAuth: true,
            token: token,
            user: {
                username: decodedToken.sub,
                id: decodedToken.userId,
                role: decodedToken.role,
            }
        });


        console.log('Gebruiker is ingelogd');

        navigate('/profile')
    }

    function logout() {

        setAuth({
            isAuth: false,
            token: null,
            user: {
                username: null,
                id: 0,
                role: null,
            }
        });
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("profileImageUrl");
        navigate('/');
    }
    function updateUsername(newUsername) {
        setAuth((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                username: newUsername,
            },
        }));
        localStorage.setItem("username", newUsername);
    }



    const contextData = {
        isAuth: auth.isAuth,
        login: login,
        logout: logout,
        user: auth.user,
        id: auth.id,
        token: auth.token,
        updateUsername: updateUsername,
        updateProfilePicture,
    }


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContextProvider;