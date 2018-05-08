import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import GoogleAuthentication from './GoogleAuthentication';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Standard Water</h1>
        </header>
        
        <GoogleAuthentication/>
      </div>
    );
  }
}

export default App;
