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

  return (
    <>
      <NoteState>
        <Router>
          <Navbar title="iNoteBook" />
          <LoadingBar
            color="#fff"
            progress={progress}
            height={4}
          />
          {loader && <Loader />}
          {!loader &&
            <>
              <Alert alert={alert} />
              <Routes>
                <Route path='/' exact='true' element={<Home showalert={showalert} />} />
                <Route path='/about' exact='true' element={<About />} />
                <Route path='/login' exact='true' element={<Login showalert={showalert} setProgress={setProgress} />} />
                <Route path='/signup' exact='true' element={<Signup showalert={showalert} setProgress={setProgress} />} />
              </Routes>
            </>
          }
        </Router>
      </NoteState>
    </>
  );
}

export default App;
