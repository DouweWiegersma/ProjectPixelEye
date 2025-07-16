import './App.scss';
import Home from "./pages/home/Home.jsx";
import Discover from "./pages/discover/Discover.jsx";
import Watchlist from "./pages/watchlist/Watchlist.jsx";
import NavBar from "./components/navigation/NavBar.jsx";
// import Card from "./components/Card/Card.jsx";
import Register from "./pages/register/Register.jsx"

import { Routes, Route} from 'react-router-dom';
function App() {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY
    return(
    <>

        <NavBar/>
        <Routes>
        <Route path="/Register" element={<Register/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/Discover" element={<Discover/>} />
        <Route path="/Watchlist" element={<Watchlist/>} />
        </Routes>
    </>
  )
}

export default App
