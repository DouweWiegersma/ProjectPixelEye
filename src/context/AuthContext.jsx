import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {useEffect} from "react";


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
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setAuth({
                    token: token,
                    isAuth: true,
                    user: {
                        username: decodedToken.sub,
                        id: decodedToken.userId,
                        role: decodedToken.role,
                    },
                });
            } catch (error) {
                localStorage.removeItem("token");
                setAuth({
                    token: null,
                    isAuth: false,
                    user: {
                        username: null,
                        id: 0,
                        role: null,
                    },
                });
            }
        }
    }, []);

    const navigate = useNavigate()

    async function login(token) {
        localStorage.setItem('token', token)
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)

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
        localStorage.removeItem('token');
        navigate('/');
    }
    function updateUsername(newUsername) {
        setUser((prev) => ({
            ...prev,
            username: newUsername,
        }));
    }



    const contextData = {
        isAuth: auth.isAuth,
        login: login,
        logout: logout,
        user: auth.user,
        id: auth.id,
        token: auth.token,
        updateUsername,
        updateProfilePicture,
    }


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContextProvider;