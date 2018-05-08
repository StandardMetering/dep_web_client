let CLIENT_ID = "438678561117-b8d1tn6ftgjio5751dmo79olp1q86e56.apps.googleusercontent.com";

var auth2;
var whenAuthLoadsCallback = null;

function whenAuthLoads(callback) {
  whenAuthLoadsCallback = callback;
}

/**
 * Calls startAuth after Sign in V2 finishes setting up.
 */
var appStart = function () {
  gapi.load('auth2', initSigninV2);
};

/**
 * Initializes Signin v2 and sets up listeners.
 */
var initSigninV2 = function () {
  auth2 = gapi.auth2.init({
    client_id: CLIENT_ID,
    scope: 'profile'
  });
  
  console.log("Google Auth2 initialized.");
  
  if (whenAuthLoadsCallback !== null) {
    whenAuthLoadsCallback();
  }
  
  // Sign in the user if they are currently signed in.
  if (auth2.isSignedIn.get() === true) {
    auth2.signIn();
  }
  
};