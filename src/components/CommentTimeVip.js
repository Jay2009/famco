import React from "react";

const CommentTImeVip = ({commentTimeArry}) => {
    return(
        <div className="commentTime">
            {commentTimeArry.toString().substr(0,22)}
        
        </div>
    );
}

export default CommentTImeVip;