import { dbService } from "fbase";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Famco = ({FamcoMsgObj, isOwner, userObj}) => {
    const [editing, setEditing] = useState(false);
    const [NewFamcoMsg, setNewFamcoMsg] = useState(FamcoMsgObj.text);
    const famcoTextRef = doc(dbService, "NewFamcoMsg", `${FamcoMsgObj.id}`) ;
    
    const onDeleteClick = async () => {
        const ok= window.confirm("Are you sure you want to delete the famco message?");
        
        if(ok){
            await deleteDoc(famcoTextRef);
            await deleteObject(ref(storageService, FamcoMsgObj.attachmentUrl));
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(famcoTextRef, {
            text: NewFamcoMsg,
        });
        setEditing(false);
        
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewFamcoMsg(value);
        
        
    };
    
    return(
        <div>
            {editing ? ( 
                <>
                <form onSubmit={onSubmit}> 
                    <input 
                    type="text" 
                    placeholder="Edit your Famco message" 
                    value={NewFamcoMsg} 
                    required 
                    onChange={onChange}
                    />
                    <input type="submit" value="Update Famco" />
                    
                </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>
                ) : ( 
                <>
                <h4>{FamcoMsgObj.text}</h4>
                {FamcoMsgObj.attachmentUrl && (
                    <img src={FamcoMsgObj.attachmentUrl} width="50px"/>
                )} 
                {isOwner ? 
                    (<h5>{userObj.displayName}</h5>
                        ) : (
                        <h5>{FamcoMsgObj.name}</h5>)
                }
                {isOwner && ( 
                    <>
                    <button onClick={onDeleteClick}> Delete Famco</button>
                    <button onClick={toggleEditing}> Edit Famco</button>
                    </>
                )}
            </>
                )}
        </div>
    );
};


export default Famco;