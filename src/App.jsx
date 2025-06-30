import './App.scss'
import Home from "./pages/home/Home.jsx";
import NavBar from "./components/NavBar.jsx";


function App() {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY
    return(
    <>
        <NavBar/>
        <Home/>
    </>
  )
}

export default App
