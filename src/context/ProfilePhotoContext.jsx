import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // pas het pad aan

export const ProfilePhotoContext = createContext({profileImageUrl: null,
    loadingPhoto: false});

function ProfilePhotoContextProvider({ children }) {
    const { user, token, updateProfilePicture } = useContext(AuthContext);
    const BASE_URL = "https://api.datavortex.nl/pixeleye";
    const API_KEY = "pixel:aO8LUAeun6zuzTqZllxY";
    const [profileImageUrl, setProfileImageUrl] = useState( null);
    const [loadingPhoto, setLoadingPhoto] = useState(false);

    // checked of de user is ingelogd
    //  vervoglens checked of er een afbeelding in de localstorage zit
    //  en anders roept hij de downloadProfilePhoto functie op
    useEffect(() => {
        if (!user) return;
        const storedImage = localStorage.getItem(`profileImageUrl_${user.username}`);
        if (storedImage) {
            setProfileImageUrl(storedImage);
        } else {
            downloadProfilePhoto();
        }
    }, [user, token]);


    async function downloadProfilePhoto() {
        if (!user || !token) return;
        setLoadingPhoto(true);
        try {
            const response = await axios.get(
                `${BASE_URL}/users/${user.username}/download`,
                {
                    headers: {
                        "X-Api-Key": API_KEY,
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: "blob",

                }
            );

            if (response.status === 200) {
                const blobUrl = URL.createObjectURL(response.data);
                setProfileImageUrl(blobUrl);
                localStorage.setItem(`profileImageUrl_${user.username}`, blobUrl);
            } else {
                setProfileImageUrl(null);
                localStorage.removeItem(`profileImageUrl_${user.username}`);
            }
        } catch (e) {
            console.error("Download mislukt:", e);
        } finally {
            setLoadingPhoto(false);
        }
    }


    const contextData = {profileImageUrl, loadingPhoto, setProfileImageUrl, setLoadingPhoto, downloadProfilePhoto};

    return (
        <ProfilePhotoContext.Provider value={contextData}>
            {children}
        </ProfilePhotoContext.Provider>
    );
}

export default ProfilePhotoContextProvider;