import { dbService } from "fbase";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import heartIcon1 from "../assets/heart1.png";
import heartIcon2 from "../assets/heart2.png";
import heartIcon3 from "../assets/heart3.png";
import heartIcon4 from "../assets/heart4.png";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy, where } from "@firebase/firestore";
import { text } from "@fortawesome/fontawesome-svg-core";

const Famco = ({FamcoMsgObj, isOwner, userObj}) => {
    const [editing, setEditing] = useState(false);
    const [NewFamcoMsg, setNewFamcoMsg] = useState(FamcoMsgObj.text);
    const famcoTextRef = doc(dbService, "NewFamcoMsg", `${FamcoMsgObj.id}`) ;
    const [isLiked, setIsLiked] = useState(false);
    const [likeDb, setLikeDb] = useState(0);
    const [likedId, setLikedId] = useState(""); 




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
    
    const checkUserLiked = async() =>{
        
        const q = query(
            collection(dbService, "NewFamcoMsg"),
            where("likedName", "==", userObj.displayName)
            );
            
            const getDocument = await getDocs(q);
            getDocument.forEach(() => {
                
                
            });
            
            
}

    useEffect (() => {
        //checkUserLiked();
        //console.log(isLiked," initial IS LIKED");
        //console.log(isLiked," IS LIKED");
        if(isLiked === true){
           //이곳에  useState 가 아닌 다른거 넣어야될듯....................... 왜냐면 스테이트 한번에 업로드되어지니...@@@@@@@@@@@@@@
            //setLikeDb(likeDb+1);
            console.log(likeDb,"this is true likedb yo");
            updateDoc(famcoTextRef, {
                likes:  FamcoMsgObj.likes+1,
                likedName: userObj.displayName,
            });
        }
        
        if(isLiked === false){
                //setLikeDb(likeDb-1);
            if(FamcoMsgObj.likes > 0){
                console.log(likeDb,"this is false likedb yo@@@@@@@");
                updateDoc(famcoTextRef, {
                    likes: FamcoMsgObj.likes-1,
                    likedName:"" ,
                });
            }
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
            
            }, [isLiked]);

    const toggleLike = async () => setIsLiked((prev) => !prev);
    //console.log(isLiked," IS LIKED");

    const aa = async () => {
    
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
                        <img 
                            
                            src={isLiked?(heartIcon2):(heartIcon1)}
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