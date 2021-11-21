import { authService } from "fbase";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import FAMCO from "../assets/FAMCO.png";


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
    let data;
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            
        if(newAccount){
            data = await createUserWithEmailAndPassword(authService, email, password) ;
        } else {
            data = await signInWithEmailAndPassword(authService, email, password);
            
        } 
        
    }   catch (error) {
        setError(error.message);
    }
    };

const toggleAccount = () => setNewAccount((prev) => !prev);
const onSocialClick = async (event) => {
    const {
    target: { name }} = event;
    let provider;
    try {
        
    if (name === "google") {
        
    provider = new GoogleAuthProvider();
    const result = await signInWithPopup(authService, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    } 
    } catch (error) {
    console.log(error);
    
    }
    };
return (
    <div className="authContainer">
        <img src={FAMCO}
            className="authIcon"
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
        <button type="button" onClick={onSocialClick} name="google" className="authBtn authBtn__span">
            Continue with Google
        </button>
    </div>
</div>
);
};
export default Auth;