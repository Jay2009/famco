import { dbService } from "fbase";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState,useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import heartIcon1 from "../assets/heart1.png";
import heartIcon2 from "../assets/heart2.png";
import heartIcon3 from "../assets/heart3.png";
import heartIcon4 from "../assets/heart4.png";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy, where } from "@firebase/firestore";
import { text } from "@fortawesome/fontawesome-svg-core";


const Famco = ({FamcoMsgObj, isOwner, userObj,heart}) => {
    const [editing, setEditing] = useState(false);
    const [NewFamcoMsg, setNewFamcoMsg] = useState(FamcoMsgObj.text);
    const famcoTextRef = doc(dbService, "NewFamcoMsg", `${FamcoMsgObj.id}`) ;
    const [isLiked, setIsLiked] = useState(false);
    const [whoLiked, setWhoLiked] = useState(false);
    const [likedId, setLikedId] = useState(""); 
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [didIliked,setDidIliked] = useState(false);
    



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
    useEffect(() => {
            if(isLiked === true){
                setIsLiked(true);
                console.log(isLiked,"after  isliked state  didmount");
            }
            if(isLiked === false){
                setIsLiked(false);
                console.log(isLiked,"after this is isliked state  didmount");
            };
    },[])
    
    

    useEffect (() => {
        //if(whoLiked == true)
        if(alreadyLiked){
            
            console.log(alreadyLiked," after this is set already liked");
            if(isLiked === true){
                updateDoc(famcoTextRef, {
                    likes:  FamcoMsgObj.likes+1,
                    likedName: userObj.displayName,
                    didIliked: true
                });
            }
    
            if(isLiked === false){
                if(FamcoMsgObj.likes > 0){
                    updateDoc(famcoTextRef, {
                        likes: FamcoMsgObj.likes-1,
                        likedName: "",
                        didIliked: false
                    });
                }
            };
    }
        // const q = query(
        //     collection(dbService, "NewFamcoMsg"),
        //     where("likedName", "==", userObj.displayName)
        //     );
        //     onSnapshot(q, (snapshot) => {
        //     const likeArr = snapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     ...doc.data(),
        //     }));
        //     setLikedId(likeArr);
        //     });
            },[isLiked]);
        
    
        
    const toggleLike = () => {
        setAlreadyLiked(true);
        console.log(alreadyLiked,"this is set alreadyliked");
        setIsLiked((prev) => !prev);
    }
    //console.log(isLiked," IS LIKED");

    const Aa = () => {
        
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
                    <br/>
                    <br/>
                    <div className="FamcoMsgLikes">
                        <img src={FamcoMsgObj.didIliked?heartIcon2:heartIcon1}
                            didIliked={didIliked} 
                            like={isLiked}
                            onClick={toggleLike}
                        /> 
                        <span>{FamcoMsgObj.likes}</span>
                    </div>    
                    
                    {isOwner ? 
                        (<h5 className="famcoOwner"> {userObj.displayName}</h5>
                            ) : (
                            <h5 className="famcoOtherOwners"> {FamcoMsgObj.name}</h5>)
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