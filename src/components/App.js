import React, { useEffect, useState } from "react";
import AppRouther from "components/Router";
import {authService} from "fbase";



function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      console.log(user)});
  }, [])
  //console.log(authService.currentUser);
  return (
    <>
    {init ? <AppRouther isLoggedIn={isLoggedIn}/> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Famco</footer>
    </>
  );
}

export default App;
