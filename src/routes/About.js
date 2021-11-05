import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faCode } from "@fortawesome/free-solid-svg-icons";
import Jay from "../assets/javiorlogo.jpg";
import kokoatalk from "../assets/kokoatalk.PNG";
import kokoatalk2 from "../assets/kokoatalk2.PNG";


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
                <FontAwesomeIcon icon={faCode} />
                    <span>Hello, I am Jay.</span>
                    <span>Please check my other web-apps out bellow.</span>
                </div>

                <div className="aboutPortfolio">
                    <span>- Kokoa clone(CSS & HTML) -</span>
                    <a href="https://jay2009.github.io/kokoa-clone-2020/"> 
                        <img src={kokoatalk2} className="kokoatalk2"/> 
                    </a>
                    <text>Dosen't it pretty look familiar to you? </text><br/>
                    <a href="https://jay2009.github.io/kokoa-clone-2020/">Link </a>


                    
                </div>
                
                <div className="aboutContact">
                    <span>Check other projects on</span>
                    <span>Github : <a href="https://github.com/Jay2009">https://github.com/Jay2009 </a></span> 
                    <span>Contact : jaem2009@naver.com </span>
                </div>
        
            
        
        </div>
        </>
        
    );
};

export default About;