/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc,addDoc } from "firebase/firestore";
import { authService } from "fbase";
import { useHistory } from "react-router";
import { collection, getDocs, query, where} from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { safeGet } from "@firebase/util";


export default ({refreshUser,userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
   // const UserInfo = doc(dbService, "UserInfo", `${UserInfoObj.id}`);
    const onLogOutClick = () =>{
        authService.signOut();
        history.push("/");
    };
    /*const getMyFamcoMsges = async() => {
        const q = query(
            collection(dbService, "NewFamcoMsg"),
            where("creatorId", "==", userObj.uid)
            );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
};
    useEffect(() => {
        getMyFamcoMsges();
    }, []); */
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value.trim());
    };

    const onSubmit = async(event) => {
        if(newDisplayName.length > 2){
        event.preventDefault();
        
        if (userObj.displayName !== newDisplayName)  {
            const newUserInfo = {
                name:userObj.displayName,
                creatorId:userObj.uid
            };
            try {
                const docRef = await addDoc(collection(dbService, "UserInfo"),newUserInfo);
                console.log("Document written with ID: ", docRef.id);
                } catch (error) {
                console.error("Error adding document: ", error);
                }
            await updateProfile(await authService.currentUser, {
                displayName: newDisplayName,
                
        });
    }
        
        refreshUser(newDisplayName);
        
    } else{
        alert("Name should be more than 2 chracters");
    }
        
    };
    
    return (
        
        <>
            <form onSubmit={onSubmit} >
            
                <>
                <input 
                onChange={onChange} 
                type="text" 
                placeholder="What is your name?" 
                value={newDisplayName}
                required
                />
                
                    <input type="submit" value="Update name" />
                    </>
                
                
            </form>   
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};