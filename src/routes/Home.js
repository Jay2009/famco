import Famco from "components/Famcomsg";
import {v4 as uuidv4} from "uuid";
import { dbService, storageService } from "fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy, doc } from "@firebase/firestore";
import {ref, uploadString, getDownloadURL} from "@firebase/storage";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
    console.log(addDoc,"documenttttttttttt");
    const [NewFamcoMsg, setNewFamcoMsg] = useState("");
    const [NewFamcoMsges, setNewFamcoMsges] = useState([]);
    const [attachment, setAttachment] = useState("");
    const getNewFamcoMsges = async() => {
    const DbNewFamcoMsges = query(collection(dbService,"NewFamcoMsg"));
    const querySnapshot = await getDocs(DbNewFamcoMsges);
    querySnapshot.forEach((doc) => {
        const newFamcoMsgObj = {
            ...doc.data(),
            id: doc.id,
                
        }
        
        setNewFamcoMsges((prev) => [newFamcoMsgObj, ...prev]);
    });
    
};

    useEffect (() => {
        
        const q = query(
            collection(dbService, "NewFamcoMsg"),
            orderBy("createdAt", "desc")
            );
            onSnapshot(q, (snapshot) => {
            const famcoArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setNewFamcoMsges(famcoArr);
            });
            }, []);

    const onSubmit = async(event) => {       
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
        const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const uploadFile = await uploadString(attachmentRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(uploadFile.ref);
        }
        const newfamcoPosting = {
            text: NewFamcoMsg,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            name:userObj.displayName,
            attachmentUrl
        };
        try {
            const docRef = await addDoc(collection(dbService, "NewFamcoMsg"), newfamcoPosting);
            console.log("Document written with ID: ", docRef.id);
            } catch (error) {
            console.error("Error adding document: ", error);
            }
            
            setNewFamcoMsg("");
            setAttachment("");
    };
    const onChange = ({ target: { value } }) => {
        setNewFamcoMsg(value);
        };
    
    const onFileChange = (event) => {
        
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const {
                currentTarget: {result},
                } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment(null);
    return (
        
    <div>
        
        <form onSubmit ={onSubmit}>
            {userObj.displayName ? (
                <>
            <input 
            value={NewFamcoMsg} 
            onChange= {onChange} 
            type="text" 
            placeholder="What's in your mind?" 
            maxLength={120} 
            required
            />
            <input
            type="file" 
            accept="image/*"
            onChange={onFileChange}
            />
            <input 
            type="submit" 
            value="Post" 
            />
            </>
            ):(
                <>Please change your name on the profile to start</>
            )}
            {attachment && (
            <div>
                <img 
                src= {attachment} 
                width="50px" 
                height="50px" 
                />
                <button onClick={onClearAttachment}>Clear</button>
            </div>
            )}
        </form>
        <div>         
            {NewFamcoMsges.map((NewFamcoMsg) => (
                <Famco 

                key={NewFamcoMsg.id} 
                FamcoMsgObj={NewFamcoMsg} 
                isOwner={NewFamcoMsg.creatorId === userObj.uid}
                userObj={userObj}
                />
            ))}
        </div>
    </div>
    );
};
export default Home;