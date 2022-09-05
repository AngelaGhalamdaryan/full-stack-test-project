import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SIGN_IN, SIGN_UP } from "../../../constants/routes";
import axios from 'axios';
import "./SignUp.scss";

const SignUp = () => {
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const signUp = () => {
        axios.post("http://localhost:8000/user/sign-up", { ...data })
        .then((response) => {
            const { data } = response;
            if (data.success) {
                history.push(SIGN_IN);
            }
        });
    }

    return (
        <div className="page--sign--up">
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
                    <h1>Sign Up</h1>
                    <div className="email--block">
                        <label>Name</label>
                        <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value})} />
                    </div>
                    <div className="email--block">
                        <label>Surname</label>
                        <input type="text" value={data.surname} onChange={(e) => setData({ ...data, surname: e.target.value})} />
                    </div>
                    <div className="email--block">
                        <label>Email</label>
                        <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value})} />
                    </div>
                    <div className="password--block">
                        <label>Password</label>
                        <input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value})} />
                    </div>
                    <div className="password--block">
                        <label>Confirm Password</label>
                        <input type="password" value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value})} />
                    </div>
                    <div className="button--submit">
                        <button type="button" onClick={signUp}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SignUp;