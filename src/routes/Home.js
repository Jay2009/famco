import Famco from "components/Famcomsg";
import { dbService } from "fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {

    const [NewFamcoMsg, setNewFamcoMsg] = useState("");
    const [NewFamcoMsges, setNewFamcoMsges] = useState([]);
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
        try {
            const docRef = await addDoc(collection(dbService, "NewFamcoMsg"), {
                text: NewFamcoMsg,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
            console.log("Document written with ID: ", docRef.id);
            } catch (error) {
            console.error("Error adding document: ", error);
            }
            
            setNewFamcoMsg("");
    };
    const onChange = ({ target: { value } }) => {
        setNewFamcoMsg(value);
        };

        
    return (
        
    <div>
        <form onSubmit ={onSubmit}>
            <input 
            value={NewFamcoMsg} 
            onChange= {onChange} 
            type="text" 
            placeholder="What's in your mind?" 
            maxLength={120} 
            />
            <input 
            type="submit" 
            value="Post" 
            />
        </form>
        <div>
            
            {NewFamcoMsges.map((NewFamcoMsg) => (
                <Famco 
                key={NewFamcoMsg.id} 
                NewFamcoMsg={NewFamcoMsg} 
                isOwner={NewFamcoMsg.creatorId === userObj.uid}
                />
            ))}
        </div>
    </div>
    );
};
export default Home;