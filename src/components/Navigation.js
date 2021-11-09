import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection, getDocs, query, onSnapshot, orderBy, where, } from "@firebase/firestore";
import { dbService, storageService } from "fbase";
import vip from "../assets/vip.png";
import crown1 from "../assets/crown1.png";
import crown2 from "../assets/crown2.png";
import crown3 from "../assets/crown3.png";








const Navigation = ({userObj}) => {

    const onClick = () => {
        window.scrollTo(0, 0);
    }

    const [isUserVip, SetIsUserVip] = useState(false);

    const checkVip = async() =>{
        
        const q = query(
            collection(dbService, "UserInfo"),
            where("vip", "==", "jandc914")
            );
            const getDocument = await getDocs(q);
            console.log(getDocument,"get documentsssssssss");

            getDocument.forEach(async(document) => {
                console.log(document.id, " there is true");
                //if(creatorId == userObj.uid)
                SetIsUserVip(true);
            
            });
    }


useEffect (() => { 
        
    checkVip();
    console.log(isUserVip);
        
        }, []);




return (
<nav className="navigation">
    <ul  className ="navigation__homeInfo">
        
        <li className="navBar">
            <Link 
            className="logo" 
            to="/" 
            onClick={onClick}
            >
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
            </Link>
        </li>
        
        <li className="navBar">
            <Link
            to="/about"
            onClick={onClick}
            >
            <FontAwesomeIcon icon={faInfoCircle} color={"#04AAFF"} size="2x" />
            </Link>
        </li>

    </ul>
    <ul className="navigation__user">
        <li className="navUser">
            <Link 
            to="/profile"
            onClick={onClick}
            > 
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            </Link>
        </li>
        
        <li className="navuser__name" >
            <span className="displayUserName">
            {userObj.displayName
                ? `${userObj.displayName}`
                : "Profile"}
            </span>
        </li>
        {isUserVip ? (
        <li className="navVip">
            <Link 
            to="/vip"
            onClick={onClick}
            > 
            <img src={crown2}/>
            </Link>
        </li>
        ):( <></> )
    }
    </ul>

    
</nav>
);
};


export default Navigation;