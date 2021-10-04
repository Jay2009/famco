import React, { useState } from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";


const AppRouther = ({isLoggedIn, userObj}) => {
    
    return(
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                <>
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                </>
                    ): (
                <>
                    <Route exact path="/">    
                        <Auth />
                    </Route>
                </>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouther;