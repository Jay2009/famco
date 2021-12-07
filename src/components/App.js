import React, { useEffect, useState} from "react";
import AppRouther from "components/Router";
import {authService} from "fbase";
import { ModalProvider } from "components/contexts/modalContext";



function App() {
  const [init, setInit] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(async(user) => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          vip:"",
          updateProfile: (args) => user.updateProfile(args),
        });
        } else {
          setUserObj(null);
        }
      setInit(true);
    });

  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
      setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      vip:"",
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  

  return (
    <>
    <ModalProvider>
    {init ? <AppRouther
      refreshUser={refreshUser} 
      isLoggedIn={Boolean(userObj)} 
      userObj={userObj}/> : "Initializing..."}
      <span class="notranslate">
      <footer className="footer">&copy; {new Date().getFullYear()} Famco</footer>
      </span>
      </ModalProvider>
    </>
  );
}

export default App;