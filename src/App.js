import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import Loader from './components/Spinner';
import LoadingBar from "react-top-loading-bar";


function App() {
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState(false)
  const [loader, setloader] = useState(true)
  const [alert, setAlert] = useState(null)
  const showalert = (message, type) => {
    setAlert({
      msg: message,
      typ: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  useEffect(() => {
    setProgress(15);
    const timer = setTimeout(() => {
      setloader(false);
      setProgress(100);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const change_theme = () => {
    setTheme(!theme)
  }
    const theme_body = document.body
    if (theme) {
      theme_body.className = "light2"
    } else {
      theme_body.className = "light"
    }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar title="iNoteBook" Theme={theme} />
          <LoadingBar
            color="#fff"
            progress={progress}
            height={4}
          /> 
          {loader && <Loader />}
          {!loader &&
            <>
            <button className={`Btn ${theme ? "theme-btn" : "theme-btn2"}`} onClick={change_theme}>
              <div class="sign">
                {theme ? (
                  // Moon
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.75 15.5A9 9 0 1 1 12.5 2.25 7.5 7.5 0 1 0 21.75 15.5z" />
                  </svg>
                ) : (
                  // Sun
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm9-9v-2h3v2h-3zm-1.64 6.36l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm6.24-10.76l1.8-1.79-1.41-1.41-1.79 1.8 1.4 1.4z" />
                  </svg>
                )}

              </div>

              <div class="text">Change Theme</div>
            </button>
              <Alert alert={alert} />
              <Routes>
                <Route path='/' exact='true' element={<Home showalert={showalert} Theme={theme} />} />
                <Route path='/about' exact='true' element={<About Theme={theme} />} />
                <Route path='/login' exact='true' element={<Login showalert={showalert} setProgress={setProgress} Theme={theme} />} />
                <Route path='/signup' exact='true' element={<Signup showalert={showalert} setProgress={setProgress} Theme={theme} />} />
              </Routes>
            </>
          }
        </Router>
      </NoteState>
    </>
  );
}

export default App;
