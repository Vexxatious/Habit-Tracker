import React from "react";

const SignOut = ({ auth }) => {
  return (
    <div className="flex">
      <button onClick={() => auth.signOut()} className="logout-button">
        Log Out
      </button>
    </div>
  );
};

export default SignOut;
