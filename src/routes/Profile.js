/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc,addDoc } from "firebase/firestore";
import { authService } from "fbase";
import { useHistory } from "react-router";
import { collection, getDocs, query, where} from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { safeGet } from "@firebase/util";


export default ({refreshUser,userObj,userInfo}) => {
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
        event.preventDefault();
        if(newDisplayName.length > 2){
        
        
    let duplication = false;
        //if (){}
        //console.log(userObj.uid);
        const q = query(
            collection(dbService, "UserInfo"),
            where("creatorId", "==", userObj.uid)
            );
            const querySnapshot = await getDocs(q);
            // if(doc.id){
            // console.log(querySnapshot, "lengthhhhhhhhh");
            // } 
        querySnapshot.forEach((doc) => {
        console.log(doc.data());
        duplication = true;
    });
        console.log(duplication);
        if(duplication === true){
        console.log("문서 id를 자동으로 찾아서 updateDoc 으로 수정");
        }else{
            console.log("addDoc 으로 새로 추가");
        }

        
    

        if (userObj.displayName !== newDisplayName)  {
                //update if there is doc id == current userid   
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
            <form onSubmit={onSubmit}>
            
                <>
                <input 
                onChange={onChange} 
                type="text" 
                placeholder="Write your user name" 
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