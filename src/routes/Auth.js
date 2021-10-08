import { authService } from "fbase";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const Auth = () => {    
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
        console.log(event.target.name);
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
    <div>
    <form onSubmit={onSubmit}>
        <input 
        name="email" 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={onChange}
        required
        />
        <input 
        name="password"
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={onChange}
        required
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} 
        />
        {error}
    </form>
    <span onClick={toggleAccount}>
        {newAccount? "Sign in" : "Create Account"}
    </span>
    <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
    </div>
</div>
);
};
export default Auth;