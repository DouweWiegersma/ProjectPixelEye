import styles from './GenreBadge.module.scss'

function getGenreName(id, type, movieGenres, tvGenres) {
    const list = type === "movie" ? movieGenres : tvGenres;
    const genre = list.find((g) => g.id === id);
    return genre ? genre.name : "Unknown";
}


export default function GenreBadge({ id, type, movieGenres, tvGenres }) {
    const classMap = {
        Action: styles.action,
        Adventure: styles.adventure,
        Comedy: styles.comedy,
        Drama: styles.drama,
        Horror: styles.horror,
        Romance: styles.romance,
        Thriller: styles.thriller,
        Mystery: styles.mystery,
        Crime: styles.crime,
        Reality: styles.reality,
        Family: styles.family,
        Documentary: styles.documentary,
        default: styles.default,

    };



    const name = getGenreName(id, type, movieGenres, tvGenres);
    const colorClass = classMap[name] || classMap.default;
    return (
        <span  className={`${styles.badge} ${colorClass}`}>
           {name}
    </span>
    );
}