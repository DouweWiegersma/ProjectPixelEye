import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Rating({ rating }) {

    const stars = [];
    const roundedRating = Math.round (rating) / 2;

    for (let i = 1; i <= 5; i++) {
        if (i <= roundedRating) {
            stars.push(<FaStar key={i} style={{ color: 'gold' }} />);
        } else if (i - 0.5 <= roundedRating) {
            stars.push(<FaStarHalfAlt key={i} style={{ color: 'gold' }} />);
        } else {
            stars.push(<FaRegStar key={i} style={{ color: 'gold' }} />);
        }
    }

    return <div>{stars}</div>;
}

export default Rating;