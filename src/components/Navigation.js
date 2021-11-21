import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { doc, collection, getDocs,getDoc, query, where, } from "@firebase/firestore";
import { dbService } from "fbase";
import cuteCrown from "../assets/cuteCrown.png";
import FAMCO from "../assets/FAMCO.png";







const Navigation = ({userObj}) => {

    const onClick = () => {
        window.scrollTo(0, 0);
    }

    const [isUserVip, SetIsUserVip] = useState(false);

    const checkVip = async() =>{
        
        const q = query(
            collection(dbService, "UserInfo"),
            where("creatorId", "==", userObj.uid),
            );
            const getDocuments = await getDocs(q);
            
            getDocuments.forEach(async(document) => {
                const docRef = doc(dbService, "UserInfo", `${document.id}`);
                const getDocument = await getDoc(docRef);
                    if(getDocument.data().vip === "jandc914"){
                        SetIsUserVip(true);
                    }else {
                        
                    }
            });
    }


useEffect (() => { 
        
    checkVip();
        
        }, []);




return (
<nav className="navigation">
    <div className="navigation__position">
    <ul  className ="navigation__Icons">
        
        <li className="navLogo">
            <Link 
            className="logo" 
            to="/" 
            onClick={onClick}
            >
            <img src={FAMCO}></img>
            </Link>
        </li>

        <li className="navUser">
            <Link 
            to="/profile"
            onClick={onClick}
            > 
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            </Link>
        </li>
        
        <li className="navAbout">
            <Link
            to="/about"
            onClick={onClick}
            >
            <FontAwesomeIcon icon={faInfoCircle} color={"#04AAFF"} size="2x" />
            </Link>
        </li>

        
    </ul>


            <span className="displayUserName" >
            {userObj.displayName
                ? ( <span class="notranslate"> {userObj.displayName}</span>)
                : ("Profile")}
            </span>

            
        

        {isUserVip ? (
        <li className="navVip">
            <Link 
            to="/vip"
            onClick={onClick}
            > 
            <img src={cuteCrown}/>
            </Link>
        </li>
        ):( <></> )
        }

    
    </div>
</nav>
);
};


export default Navigation;