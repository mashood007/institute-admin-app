import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Logout from './Login'
import Login from './Logout'
import Course from './Course'
import Student from './Student'
import Category from './Category'
import Question from './Question'

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}

function App() {
  const token = getToken();
  if(!token) {
  return <Login setToken={setToken} />
  }
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <nav className="navbar navbar-default">
           <div className="nav navbar-nav">
             <ul>
               <Link to='/' className="nav-item">Home</Link> |
               <Link to="/students" className="nav-item">Students</Link> |
               <Link to="/courses" className="nav-item">Courses</Link> |
               <Link to="/categories" className="nav-item">Categories</Link> |
               <Link to="/questions" className="nav-item">Questions</Link> |
            </ul>
          </div>
        </nav>
        <Switch>
          <Route path="/courses">
            <Course token={token}  />
          </Route>
          <Route path="/students">
            <Student token={token} />
          </Route>
          <Route path="/categories">
            <Category token={token} />
          </Route>
          <Route path='/questions'>
            <Question token={token} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
