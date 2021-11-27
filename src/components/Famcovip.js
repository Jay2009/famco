import { dbService } from "fbase";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fbase";
import { doc, deleteDoc, updateDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core'
import {faCommentDots as emptyComments } from '@fortawesome/free-regular-svg-icons'
import heartIcon1 from "../assets/heart1.png";
import heartIcon2 from "../assets/heart2.png";
import cuteCrown from "../assets/cuteCrown.png";
import CommentsVip from "components/CommentsVip";



const FamcoVip = ({FamcoVipObj, isOwner, userObj}) => {
    const [editing, setEditing] = useState(false);
    const [NewFamcoMsg, setNewFamcoMsg] = useState(FamcoVipObj.text);
    const famcoTextRef = doc(dbService, "NewFamcoVip", `${FamcoVipObj.id}`) ;
    const [isLiked, setIsLiked] = useState(false);
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [openComment, SetOpenComment] = useState(false);
    const [numberOfComments, setNumberOfComments] = useState(0);

    let didIlike = FamcoVipObj.likedName.indexOf(userObj.uid);
    


    const onDeleteClick = async () => {
        const ok= window.confirm("Are you sure you want to delete the famco message?");
        
        if(ok){
            await deleteDoc(famcoTextRef);
            if(FamcoVipObj.attachmentUrl) {
            await deleteObject(ref(storageService, FamcoVipObj.attachmentUrl));
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
        const snapshotCommander =  onSnapshot(collection(dbService, "NewFamcoVip"), 
            (snapshot) => {
                const unsub = onSnapshot(doc(dbService, "NewFamcoVip", FamcoVipObj.id), (doc) => {
                    if(doc.data()){
                        setNumberOfComments(doc.data().commentsNumber);
                    }
                });
            },
            (error) => {
                console.log("성공!");
                });
    },[]);
    
    

    useEffect (() => {

        if(alreadyLiked){
        
            if(didIlike <= 0){
                    updateDoc(famcoTextRef, {
                        likes:  FamcoVipObj.likes+1,
                        likedName: FamcoVipObj.likedName +","+userObj.uid,
                    });
                    
                    
                    
            }

            if(didIlike !== -1){
                    if(FamcoVipObj.likes > 0){
                        updateDoc(famcoTextRef, {
                            likes: FamcoVipObj.likes-1,
                            likedName: FamcoVipObj.likedName.replace((","+userObj.uid),""),
                        });
                        
                    }
                
            }
        }
    },[isLiked]);
        
    const toggleLike = () => {
        setAlreadyLiked(true);
        setIsLiked((prev) => !prev);
    }
    
    const toggleComment = () => SetOpenComment((prev) => !prev);
    return(
        <div className="famcoMsg " >
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
                        <img src= {cuteCrown} className="vipTag" />
                        
                        <h5 className="FamcoMsgCreatedDate">{FamcoVipObj.uploadedDate}</h5>
                    

                    <h4 className="famcoMsgText">
                        
                    {FamcoVipObj.attachmentUrl && <img src={FamcoVipObj.attachmentUrl} className="famcoAttachedImg"/>}
                        
                    </h4>
                    <span class= "notranslate" >{FamcoVipObj.text}</span>
                    
                    
                    <br/>
                    
                    

                    
                    {isOwner ? 
                        (   <span class= "notranslate">
                                <h5 className="famcoOwner"> {userObj.displayName}</h5>
                            </span>
                        ) : (
                            <span class= "notranslate">
                                <h5 className="famcoOtherOwners"> {FamcoVipObj.name}</h5>
                            </span>
                            )
                    }
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
                        
                    {userObj.displayName == "ADMIN" && (
                            <span className="famcoMsg__actions superDelete" onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>  
                    )}

                    <div className="FamcoMsgLikes">
                        <img src={didIlike !== -1 ?heartIcon2:heartIcon1} 
                            onClick={toggleLike}
                        /> 
                        <span class= "notranslate">{FamcoVipObj.likes}</span>
                    </div>
                    {openComment ?(
                            <> 
                            <FontAwesomeIcon onClick={toggleComment} icon={faCommentDots }  className="FamcoComments"/>
                            <span class= "notranslate" className="numberOfComments">
                                {numberOfComments}
                            </span>

                            <div style={{ marginTop: 30 }}>     
                                
                                    <CommentsVip 
                                    key={NewFamcoMsg.id} 
                                    famcoMsgId= {FamcoVipObj.id}
                                    userObj={userObj}
                                    FamcoVipObj={FamcoVipObj}
                                    />
                            </div>
                        </>
                            ) : (
                            <>
                                <FontAwesomeIcon onClick={toggleComment} icon={emptyComments} className="FamcoComments" />
                                
                                <span class= "notranslate" className="numberOfComments">
                                {numberOfComments}
                                </span> 
                            </>
                            )
                        }

                </>
            )}
        </div>
        
    );
};


export default FamcoVip;