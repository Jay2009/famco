import { dbService } from "fbase";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fbase";
import { doc, deleteDoc, updateDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useState,useEffect,useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faBullhorn, faCommentDots, } from "@fortawesome/free-solid-svg-icons";
import {faCommentDots as emptyComments } from '@fortawesome/free-regular-svg-icons'
import heartIcon1 from "../assets/heart1.png";
import heartIcon2 from "../assets/heart2.png";
import Comments from "routes/Comments";
import { ModalContext } from "components/contexts/modalContext";

const Famco = ({FamcoMsgObj, isOwner, userObj, isUserInfoExist}) => {
    const [editing, setEditing] = useState(false);
    const [NewFamcoMsg, setNewFamcoMsg] = useState(FamcoMsgObj.text);
    const famcoTextRef = doc(dbService, "NewFamcoMsg", `${FamcoMsgObj.id}`) ;
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [openComment, SetOpenComment] = useState(false);
    const [numberOfComments, setNumberOfComments] = useState(0);
    const { handleModal } = useContext(ModalContext);
    
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
        const snapshotCommander =  onSnapshot(collection(dbService, "NewFamcoMsg"), 
            (snapshot) => {
                const unsub = onSnapshot(doc(dbService, "NewFamcoMsg", FamcoMsgObj.id), (doc) => {
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
        

        const locale = navigator.language;
       // console.log(locale," what language is it now?");
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

    const toggleComment = () => SetOpenComment((prev) => !prev);

   
    
    return(
        <div class= "notranslate" className="famcoMsg">
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
                    
                    <h4  className="famcoMsgText">
                        
                    {FamcoMsgObj.attachmentUrl && <img src={FamcoMsgObj.attachmentUrl} className="famcoAttachedImg" 
                    onClick={() => handleModal(<img src= {FamcoMsgObj.attachmentUrl} onClick={() => handleModal()} className="modalImg" />)}/>
                    
                    }
                    
                    </h4>
                    <span class= "notranslate" className="famcoText">{FamcoMsgObj.text}</span>
                    <br/>
                    
                

                    {isOwner ?(
                            <span class= "notranslate">
                                <h5 className="famcoOwner"> {userObj.displayName}</h5>
                            </span>
                        ) : (
                            <span class= "notranslate">
                                <h5 className="famcoOtherOwners"> {FamcoMsgObj.name}</h5>  
                            </span>     
                        )
                    }
                    {userObj.displayName === "ADMIN" && (
                            <span className="famcoMsg__actions superDelete" onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>  
                        )}
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
                        

                    {isUserInfoExist ? (
                        <>
                        <div className="FamcoMsgLikes">
                            <img src={didIlike !== -1 ?heartIcon2:heartIcon1} 
                                onClick={toggleLike}
                            /> 
                            <span class= "notranslate">{FamcoMsgObj.likes}</span>
                            
                        </div>
                        {openComment ?(
                            <> 
                            <FontAwesomeIcon onClick={toggleComment} icon={faCommentDots }  className="FamcoComments"/>
                            <span class= "notranslate" className="numberOfComments">
                                {numberOfComments}
                            </span>

                            <div style={{ marginTop: 30 }}>     
                                
                                    <Comments 
                                    key={NewFamcoMsg.id} 
                                    famcoMsgId= {FamcoMsgObj.id}
                                    userObj={userObj}
                                    FamcoMsgObj={FamcoMsgObj}
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
                    ) : ( <> </>)
                    
                    }
                    
                </>
            )}
        </div>
    );
};


export default React.memo(Famco);