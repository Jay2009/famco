/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { doc, updateDoc,addDoc } from "firebase/firestore";
import { authService } from "fbase";
import { useHistory } from "react-router";
import { collection, getDocs, query, where,onSnapshot, orderBy} from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";



export default ({refreshUser,userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [NewUserInfo, setNewUserInfo] = useState([]);
    let duplication = false;
    let firstLoginWithGoogle = false;
    let isNicknameExist = false;

    const getUpdatedUsersInfo = async() => {
    const DbUpdatedUsersInfo = query(collection(dbService,"UserInfo"));
    const querySnapshot = await getDocs(DbUpdatedUsersInfo);
    
    querySnapshot.forEach((doc) => {
        const updateUsersInfo = {
            ...doc.data(),
            id: doc.id,
        }
        setNewUserInfo((prev) => [updateUsersInfo, ...prev]);
        });
    };

    const searchingSameIdQuery = async() =>{
        const q = query(
            collection(dbService, "UserInfo"),
            where("creatorId", "==", userObj.uid)
            );
            const getDocument = await getDocs(q);
            getDocument.forEach((document) => {
                firstLoginWithGoogle = true;
                duplication = true;
            });
    }

    const duplicationForNickname = async() =>{
        const q = query(
            collection(dbService, "UserInfo"),
            where("name", "==", newDisplayName)
            );
            const getDocument = await getDocs(q);
            getDocument.forEach((document) => {
                isNicknameExist = true;
            });
    }
    
    ///////// 이곳 if 문에 auth 에서 @@@구글@@@@@ 로 접속 하였을때를 조건으로 만들어야함 ..........
    const googleUserinfoUpdate = async() => {
        const googleProvider = authService.currentUser.providerData[0].providerId;
        if (googleProvider === "google.com" ){
            await searchingSameIdQuery();
            
            if (firstLoginWithGoogle === false){
                
                await duplicationForNickname();
                if (isNicknameExist === false){
                    const addNewGoogleUserInfoObj = {
                    createdAt: Date.now(),
                    creatorId: userObj.uid ,
                    name: newDisplayName,
                    whatPostLiked : ""
                    }
                    try {
                        const docRef = await addDoc(collection(dbService, "UserInfo"),addNewGoogleUserInfoObj);
                    } catch (error) {
                }
            }else{ alert(" nickname is already in use.");
            setNewDisplayName("");
        }
        }
        }
    }
    

    useEffect (() => {
    const q = query(
        collection(dbService, "UserInfo"),
        orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
        const userInfoArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
            
        }));
        setNewUserInfo(userInfoArr);
        
        });

            googleUserinfoUpdate();
            }, []);
            
    

    const onLogOutClick = () =>{
        authService.signOut();
        history.push("/");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value.trim().replace(/[^A-Za-z]/ig, ''));
        
    };
    
    const onSubmit = async(event) => {
        event.preventDefault();
        if(newDisplayName.length > 2){
            
                //if (userObj.displayName !== newDisplayName)  {
                    await searchingSameIdQuery();
                        
                    const addNewUserInfoObj = {
                                creatorId: userObj.uid ,
                                name: newDisplayName,
                                createdAt: Date.now(),
                                whatPostLiked : ""
                            }
                            
                    if(duplication === false){
                        await duplicationForNickname();
                        if(isNicknameExist === false){
                                try { 
                                    await addDoc(collection(dbService, "UserInfo"),addNewUserInfoObj);
                                    } catch (error) {
                                    }
                                    await updateProfile(await authService.currentUser, {
                                        displayName: newDisplayName,
                                    });
                                    alert("Update success !");
                        }else{
                            alert("Nick name is already in use");
                            setNewDisplayName("");
                        }
                    }else{
                        await duplicationForNickname();
                        if(isNicknameExist === false){
                        const q = query(
                            collection(dbService, "UserInfo"),
                            where("creatorId", "==", userObj.uid)
                            );
                            const querySnapshot = await getDocs(q);
                            querySnapshot.forEach(async(document) => {
                                await updateDoc(doc(dbService, "UserInfo", `${document.id}`), {
                                name: newDisplayName,
                                });
                            });
                            await updateProfile(await authService.currentUser, {
                                displayName: newDisplayName,
                            });
                            alert("Update success !");
                        }else {
                            alert("the user nickname already in use");
                            setNewDisplayName("");
                        }
                        }
                    
                    //}
        refreshUser(newDisplayName);
        } else{
            alert("Name should be more than 2 chracters");
        }

    };

    return (
        <div className="container">

                <span className= "onlyEnglish">
                    Please, write your name only in English
                </span>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Write your user name"
                    value={newDisplayName}
                    maxLength="12"
                    required
                    autoFocus
                    className="profileFormInput"
                    
                    
                />
                <span onClick={onSubmit} className="profileFormBtn nameUpdateBtn" >
                    Update 
                    
                </span>
                
                <span className="profileFormBtn cancelBtn logOut" onClick={onLogOutClick}>
                    Log Out
                </span>
                <span className="formSpace"> </span>
                
                
        </div>
    );
};