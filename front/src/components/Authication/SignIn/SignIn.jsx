import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SIGN_IN, SIGN_UP } from "../../../constants/routes";
import { useDispatch } from "react-redux";
import { signIn } from '../../../redux/actions/user';
import "./SignIn.scss";

const SignIn = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const history = useHistory();
    const dispatch = useDispatch();

    const logIn = () => {
        dispatch(signIn(data, history))
    }

    return (
        <div className="page--sign--in">
            <div className="navbar--parent">
                <ul className="navbar">
                    <li>
                        <Link to={SIGN_IN}>Sign In</Link>
                    </li>
                    <li>
                        <Link to={SIGN_UP}>Sign Up</Link>
                    </li>
                </ul>
            </div>
            <div className="content">
                <div className="form--popup">
                    <h1>Sign In</h1>
                    <div className="email--block">
                        <label>Email</label>
                        <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </div>
                    <div className="password--block">
                        <label>Password</label>
                        <input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </div>
                    <div className="button--submit">
                        <button type="button" onClick={logIn}>
                            Log in
                        </button>
                    </div>
                    {/* <div className="button--t">
                        <button type="button" onClick={getUser}>
                            get user
                        </button>
                    </div> */}
                </div>
            </div>
            
        </div>
    )
}

export default SignIn;