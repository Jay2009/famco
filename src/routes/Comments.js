import { dbService } from "fbase";
import { deleteObject, ref } from "@firebase/storage";
import { doc, deleteDoc, updateDoc,getDoc, collection, getDocs, query, onSnapshot, orderBy, where, map, update,setDoc, addDoc,set ,arrayUnion} from "firebase/firestore";
import { storageService } from "../fbase";
import React, { useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faBullhorn, faCommentDots, faPray, } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core'
import {faCommentDots as emptyComments } from '@fortawesome/free-regular-svg-icons'
import heartIcon1 from "../assets/heart1.png";
import heartIcon2 from "../assets/heart2.png";
import {v4 as uuidv4} from "uuid";


const Comments = ({famcoMsgId, isOwner, userObj, isUserInfoExist}) => {

    const [NewComment, setNewComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [commentEditing, setCommentEditing] = useState(false);
    const commentRef = doc(dbService, "NewFamcoMsg", `${famcoMsgId}`) ;

    let commentArr = [];
    
    const onCommentChange = ({ target: { value } }) => {
        console.log(famcoMsgId ,"what is the data from famcomsg .id");
        setNewComment(value);
        console.log(userObj.uid ,"%%%%%%%");
    
        };

    const onCommentSubmit = async (event) => {
        event.preventDefault();
        
        await updateDoc(commentRef,  {
            comments : arrayUnion({
                [userObj.displayName] : NewComment,
            })
        });
    };


    const getAllComments = async() => {
        const docRef = doc(dbService, "NewFamcoMsg",`${famcoMsgId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        docSnap.data().comments.map((v) => {
            //setAllComments((prev) => [v, ...prev ]);
            console.log(v,"this is what");
            return v;
        })
        
        } 
    }

    useEffect (() => { 
        getAllComments();
        
            
            }, []);


    return(
        <div>
            <form onSubmit={onCommentSubmit} className="famcoMsgForm">
                <div className="commentForm">
                    <textarea 
                        class= "comment__input"
                        onChange= {onCommentChange} 
                        value={NewComment} 
                        type="text" 
                        placeholder="Write a comment" 
                        maxLength="60" 
                        required 
                        autoFocus
                        >
                    </textarea>
                    <input type="submit" value="Add"  className="commentAdd" />
                </div>
            </form>
        <span>{allComments} </span>

        

            
        </div>




    );
}

export default Comments;