import React, { Component } from 'react'
//import { baseUrl } from '../assets/js/helpers';

export default class Logout extends Component {
  logout = () => {
      sessionStorage.removeItem("token");
      sessionStorage.clear();
  }

  render() {
      return (
            <button type='button' className='btn btn-danger nav-item btn-sm' onClick={this.logout}>Log Out</button>
      )
    }
  }
