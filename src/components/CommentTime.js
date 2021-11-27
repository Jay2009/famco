import React from "react";

const CommentTIme = ({commentTimeArry}) => {
    return(
        <div className="commentTime">
            {commentTimeArry.toString().substr(0,22)}
        
        </div>
    );
}

export default CommentTIme;