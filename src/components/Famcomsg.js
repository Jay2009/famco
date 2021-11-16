import { dbService } from "fbase";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import heartIcon1 from "../assets/heart1.png";
import heartIcon2 from "../assets/heart2.png";





const Famco = ({FamcoMsgObj, isOwner, userObj}) => {
    const [editing, setEditing] = useState(false);
    const [NewFamcoMsg, setNewFamcoMsg] = useState(FamcoMsgObj.text);
    const famcoTextRef = doc(dbService, "NewFamcoMsg", `${FamcoMsgObj.id}`) ;
    const [isAdmin, setIsAdmin] = useState(false);
    
    
    const [isLiked, setIsLiked] = useState(false);
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    

    let didIlike = FamcoMsgObj.likedName.indexOf(userObj.uid);
    


    const onDeleteClick = async () => {
        const ok= window.confirm("Are you sure you want to delete the famco message?");
        
        if(ok){
            await deleteDoc(famcoTextRef);
            if(FamcoMsgObj.attachmentUrl) {
            await deleteObject(ref(storageService, FamcoMsgObj.attachmentUrl));
            }
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

    
    

    useEffect (() => {

        if(FamcoMsgObj.name === "ADMIN"){
            setIsAdmin(true);
            
        }else{
            setIsLiked(false);
        }

        if(alreadyLiked){
        
            if(didIlike <= 0){
                
                    updateDoc(famcoTextRef, {
                        likes:  FamcoMsgObj.likes+1,
                        likedName: FamcoMsgObj.likedName +","+userObj.uid,
                    });
                    
                    
                    
            }

            if(didIlike !== -1){
                
                    if(FamcoMsgObj.likes > 0){
                        updateDoc(famcoTextRef, {
                            likes: FamcoMsgObj.likes-1,
                            likedName: FamcoMsgObj.likedName.replace((","+userObj.uid),""),
                        });
                        
                    }
                
            }
        }
    },[isLiked]);
        
    const toggleLike = () => {
        setAlreadyLiked(true);
        setIsLiked((prev) => !prev);
    }
    
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
                    <input type="submit" value="Update"  className="formBtn" />
                    
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
                        
                    </h4>
                    {FamcoMsgObj.text}
                    <br/>
                    <br/>
                    <div className="FamcoMsgLikes">
                        <img src={didIlike !== -1 ?heartIcon2:heartIcon1} 
                            onClick={toggleLike}
                        /> 
                        <span>{FamcoMsgObj.likes}</span>
                    </div>    
                    
                    {isOwner ?(
                        <h5 className="famcoOwner"> {userObj.displayName}</h5>
                        ) : (
                        <h5 className="famcoOtherOwners"> {FamcoMsgObj.name}</h5>       
                        )
                    }
                    {isAdmin? <FontAwesomeIcon icon={faBullhorn}  className="megaphone" /> : <> </> }
                    {isOwner && (
                        <div className="famcoMsg__actions"> 
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            
                        </div>
                        )}
                </>
            )}
        </div>
    );
};


export default Famco;