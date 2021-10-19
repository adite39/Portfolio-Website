import React from 'react';
import signup2 from "../images/signup2.png";
import { NavLink } from "react-router-dom";
import Loginform from "./Loginform";

const Login = () => {
    return (
        <>
            <section className="sign-in">
                <div className="container mt-5">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure>
                                <img src={signup2} alt="login pic" />
                            </figure>
                            <NavLink to="/signup" className="signup-image-link">Create an account</NavLink>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Sign up</h2>
                            <Loginform />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Login;