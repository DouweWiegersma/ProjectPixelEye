import './App.scss';
import NavBar from "./components/navigation/NavBar.jsx";
import { Routes, Route} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";
import Footer from "./components/footer/Footer.jsx"
import PrivateRoute from "./components/privateRoute/privateRoute.jsx";
import React, { Suspense } from "react";
import Spinner from "./components/spinner/Spinner.jsx";



const SignUp = React.lazy(() => import("./pages/signup/SignUp.jsx"));
const SignIn = React.lazy(() => import("./pages/signin/SignIn.jsx"));
const Profile = React.lazy(() => import("./pages/profile/Profile.jsx"));
const Home = React.lazy(() => import("./pages/home/Home.jsx"));
const Discover = React.lazy(() => import("./pages/discover/Discover.jsx"));
const Watchlist = React.lazy(() => import("./pages/watchlist/Watchlist.jsx"));
const DetailPage = React.lazy(() => import("./components/DetailPage/DetailPage.jsx"));



function App() {

    const { isAuth} = useContext(AuthContext)
    return(
    <>

        <NavBar/>
        <Suspense fallback={<Spinner spinner='spinner' size='large' container='container' border='dotted'/> }>
        <Routes>
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/" element={<Home/>} />
            <Route path="/Profile" element={<PrivateRoute isAuth={isAuth}><Profile /></PrivateRoute>}/>
            <Route path="/Discover" element={<PrivateRoute isAuth={isAuth}> <Discover /></PrivateRoute>}/>
            <Route path="/Watchlist" element={<PrivateRoute isAuth={isAuth}><Watchlist /></PrivateRoute>}/>
            <Route path="/details/:id" element={<DetailPage />} />
        </Routes>
            </Suspense>
        <Footer/>

    </>
  )
}

export default App
