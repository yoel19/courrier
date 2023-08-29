import React, { useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import IMAGE from '../image'
import '@fontsource/inter';
import Button from '@mui/joy/Button';
import { apiUrl } from '../config';

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const response = await fetch(`${apiUrl}/register`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, password }),
    // });

    if (true) {
      //const data = await response.json();
      //console.log(data);

      // Stockage du token JWT dans le local storage
      //localStorage.setItem('token', data.accessToken);

      // Redirection vers la page d'accueil ou autre page sécurisée
      // history.push('/accueil');
      window.location.href = '/dashboard';
    } else {
      setError('Échec de l\'authentification');
    }
  };

  return (
    <div className='sign-in-page'>
      <div className='signin-image' >


        <img className='auth-image' style={{ maxWidth: '65%', maxHeight: '100%' }} src={IMAGE.imgOne} alt="" />

        <br></br>

      </div>
      <div style={{ width: '50%' }} className='form'>
        <form className="all.form" onSubmit={handleSubmit}>
          <div className='text-3xl'>
            <h1>Connectez Vous</h1>
            {error && <p>{error}</p>}
          </div>

          <div className="form-group">
            <label htmlFor=" exampleInputEmail"> Email:</label>
            <input
              type='email'
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor=" exampleInputPassword1">Mot de passe:</label>
            <input
              type='password'
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <Button type="submit">Connexion</Button>

        </form>
      </div>

    </div>
  );
};
