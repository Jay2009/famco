import React, { useEffect, useState } from "react";
import AppRouther from "components/Router";
import {authService} from "fbase";



function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      console.log(user)});
  }, [])
  //console.log(authService.currentUser);
  return (
    <>
    {init ? <AppRouther isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Famco</footer>
    </>
  );
}

export default App;
