import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GenresContext = createContext();

export function GenresProvider({ children }) {
    const [movieGenre, setMovieGenre] = useState([]);
    const [tvGenre, setTvGenre] = useState([]);
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


    useEffect(() => {
        const controller = new AbortController();
        async function Moviegerne() {
            try {
                const response = await axios.get(
                    "https://api.themoviedb.org/3/genre/movie/list",{
                        params: {
                            api_key: API_KEY,
                        },
                        headers: {
                            accept: "application/json",
                        },
                        signal: controller.signal,
                    }
                );
                setMovieGenre(response.data.genres);
            } catch (e) {
                console.error("Error during search:", e);
            }
        }

        Moviegerne();

        return () => {
            controller.abort();
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        async function Tvgerne() {
            try {

                const response = await axios.get(
                    "https://api.themoviedb.org/3/genre/tv/list",{
                        params: {
                            api_key: API_KEY,
                        },
                        headers: {
                            accept: "application/json",
                        },
                        signal: controller.signal,
                    }
                );
                setTvGenre(response.data.genres);
            } catch (e) {
                console.error("Error during search:", e);
            }
        }

        Tvgerne();

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <GenresContext.Provider value={{ movieGenre, tvGenre }}>
            {children}
        </GenresContext.Provider>
    );
}