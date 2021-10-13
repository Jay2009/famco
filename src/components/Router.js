import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";


const AppRouther = ({refreshUser,isLoggedIn, userObj, userInfo}) => {
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            
                {isLoggedIn ? (
                    
                <>
                    <Route exact path="/">
                        <Home userObj={userObj} userInfo={userInfo}/>
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} userInfo={userInfo} refreshUser={refreshUser}/>
                    </Route>         
                </>
                
                    ): (
                <>
                    <Route exact path="/">    
                        <Auth />
                    </Route>
                </>
                )}
            
        </Router>
    );
};

export default AppRouther;