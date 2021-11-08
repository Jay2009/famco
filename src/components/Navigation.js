import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faInfoCircle } from "@fortawesome/free-solid-svg-icons";




const Navigation = ({userObj}) => 
<nav className="navigation">
    <ul  className ="navigation__homeInfo">
        
        <li className="navBar">
            <Link 
            className="logo" 
            to="/" 
            >
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
            </Link>
        </li>
        
        <li className="navBar">
            <Link
            to="/about"
            
            >
            <FontAwesomeIcon icon={faInfoCircle} color={"#04AAFF"} size="2x" />

            </Link>
        </li>

    </ul>
    <ul className="navigation__user">
        <li className="navUser">
            <Link 
            to="/profile"
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

    </ul>
</nav>

export default Navigation;