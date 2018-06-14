import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="login">
        <a href="/auth/github">GitHub</a>
        <a href="/auth/facebook">Facebook</a>
      </div>
    );
  }
}

export default App;
