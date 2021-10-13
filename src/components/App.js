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
        const userinfoObj = {
          creatorId: user.uid,
          name: user.email
        };
      //console.log(newUserInfo.name, "this is user id");
      try {
          const docRef = await addDoc(collection(dbService, "UserInfo"),userinfoObj);
          console.log("Document written with ID: ", docRef.id);
          } catch (error) {
          console.error("Error adding document: ", error);
          }
          setUserInfo(userinfoObj);
          console.log(user,"hello");

        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        
        
        } else {
          setUserObj(null);
          setUserInfo(null);
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