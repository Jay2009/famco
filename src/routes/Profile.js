/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import { authService } from "fbase";
import { useHistory } from "react-router";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";


export default ({userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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
        setNewDisplayName(value);
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, { displayName: newDisplayName });
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                onChange={onChange} 
                type="text" 
                placeholder="Display name" 
                value={newDisplayName}
                />
                <input type="submit" value="Update" />
            </form>    
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};