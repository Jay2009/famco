/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc,addDoc } from "firebase/firestore";
import { authService } from "fbase";
import { useHistory } from "react-router";
import { collection, getDocs, query, where,onSnapshot,orderBy} from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { safeGet } from "@firebase/util";
import { connectStorageEmulator } from "@firebase/storage";


export default ({refreshUser,userObj,userInfo,FamcoMsgObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [NewUserInfo, setNewUserInfo] = useState([]);
    let duplication = false;

    
    
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

    ///////// 이곳 if 문에 auth 에서 구글로 접속 하였을때를 조건으로 만들어야함 ..........
    if (newDisplayName.length <= 2){
    const addNewGoogleUserInfoObj = {
        creatorId: userObj.uid ,
        name: newDisplayName
    }
    const a = async() => {
    try {
        const docRef = await addDoc(collection(dbService, "UserInfo"),addNewGoogleUserInfoObj);
        console.log("Document written with ID: ", docRef.id);
        } catch (error) {
        console.error("Error adding document: ", error);
        }
    }
    }


    useEffect (() => {
        
        const q = query(
            collection(dbService, "UserInfo")
            //orderBy("createdAt", "desc")
            );
            onSnapshot(q, (snapshot) => {
            const userInfoArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setNewUserInfo(userInfoArr);
            });
            }, []);
            console.log(NewUserInfo.id,"document iddddddddddd");
    
    
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
                const q = query(
                            collection(dbService, "UserInfo"),
                            where("creatorId", "==", userObj.uid)
                            );
                            const getDocument = await getDocs(q);
                            getDocument.forEach(async(document) => {
                                console.log(document.id, "이건 만약 데이터 베이스중에 유저의 creatorId가 같은게 이미 존재하면 나오는것이야..");
                                duplication = true;
                            });
            const user =  authService.currentUser;      
                if (userObj.displayName !== newDisplayName)  {
                    
                        
                    const addNewUserInfoObj = {
                                creatorId: userObj.uid ,
                                name: newDisplayName
                            }

                    if(duplication === false){
                        
                        console.log("addDoc 으로 새로 추가");
                                try {
                                    const docRef = await addDoc(collection(dbService, "UserInfo"),addNewUserInfoObj);
                                    console.log("Document written with ID: ", docRef.id);
                                    } catch (error) {
                                    console.error("Error adding document: ", error);
                                    }
                                    //setUserInfo(userinfoObj);
                                    //duplication = true;
                    }else{
                        
                            const querySnapshot = await getDocs(q);
                            querySnapshot.forEach(async(document) => {
                                console.log(document.id, "doc 문서 id를 자동으로 찾아서 updateDoc 으로 수정");
                                await updateDoc(doc(dbService, "UserInfo", `${document.id}`), {
                                name: newDisplayName,
                                });
                            });
                        
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