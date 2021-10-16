import React, { Component } from 'react'
//import { baseUrl } from '../assets/js/helpers';

export default class Logout extends Component {
  logout = () => {
      //sessionStorage.removeItem("userToken");
      //sessionStorage.clear();
  }

  render() {
      return (
          <div>
            <button type='button' onClick={this.logout}>Log Out</button>
          </div>
      )
    }
  }
