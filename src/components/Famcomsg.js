import { dbService } from "fbase";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="famcoMsg">
            {editing ? ( 
                <>
                <form onSubmit={onSubmit} className="container famcoMsgEdit"> 
                    <textarea 
                    type="text" 
                    placeholder="Edit your Famco message" 
                    value={NewFamcoMsg} 
                    required
                    autoFocus 
                    onChange={onChange}
                    className="famcoMsgInput"
                    maxLength="120"
                    />
                    <input type="submit" value="Update"  className="formBtn"/>
                    
                </form>
                <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                </span>
                </>
                ) : ( 
                <>  
                    <h5 className="FamcoMsgCreatedDate">{FamcoMsgObj.uploadedDate}</h5>
                    <h4 className="famcoMsgText">
                    {FamcoMsgObj.attachmentUrl && <img src={FamcoMsgObj.attachmentUrl} className="famcoAttachedImg"/>}
                        {FamcoMsgObj.text}
                    </h4>
                    
                    {isOwner ? 
                        (<h5 className="famcoOwner"><br/>{userObj.displayName}</h5>
                            ) : (
                            <h5 className="famcoOtherOwners"><br/>{FamcoMsgObj.name}</h5>)
                    }
                    {isOwner && (
                        <div className="famcoMsg__actions"> 
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                        )}
                </>
            )}
        </div>
    );
};


export default Famco;