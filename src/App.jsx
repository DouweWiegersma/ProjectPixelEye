import './App.scss'
import Home from "./pages/home/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import Card from "./components/Card/Card.jsx";

function App() {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY
    return(
    <>
        <Card/>
        <NavBar/>
        <Home/>
    </>
  )
}

export default App
