import React from "react";

const Famco = ({NewFamcoMsg, isOwner}) => (
    <div>
        <h4>{NewFamcoMsg.text}</h4>
        {isOwner && ( 
        <>
        <button>Delete Famco message</button>
        <button>Edit Famco message</button>
        </>
        )}
    </div>
);

export default Famco;