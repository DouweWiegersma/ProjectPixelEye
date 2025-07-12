import styles from './Discover.module.scss'
import { FaSearch } from "react-icons/fa";
import Button from "../../components/Button/Button.jsx";

function Discover(){


    return(
        <>
            <div className={styles.outerContainer}>
                <div className={styles.innerContainer}>
                    <label id='searchBar' className={styles.labelSearchBar}>Movie / Tv-Shows</label>
                    <div className={styles.searchBarContainer}>
                        <input type='text' className={styles.searchBar} placeholder='Search......'/>
                        <Button label={<FaSearch className={styles.iconSearch}/>} className={styles.searchButton}
                                variant='primaryBtn' size='small' shape='square'/>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Discover;