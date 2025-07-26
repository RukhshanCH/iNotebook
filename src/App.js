import './App.css';
import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { useState } from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';


function App() {
  const[alert, setAlert] = useState(null)
    const showalert = (message, type) => {
      setAlert ({
        msg: message,
        typ: type
      })
      setTimeout(() => {
        setAlert(null)
      }, 1500);
    }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar title="iNoteBook" />
          <Alert alert={alert} />
          <Routes>
            <Route path='/' exact='true' element={<Home showalert={showalert} />} />
            <Route path='/about' exact='true' element={<About />} />
            <Route path='/login' exact='true' element={<Login showalert={showalert} />} />
            <Route path='/signup' exact='true' element={<Signup showalert={showalert} />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
