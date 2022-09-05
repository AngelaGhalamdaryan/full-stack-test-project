import React from "react";
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { SIGN_IN, SIGN_UP, HOME, USER_PROFILE } from "../constants/routes";
import { SignIn, SignUp } from "../components/Authication";
import { UserProfile, Profile } from ".";

const Routes = (props) => {
    const { authUser } = props;
    const PrivateRoute = ({ component, path, authed }) => {
        if (!authed) {
            return <Redirect to={SIGN_IN}/>
        }
        else {
            return <Route exact path={path} component={component} />
        }
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route path={USER_PROFILE} component={Profile} /> {/*authed={authUser}*/}
                <Route exact path={SIGN_UP} component={SignUp}>
                    {authUser && <Redirect to={HOME} />}
                </Route>
                <Route exact path={SIGN_IN} component={SignIn}>
                    {authUser && <Redirect to={HOME} />}
                </Route>
                <Route exact path={HOME} component={() => <UserProfile />} >
                    {!authUser && <Redirect to={SIGN_IN} />}
                </Route>
                <Route path="*" component={() => <h1> not found</h1>} />
            </Switch>
        </BrowserRouter>
    )
};

Routes.propTypes = {
    authUser: PropTypes.bool,
};

Routes.defaultProps = {
    authUser: false,
};

export default Routes;