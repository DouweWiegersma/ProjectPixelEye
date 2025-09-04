import styles from './Discover.module.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "../../components/Card/Card.jsx";
import background from "../../assets/movie background.jpg"
import Random from "../../components/random/Random.jsx";
import Button from "../../components/Button/Button.jsx";
import { IoSearchSharp } from "react-icons/io5";
import Spinner from "../../components/spinner/Spinner.jsx";
import Message from "../../components/message/Message.jsx"
import poster from "../../assets/poster-placeholder.png"


function Discover(){

    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false)
    const [pages, setPages] = useState(0)
    const [data, setData] = useState([])
    const [next, setNext] = useState(1)
    const [search, setSearch] = useState('')
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const [message, setMessage] = useState({ text: '', status: '' });
    const clearMessage = () => setMessage({ text: '', status: '' });

    useEffect(() => {
        const controller = new AbortController();
        if (!searchQuery) return;
        async function keyword() {
            setLoading(true);
            try {
                const response = await axios.get('https://api.themoviedb.org/3/search/multi', {
                    params: {
                        page: next,
                        query: searchQuery,
                        api_key: API_KEY
                    },
                    headers: {
                        accept: 'application/json',
                    },
                    signal: controller.signal,
                });
                setData(response.data.results);

                setPages(response.data.total_pages);
            } catch (e) {
                console.error('Fout bij zoeken:', e);
                setMessage({ text: "Fout bij zoeken", status: 'error' });
            } finally {
                setLoading(false);
            }
        }
        keyword();
        return () => {
            controller.abort();
        }
    }, [searchQuery, next]);


    const backDrop = data[0]?.backdrop_path && `https://image.tmdb.org/t/p/original${data[0]?.backdrop_path}` || background

    function nextPage(){
        setNext(next + 1)
    }

    function prevPage(){
        setNext(next - 1)
    }
    if (loading) return (<Spinner spinner='spinner' size='medium' border='dotted' container='container'/>);


    return(
        <>

            <div className={styles['outer-container']}>
                <div className={styles['inner-container']}>
                    <img src={backDrop} alt='background' className={styles['background-pic']}/>
                    <section className={styles['search-bar-container']}>
                        <label id='searchBar' className={styles['label-search-bar']}>Movie / Tv-Shows
                            <div className={styles.row}>
                                <input value={searchInput}
                                       type='text'
                                       onChange={(e) => {
                                           setNext(1)
                                           setSearchInput(e.target.value)
                                       }} className={styles['search-bar']} placeholder='Search......'/>
                                <Button
                                    variant='primary-btn'
                                    shape='square'
                                    size='small'
                                    label={<IoSearchSharp className={styles['search-icon']}/>}
                                    onClick={() => {
                                        setNext(1);
                                        setSearchQuery(searchInput);
                                    }}/>

                            </div>
                        </label>
                        <Random/>
                    </section>

                    <Message text={message.text} clearMessage={clearMessage} status={message.status}/>


                    {!search && (
                        <main className={styles['result-layout']}>
                            {loading ? (
                                <p></p>
                            ) : data.length > 0 ? (
                                data.map((data) => (
                                    <Card
                                        disableDelete={true}
                                        overview={data?.overview}
                                        key={data?.id}
                                        id={data?.id}
                                        media_type={data?.media_type}
                                        title={data?.title}
                                        popularity={data?.popularity}
                                        know_for={data?.known_for_department}
                                        profile_path={`https://image.tmdb.org/t/p/original${data?.profile_path}`}
                                        release_date={data?.release_date}
                                        first_air_date={data?.first_air_date}
                                        vote_average={data?.vote_average}
                                        backdrop_path={data?.backdrop_path
                                            ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` :
                                            poster }
                                        poster_path={data?.poster_path
                                            ? `https://image.tmdb.org/t/p/original${data.poster_path}` : poster}
                                        original_name={data?.name}
                                    />
                                ))
                            ) : search && <p></p>}
                        </main>
                    )}

                    <nav className={styles['button-layout']}>
                        {next > 1 &&
                            <Button onClick={prevPage} variant='primaryBtn' size='large' label='prev'/>}
                        {next < pages &&
                            <Button onClick={nextPage} variant='primaryBtn' size='large' label='next'/>}
                    </nav>





                </div>
            </div>
        </>
    )
}

export default Discover;