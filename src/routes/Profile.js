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
                console.log(document.id, " 이건 만약 데이터 베이스중에 유저의 creatorId가 같은게 이미 존재하면 나오는것이야..");
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
                console.log(document.id, " 구글용 for Nickname) 이건 만약 데이터 베이스중에 유저의 nickname이 같은게 이미 존재하면 나오는것이야..");
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
                        console.log(" 구글 접속이 처음이시군요? 유저 정보를 data base에 자동 등록합니다.");
                        const docRef = await addDoc(collection(dbService, "UserInfo"),addNewGoogleUserInfoObj);
                        console.log("Document written with ID: ", docRef.id);
                    } catch (error) {
                    console.error("Error adding document: ", error);
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
        console.log(NewUserInfo);
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
                        console.log("addDoc 으로 새로 추가");
                                try { 
                                    const docRef = await addDoc(collection(dbService, "UserInfo"),addNewUserInfoObj);
                                    console.log("Document written with ID: ", docRef.id);
                                    } catch (error) {
                                    console.error("Error adding document: ", error);
                                    }
                                    await updateProfile(await authService.currentUser, {
                                        displayName: newDisplayName,
                                    });
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
                                console.log(document.id, "doc 문서 id를 자동으로 찾아서 updateDoc 으로 수정");
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
        <div className="container__profile">
            <form onSubmit={onSubmit} className= "profileForm">
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Write your user name"
                    value={newDisplayName}
                    maxLength="12"
                    required
                    autoFocus
                    className="formInput"
                />
                <input 
                    type="submit" 
                    value="Update name" 
                    className="formBtn"
                />
                </form>
                <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                    Log Out
                </span>
                <span className="formSpace"> </span>
                
                
        </div>
    );
};