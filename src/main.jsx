import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext.jsx";
import ProfilePhotoContextProvider from "./context/ProfilePhotoContext.jsx";
import { GenresProvider } from "./context/GenreContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
      <AuthContextProvider>
          <ProfilePhotoContextProvider>
              <GenresProvider>
    <App />
              </GenresProvider>
          </ProfilePhotoContextProvider>
      </AuthContextProvider>

      </Router>
  </StrictMode>,
)
