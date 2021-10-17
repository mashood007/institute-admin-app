import React, { useState } from 'react';
import PropTypes from 'prop-types';
//import './Login.css';
const url = 'https://institute-backend.herokuapp.com/api/v1/admin/login/'

async function loginUser(credentials) {
 return fetch(url, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await loginUser({
      username,
      password
    });
    if (data.token) {
      setToken(data.token);
      window.location.href = '/';
    } else {
      alert('login failed')
    }
  }

  return(
    <div className="login-wrapper container mt-5 text-center">
      <h1>Please Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label className="form-group">
            <p>Email</p>
            <input className='form-control' type="text" onChange={e => setUserName(e.target.value)} />
          </label>
        </div>
        <div className='row'>
          <label className="form-group">
            <p>Password</p>
            <input className='form-control' type="password" onChange={e => setPassword(e.target.value)} />
          </label>
        </div>
        <div className='col-sm-12 mt-2'>
          <button className='btn btn-primary ' type="submit">Sign in</button>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
