import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import Jay from "../assets/javiorlogo.jpg";


const About = () => {






    return(
        <>
            
        <div className="container">

                <div className="aboutHeader">
                    <span>Welcome to Famco world! </span>
                    <span>Share your story to the world. </span>
                </div>


                <div className="aboutFamco">
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Famco is a Mobile-Friendly web application that people can share stories.
                        This web is built on React(hook) and Firebase.
                    </span>
                    
                    
                </div>
                    
                <div className="aboutMe">
                    <img src={Jay} className="jayLogo"/>
                    <span>Hello, I am Jay.</span>
                    <span>Please check my other web-apps out bellow.</span>
                    
                    <span>Github : <a href="https://github.com/Jay2009">https://github.com/Jay2009 </a> </span> 
                    <span>Contact : jaem2009@naver.com </span>
                    
                </div>
                        
        
            
        
        </div>
        </>
        
    );
};

export default About;