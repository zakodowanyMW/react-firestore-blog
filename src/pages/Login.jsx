import React from 'react';
import {auth, provider} from '../firebase-config';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

function Login({setIsAuth}) {
  let navigate = useNavigate();

  const singInWithGoogle = () => {
    signInWithPopup(auth, provider).then(result => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    })
  }
  return (
    <div className='loginPage'>
      <p>Sing In Google to Continue</p>
      <button className='login-width-google-btn' onClick={singInWithGoogle}>Sing In with Google</button>
    </div>
  )
}

export default Login