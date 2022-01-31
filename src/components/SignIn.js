import React from "react";
import firebase from "firebase/compat/app";

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };
  return (
    <div className="google-btn" onClick={signInWithGoogle}>
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p className="btn-text">
        <b>Sign in with google</b>
      </p>
    </div>
  );
};

export default SignIn;
