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
import DetailPage from "./components/DetailPage/DetailPage.jsx";
import Footer from "./components/footer/Footer.jsx"
import PrivateRoute from "./components/privateRoute/privateRoute.jsx";
function App() {

    const { isAuth} = useContext(AuthContext)
    return(
    <>

        <NavBar/>
        <Routes>
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/" element={<Home/>} />
            <Route path="/Profile" element={<PrivateRoute isAuth={isAuth}><Profile /></PrivateRoute>}/>
            <Route path="/Discover" element={<PrivateRoute isAuth={isAuth}> <Discover /></PrivateRoute>}/>
            <Route path="/Watchlist" element={<PrivateRoute isAuth={isAuth}><Watchlist /></PrivateRoute>}/>
            <Route path="/details/:id" element={<DetailPage />} />
        </Routes>
        <Footer/>

    </>
  )
}

export default App
