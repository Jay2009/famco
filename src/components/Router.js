import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";


const AppRouther = ({refreshUser,isLoggedIn, userObj}) => {
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            
                {isLoggedIn ? (
                    
                <>
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser}/>
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