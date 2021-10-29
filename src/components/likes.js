import React, { useState, useEffect } from "react"; 


import heartIcon1 from "../assets/heart1.png";
import heartIcon2 from "../assets/heart2.png";
import heartIcon3 from "../assets/heart3.png";
import heartIcon4 from "../assets/heart4.png";



const HeartButton = ({ like, onClick }) => {
    return (
        <img src={like?heartIcon2:heartIcon1} 
        onClick={onClick} /> 
        ); 
    };

    export default HeartButton;