import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import { useState } from 'react';
import {signOut} from 'firebase/auth';
import { auth } from './firebase-config';
import Home2 from './pages/Home2';

function App() {

  const [isAuth, setIsAuth] = useState(false);

  const singUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    })
  }
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {!isAuth ? (<Link to="/login">Login</Link>) : (
          <>
            <Link to="/createpost">Create Post</Link>
            <button onClick={singUserOut}>Log Out</button>
          </>)
        }
      </nav>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/home2' element={<Home2 />} />
        <Route exact path='/createpost' element={<CreatePost isAuth={isAuth}/>} />
        <Route exact path='/login' element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
