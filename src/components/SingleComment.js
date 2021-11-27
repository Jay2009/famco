import React from "react";


const SingleComment = ({objKey,objValue, userObj}) => {
    /* //// THIS IS FOR NEXT WHEN FIREBASE PROVIDE NESTED QUERY@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@             
    const db =getFirestore ();
    const [editing, setEditing] = useState(false);
    const [newComment, setNewComment] = useState("");

    const commentRef = doc(dbService, "NewFamcoMsg", `${famcoMsgId}`) ;

    const toggleEditing = () => setEditing((prev) => !prev);
    
    
    const onDeleteClick = async () => {
        const ok= window.confirm("Are you sure you want to delete the famco message?");
        if(ok){
            await updateDoc(commentRef,  {
                comments : wholeCommentArry.filter(item => item !== objValue)
    
            });
        }
    };

    const onCommentChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewComment(value);
        
    };
    
    const onEditCommentSubmit = async (event) => {
        event.preventDefault();
        
        await updateDoc(commentRef,  {
            comments : ({
                [userObj.displayName] : newComment,
            })
        });
        
    }

    const onEdit = async (event) => {
        event.preventDefault();
        
        db
        .collection('proprietary')
        .doc(`${famcoMsgId}`)
        .set(
        { comments: [{[userObj.displayName] : newComment }] },
        { merge: true }
        )
    }
    */ //// THIS IS FOR NEXT WHEN FIREBASE PROVIDE NESTED QUERY@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    return(
        <div>

                        <div className= "singleComment">    
                            <div className="commentMsg" >
                            
                            {objKey.toString().replace(/[0-9]/g,"") === userObj.displayName+"." ? (
                                <>
                                <span className="commentOwner__name">
                                    {objKey.toString().replace(/[0-9]/g,"")}
                                </span>
                                <span>
                                    
                                </span>

                                <span className="commentOwner__date">
                                
                                </span>
                                
                                </>
                            ): (
                                <>
                                <span class= "notranslate" className="commentOthers">
                                    {objKey.toString().replace(/[0-9]/g,"")}
                                </span>
                                <span class= "notranslate" className="commentOwner__date">
                                
                                </span>
                                </>
                            )
                            }
                                <span class= "notranslate" className="commentText">
                                    {objValue}
                                </span>        
                            </div>
                        </div>
                        
                        

        </div>
    );
}

export default SingleComment;