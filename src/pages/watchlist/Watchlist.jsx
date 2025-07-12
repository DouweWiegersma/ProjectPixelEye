import styles from "./Watchlist.module.scss"
import Card from "../../components/Card/Card.jsx"
import backgroundImg from "../../assets/watchlist achtergrond.jpg"

function Watchlist(){

    return(
        <>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <div className={styles.backgroundImgContainer}>


                        <div className={styles.headerLayout}>
                            <header>
                                <h1>Watchlist</h1>
                                <h2> Welkom op je persoonlijke filmparkeerplaats.</h2>
                                <p> Geen zin om nú een film te kijken? Zet 'm hier neer.
                                    Je Watchlist oordeelt niet. Die fluistert alleen zachtjes: "ik bewaar het wel voor
                                    je
                                    ..."</p>
                            </header>
                        </div>
                    </div>


                    <div className={styles.cardLayout}>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Watchlist;