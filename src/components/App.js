import React, { useEffect, useState } from "react";
import AppRouther from "components/Router";
import {authService} from "fbase";
import { updateProfile } from "@firebase/auth";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy, doc } from "@firebase/firestore";
import { dbService } from "fbase";



function App() {
  const [init, setInit] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(async(user) => {
      if(user) {
        // setIsLoggedIn(true);
        

        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
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
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  
  //console.log(authService.currentUser);
  return (
    <>
    {init ? <AppRouther
      userInfo={userInfo}
      refreshUser={refreshUser} 
      isLoggedIn={Boolean(userObj)} 
      userObj={userObj}/> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Famco</footer>
    </>
  );
}

export default App;