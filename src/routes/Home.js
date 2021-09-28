import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";

const Home = () => {
    const [NewFamcoMsg, setNewFamcoMsg] = useState("");
    const onSubmit = async(event) => {       
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService, "NewFamcoMsg"), {
                NewFamcoMsg,
                msgtime: Date.now(),
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
    </div>
    );
}
export default Home;