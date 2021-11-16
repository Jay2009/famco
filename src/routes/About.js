import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faCode } from "@fortawesome/free-solid-svg-icons";
import kokoatalk2 from "../assets/kokoatalk2.PNG";
import checkInvestingScore from "../assets/checkInvestingScore.PNG";




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
                    <span>Please check my other web-apps out below.</span>
                </div>

                <div className="aboutPortfolio">
                    <span>- Javior( Vanilla JS & CSS & HTML) -</span>
                    <a href="https://jay2009.github.io/chrome_app/index.html"> 
                        <img src={checkInvestingScore} className="kokoatalk2"/> 
                    </a>
                    <span>Check your stock investment score ! </span><br/>
                    <a href="https://jay2009.github.io/chrome_app/index.html">Link </a>
                </div>

                <div className="aboutPortfolio">
                    <span>- Kokoa clone(CSS & HTML) -</span>
                    <a href="https://jay2009.github.io/kokoa-clone-2020/"> 
                        <img src={kokoatalk2} className="kokoatalk2"/> 
                    </a>
                    <span>Dosen't it look pretty familiar to you? </span><br/>
                    <a href="https://jay2009.github.io/kokoa-clone-2020/">Link </a>
                </div>
                
                <div className="aboutContact">
                    <span>Check other projects on</span>
                    <span>Github : <a href="https://github.com/Jay2009">https://github.com/Jay2009 </a></span> 
                    <br/>
                    <span>Contact : jaem2009@naver.com </span>
                </div>
        
            
        
        </div>
        </>
        
    );
};

export default About;