import {HashRouter as Router, Route} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";


const AppRouther = ({refreshUser,isLoggedIn, userObj, NewFamcoMsg}) => {
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            
                {isLoggedIn ? (
                    
                    <div
                        style={{
                        maxWidth: 890,
                        width: "100%",
                        margin: "0 auto",
                        marginTop: 80,
                        display: "flex",
                        justifyContent: "center",
                        }}
                    >
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj}  refreshUser={refreshUser} FamcoMsgObj={NewFamcoMsg} />
                    </Route>         
                </div>
                
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