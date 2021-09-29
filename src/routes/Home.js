import { dbService } from "fbase";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [NewFamcoMsg, setNewFamcoMsg] = useState("");
    const [NewFamcoMsges, setNewFamcoMsges] = useState([]);
    const getNewFamcoMsges = async() => {
        const DbNewFamcoMsges = query(collection(dbService,"NewFamcoMsges"));
        const querySnapshot = await getDocs(DbNewFamcoMsges);
        querySnapshot.forEach((doc) => {
            const newFamcoMsgObj = {
                ...doc.date(),
                id: doc.id,
            }
            setNewFamcoMsges(prev => [newFamcoMsgObj, ...prev]);
        });
    };
    useEffect (() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
            );
            onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setNewFamcoMsges(nweetArr);
            });
            }, []);
    const onSubmit = async(event) => {       
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "NewFamcoMsg"), {
                NewFamcoMsg,
                createdAt: Date.now(),
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
                <div key={NewFamcoMsg.id}>
                    <h4>{NewFamcoMsg.NewFamcoMsg}</h4>
                </div>
            ))}
        </div>
    </div>
    );
};
export default Home;