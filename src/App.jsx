import './App.scss';
import Home from "./pages/home/Home.jsx";
import Discover from "./pages/discover/Discover.jsx";
import Watchlist from "./pages/watchlist/Watchlist.jsx";
import NavBar from "./components/navigation/NavBar.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import SignIn from "./pages/signin/SignIn.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { Routes, Route} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";
import { ProfilePhotoContext } from "./context/ProfilePhotoContext.jsx";
import DetailPage from "./components/DetailPage/DetailPage.jsx";
function App() {
    // const API_KEY = import.meta.env.VITE_TMDB_API_KEY
    const { isAuth} = useContext(AuthContext)
    return(
    <>

        <NavBar/>
        <Routes>
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/Profile" element={isAuth === true ? <Profile/> : <Home/>} />
        <Route path="/Discover" element={isAuth === true ? <Discover/> : <Home/>} />
        <Route path="/Watchlist" element={isAuth === true ? <Watchlist/> : <Home/>} />
            <Route path="/details/:id" element={<DetailPage />} />
        </Routes>
    </>
  )
}

export default App
