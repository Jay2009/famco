import { dbService } from "fbase";
import { deleteObject, ref } from "@firebase/storage";
import { storageService } from "../fbase";
import { doc, deleteDoc, updateDoc, query, collection,orderBy, onSnapshot,getDocs,where } from "firebase/firestore";
import React, { useState,useEffect, useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import heartIcon1 from "../assets/heart1.png";
import heartIcon2 from "../assets/heart2.png";
import cuteCrown from "../assets/cuteCrown.png";




const FamcoVip = ({FamcoVipObj, isOwner, userObj}) => {
    const [editing, setEditing] = useState(false);
    const [NewFamcoMsg, setNewFamcoMsg] = useState(FamcoVipObj.text);
    const famcoTextRef = doc(dbService, "NewFamcoVip", `${FamcoVipObj.id}`) ;
    
    
    const [isLiked, setIsLiked] = useState(false);
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    

    let didIlike = FamcoVipObj.likedName.indexOf(userObj.uid);
    
    //console.log(allUsers.map( (document) => document.id ),"야야야야야야야");
    //setUserInfo(allUsers.map( (hey) => hey.whatPostLiked )


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

        if(alreadyLiked){
        
            if(didIlike <= 0){
                console.log(didIlike," 라이크 없당 ");
                    updateDoc(famcoTextRef, {
                        likes:  FamcoVipObj.likes+1,
                        likedName: FamcoVipObj.likedName +","+userObj.uid,
                    });
                    
                    
                    
            }

            if(didIlike !== -1){
                console.log(didIlike," 라이크 이미 했내 새캬");
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
    
    return(
        <div className="famcoMsg famcoVip" >
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
                    {FamcoVipObj.text}
                    <br/>
                    <br/>
                    <div className="FamcoMsgLikes">
                        <img src={didIlike !== -1 ?heartIcon2:heartIcon1} 
                            onClick={toggleLike}
                        /> 
                        <span>{FamcoVipObj.likes}</span>
                    </div>    
                    
                    {isOwner ? 
                        (<h5 className="famcoOwner"> {userObj.displayName}</h5>
                            ) : (
                            <h5 className="famcoOtherOwners"> {FamcoVipObj.name}</h5>)
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
                </>
            )}
        </div>
        
    );
};


export default FamcoVip;