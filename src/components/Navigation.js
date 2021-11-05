import React from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faInfoCircle } from "@fortawesome/free-solid-svg-icons";




const Navigation = ({userObj}) => 
<nav>
    <ul  className ="navigation">
        <li>
            <Link to="/" style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
            </Link>
        </li>
        
        <li>
            <Link
            to="/about"
            style={{ marginLeft: 10 }}
            >
            <FontAwesomeIcon icon={faInfoCircle} color={"#04AAFF"} size="2x" />

            </Link>
        </li>
    </ul>
    <li className="navigation__user">
            <Link 
            to="/profile"
                style={{
                    marginLeft: 10,
                    marginRight: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    fontSize: 12,
                }}
            > 
                <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            <span className="displayUserName" style={{ marginTop: 10 }}>
            {userObj.displayName
                ? `${userObj.displayName}`
                : "Profile"}
            </span>
            </Link>
        </li>
</nav>

export default Navigation;