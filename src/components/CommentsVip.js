import { dbService } from "fbase";
import { doc, updateDoc, collection, onSnapshot,arrayUnion} from "firebase/firestore";
import React, { useState,useEffect} from "react";
import SingleCommentVip from "components/SingleComment";
import CommentTimeVip from "components/CommentTimeVip";



const CommentsVip = ({famcoMsgId, userObj,FamcoVipObj }) => {

    const [NewComment, setNewComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [secreatKey, setSecreatKey] = useState(0);
    const [currentDate, setCurrentDate] = useState("");
    const commentRef = doc(dbService, "NewFamcoVip", `${famcoMsgId}`) ;

    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth()+1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const sec = String(date.getSeconds()).padStart(2,"0");
    const milsec = String(date.getMilliseconds()).padStart(2,"0");
    
    
    const onCommentChange = ({ target: { value } }) => {
        setNewComment(value);
        };

    const onCommentSubmit = async (event) => {
        event.preventDefault();
        

        await updateDoc(commentRef,  {
            comments : arrayUnion({
                [userObj.displayName+(secreatKey.toFixed(2))] : NewComment,
            })
            //setCommentObj();
        });
        setSecreatKey(( Math.random() * (10 - 1) + 1 ));
        
        await updateDoc(commentRef,  {
            commentsNumber : FamcoVipObj.commentsNumber+1,
        });
        setNewComment("");

        
        await updateDoc(commentRef,  {
            commentTime : arrayUnion({
                [year +"/"+ month +"/"+ day +" At "+ hours +" : "+ minutes + " : " + sec + " @ " + milsec] : userObj.displayName,
            })
        });
    };

    useEffect (() => { 

            const snapshotCommanderComment =  onSnapshot(collection(dbService, "NewFamcoVip"), 
            (snapshot) => {
                const unsub = onSnapshot(doc(dbService, "NewFamcoVip", `${famcoMsgId}`), (doc) => {
                    if(doc.data()){
                        setAllComments(doc.data().comments);
                    }
                });
            },
            (error) => {
                console.log("성공!");
                });


                const snapshotCommanderDate =  onSnapshot(collection(dbService, "NewFamcoVip"), 
                (snapshot) => {
                    const unsub = onSnapshot(doc(dbService, "NewFamcoVip", `${famcoMsgId}`), (doc) => {
                        if(doc.data()){
                            setCurrentDate(doc.data().commentTime);
                        }
                    });
                },
                (error) => {
                    console.log("성공!");
                    });

            }, []);

    return(
        <div>
            
            <div className="theWholeComments">
                <div  class= "notranslate" className="userAndComment">
                    {allComments.map((commentArry) => (
                        <SingleCommentVip
                            famcoMsgId={famcoMsgId}
                            objKey={Object.keys(commentArry)} 
                            objValue={commentArry[Object.keys(commentArry)]}
                            userObj={userObj} 
                        />
                    ))}
                </div>

                <div class= "notranslate" className="onlyDate">
                    {currentDate&&currentDate.map((commentTimeArry) => (
                        <CommentTimeVip
                            commentTimeArry={Object.keys(commentTimeArry)}
                        /> 
                    ))}
                </div>
            </div>
            

            <form onSubmit={onCommentSubmit} className="famcoMsgForm">
                <div className="commentForm">
                    <textarea 
                        class= "comment__input"
                        onChange= {onCommentChange} 
                        value={NewComment} 
                        type="text" 
                        placeholder="Write a comment" 
                        maxLength="71" 
                        required 
                        
                        >
                    </textarea>
                    <input type="submit" value="Add"  className="commentAdd" />
                </div>
            </form>
        </div>
        
    );
}

export default CommentsVip;