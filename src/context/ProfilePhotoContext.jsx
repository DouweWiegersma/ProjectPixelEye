import { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ProfilePhotoContext = createContext({
    profileImageUrl: null,
    loadingPhoto: false,
    downloadProfilePhoto: async () => {},
});

function ProfilePhotoContextProvider({ children }) {
    const { user, token } = useContext(AuthContext);
    const BASE_URL = "https://api.datavortex.nl/pixeleye";
    const API_KEY = "pixel:aO8LUAeun6zuzTqZllxY";

    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [loadingPhoto, setLoadingPhoto] = useState(false);

    const blobToBase64 = (blob) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

    const downloadProfilePhoto = useCallback(
        async (usernameParam) => {
            const currentUsername = usernameParam || user?.username;
            if (!currentUsername || !token) return;

            setLoadingPhoto(true);
            const localKey = `profileImageBase64_${currentUsername}`;

            try {
                const response = await axios.get(
                    `${BASE_URL}/users/${currentUsername}/download`,
                    {
                        headers: {
                            "X-Api-Key": API_KEY,
                            Authorization: `Bearer ${token}`,
                        },
                        responseType: "blob",
                    }
                );

                if (response.status === 200) {
                    const base64 = await blobToBase64(response.data);
                    setProfileImageUrl(base64);
                    localStorage.setItem(localKey, base64);
                } else {
                    setProfileImageUrl(null);
                    localStorage.removeItem(localKey);
                }
            } catch (e) {
                console.error("Download mislukt:", e);
                setProfileImageUrl(null);
                localStorage.removeItem(localKey);
            } finally {
                setLoadingPhoto(false);
            }
        },
        [token, user?.username]
    );

    useEffect(() => {
        if (!user?.username || !token) return;

        const localKey = `profileImageBase64_${user.username}`;
        const storedImage = localStorage.getItem(localKey);

        if (storedImage) {
            setProfileImageUrl(storedImage);
            setLoadingPhoto(false);
        } else {
            downloadProfilePhoto(user.username);
        }
    }, [user?.username, token, downloadProfilePhoto]);

    return (
        <ProfilePhotoContext.Provider
            value={{ profileImageUrl, loadingPhoto, setProfileImageUrl, downloadProfilePhoto }}
        >
            {children}
        </ProfilePhotoContext.Provider>
    );
}

export default ProfilePhotoContextProvider;