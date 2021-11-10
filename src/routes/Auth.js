import { authService } from "fbase";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
} from "@fortawesome/free-brands-svg-icons";

const Auth = ({userObj}) => {    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: {name,value},
        } = event;
        if(name ==="email") {
            setEmail(value);
        }else if (name === "password") {
            setPassword(value);
        }
        
    };
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
        if(newAccount){
            data = await createUserWithEmailAndPassword(authService, email, password) ;
        } else {
            data = await signInWithEmailAndPassword(authService, email, password);
            
        } 
        console.log(data);
    }   catch (error) {
        setError(error.message);
    }
    };

const toggleAccount = () => setNewAccount((prev) => !prev);
const onSocialClick = async(event) => {
    const {
        target: {name},
    } = event;
    let provider;
    if(name === "google"){
        provider = new GoogleAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
}
return (
    <div className="authContainer">
        <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="3x"
            style={{ marginBottom: 30 }}
        />
    <form onSubmit={onSubmit}  className="container">
        <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={onChange}
            className="authInput"
            required
        />
        <input 
            name="password"
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={onChange}
            className="authInput"
            required
        />
        <input type="submit" 
            className="authInput authSubmit"
            value={newAccount ? "Create Account" : "Log In"} 
        />
        {error && <span className="authError">{error}</span>}
    </form>
    <span onClick={toggleAccount} className="authSwitch">
        {newAccount? "Sign in" : "Create Account"}
    </span>
    <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
            Continue with Google <FontAwesomeIcon icon={faGoogle} className="google" />
        </button>
    </div>
</div>
);
};
export default Auth;