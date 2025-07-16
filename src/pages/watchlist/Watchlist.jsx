import styles from "./Watchlist.module.scss"

import { useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card.jsx";




function Watchlist(){
        const [watchlist, setWatchlist] = useState([]);

        const handleAddToWatchlist = async (item) => {
            try {
                const response = await axios.put("/api/watchlist", {
                    itemId: item.id,
                    title: item.title || item.original_name,
                    media_type: item.media_type,
                    poster_path: item.poster_path,
                });

                setWatchlist((prev) => [...prev, item]); // lokaal toevoegen
                console.log("Toegevoegd aan watchlist:", response.data);
            } catch (err) {
                console.error("Fout bij toevoegen aan watchlist:", err);
            }
        };

        // testdata (vervang dit door echte data / fetch)
        // const items = [
        //     {
        //         id: 1,
        //         title: "Breaking Bad",
        //         media_type: "tv",
        //         vote_average: 9.5,
        //         release_date: null,
        //         first_air_date: "2008-01-20",
        //         backdrop_path: null,
        //         poster_path: null,
        //         original_name: "Breaking Bad",
        //     },
        // ];

        return (

            <div>
                {items.map((item) => (
                    <Card
                        key={item.id}
                        item={item}
                        title={item.title}
                        media_type={item.media_type}
                        release_date={item.release_date}
                        first_air_date={item.first_air_date}
                        vote_average={item.vote_average}
                        backdrop_path={item.backdrop_path}
                        poster_path={item.poster_path}
                        original_name={item.original_name}
                        onAddToWatchlist={handleAddToWatchlist}
                    />
                ))}
            </div>

//     );
// }
//     return(
//         <>
//             <div className={styles.outerContainer}>
//                 <div className={styles.innerContainer}>
//                     <div className={styles.backgroundImgContainer}>
//
//
//                         <div className={styles.headerLayout}>
//                             <header>
//                                 <h1>Watchlist</h1>
//                                 <h2> Welkom op je persoonlijke filmparkeerplaats.</h2>
//                                 <p> Geen zin om nú een film te kijken? Zet 'm hier neer.
//                                     Je Watchlist oordeelt niet. Die fluistert alleen zachtjes: "ik bewaar het wel voor
//                                     je
//                                     ..."</p>
//                             </header>
//                         </div>
//                     </div>
//                     <div className={styles.cardLayout}>
//
//
//
//                     </div>
//                 </div>
//             </div>
//         </>

    )
}

export default Watchlist;