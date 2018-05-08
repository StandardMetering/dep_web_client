/* global gapi */
/* global whenAuthLoads */

import React, {Component} from 'react';

var auth2;

class GoogleAuthentication extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      signedIn: false,
      userName: null
    };
    
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleAuthIsReady = this.handleAuthIsReady.bind(this);
    this.googleUserHasChanged = this.googleUserHasChanged.bind(this);
    
    whenAuthLoads(this.handleAuthIsReady);
  }
  
  handleAuthIsReady() {
    
    auth2 = gapi.auth2.getAuthInstance();
    
    // Listen for changes to current user.
    auth2.currentUser.listen(this.googleUserHasChanged);
    
    // Sign in the user if they are currently signed in.
    if (auth2.isSignedIn.get() === true) {
      auth2.signIn();
    }
    
  }
  
  googleUserHasChanged(user) {
    
    if (user && user.getAuthResponse() && user.getAuthResponse().id_token) {
      console.log("New Google User");
      this.authenticateIDToken(user.getAuthResponse().id_token);
    } else {
      console.log("No google user");
      this.setState({
        signedIn: false,
        userName: null
      });
    }
    
  }
  
  authenticateIDToken(id_token) {
    
    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'http://localhost:8081/authenticate', true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("Authorization", "Bearer " + id_token);
    
    xhr.onload = function () {
      let response = JSON.parse(xhr.response);
      console.log("Received Response: ", response);
      
      this.setState({
        signedIn: true,
        userName: response.name
      })
    }.bind(this);
    
    console.log("Authenticating new Google user.");
    xhr.send();
  }
  
  handleSignIn() {
    
    if (this.state.signedIn) {
      auth2.signOut();
    } else {
      auth2.signIn();
    }
    
  }
  
  render() {
    
    return (
      <button onClick={this.handleSignIn} style={{marginTop: 1 + 'em'}}>
        {this.state.signedIn ? "Signed in as: " + this.state.userName : "Sign in with Google"  }
      </button>
    );
    
  }
  
}

export default GoogleAuthentication;