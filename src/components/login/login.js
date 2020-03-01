import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './login.scss';
import jwt from 'jsonwebtoken'
import axios from '../../services/axios';
import Cookies from 'universal-cookie';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {environment} from '../../environment';
const cookies = new Cookies();

class Login extends Component {
    state = {
        email: '',
        password: '',
        redirect: cookies.get('token')
            ? true
            : false,
        forgotPassword: false,
        forgotPasswordEmail: '',
        forgotPasswordInput: '',
        forgotConfirmPasswordInput: ''
    }

    handleLoginClick = (e) => {
        e.preventDefault()
        if (this.state.email && this.state.password) {
            axios
                .post(`${environment.baseUrl}/api/user/login`, {
                "email": this.state.email,
                "password": this.state.password
            })
                .then((response) => {
                    cookies.set('token', response.data.token, {path: '/'})
                    let data = jwt.decode(response.data.token);
                    for (let key in data) {
                        cookies.set(key.toString(), data[key], {path: '/'})
                    }
                    this.setState({redirect: true})
                })
                .catch((error) => {
                    toast.error('Email or Password does not exist', {position: toast.POSITION.BOTTOM_RIGHT});
                });
        }

    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
        let elem = document.getElementById('password')
        this.validate(elem, event)
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
        let elem = document.getElementById('email')
        this.validate(elem, event)
    }

    handleForgotEmailChange = (event) => {
        this.setState({forgotPasswordEmail: event.target.value});
        let elem = document.getElementById('forgot-email')
        this.validate(elem, event)
    }

    handleForgotPasswordChange = (event) => {
        this.setState({forgotPasswordInput: event.target.value});
        let elem = document.getElementById('forgot-password')
        this.validate(elem, event)
    }

    handleForgotConfirmPasswordChange = (event) => {
        this.setState({forgotConfirmPasswordInput: event.target.value});
        let elem = document.getElementById('confirm-password')
        this.validate(elem, event)
    }

    validate(elem, event) {
        if (!event.target.value) {
            if (!elem.classList.contains('input-danger')) {
                elem
                    .classList
                    .add('input-danger');
            }
        } else {
            if (elem.classList.contains('input-danger')) {
                elem
                    .classList
                    .remove('input-danger');
            }
        }
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            forgotPassword: !this.state.forgotPassword
        })
    }

    goToSignup = () => {
        this
            .props
            .history
            .push(`/signup`);
    }

    checkForgotPassword = () => {
        if (this.state.forgotPasswordEmail && this.state.forgotPasswordInput && this.state.forgotConfirmPasswordInput) {
            axios
                .post(`${environment.baseUrl}/api/user/updatePassword`, {
                email: this.state.forgotPasswordEmail,
                password: this.state.forgotPasswordInput,
                confirmPassword: this.state.forgotConfirmPasswordInput
            })
                .then(() => {
                    toast.success("Password changed successfully", {position: toast.POSITION.BOTTOM_RIGHT});
                    this.setState({forgotPasswordEmail: '', forgotPasswordInput: '', forgotConfirmPasswordInput: ''});
                    this.handleClose();
                })
                .catch(err => {
                    console.log({err})
                    toast.error(err.response.data.statusText, {position: toast.POSITION.BOTTOM_RIGHT})
                })
        }
    }

    render() {
        console.log(this.state);
        if (this.state.redirect) {
            return (<Redirect to={'/'}/>)
        }
        return (
            <div className="login-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Sign In</h5>
                                    <form className="form-signin">
                                        <div className="pd-bt-25">
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                placeholder="Email address"
                                                onChange={this.handleEmailChange}
                                                autoComplete="email"
                                                required
                                                autoFocus/>
                                        </div>

                                        <div className="pd-bt-25">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={this.handlePasswordChange}
                                                required/>
                                        </div>

                                        <button
                                            className={`btn btn-lg btn-block text-uppercase`}
                                            type="submit"
                                            onClick={this.handleLoginClick}>Sign in</button>
                                        <div className="forgot-password" onClick={this.handleClose}>
                                            Forgot password?
                                        </div>
                                        <hr className="my-4"/>
                                        <div className="or-option">OR</div>
                                        <button
                                            className="btn btn-lg btn-block text-uppercase"
                                            onClick={this.goToSignup}>Signup</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={this.state.forgotPassword
                    ? "modal display-block"
                    : "modal display-none"}>
                    <section className="modal-main">
                        <div className="close-modal">
                            <i onClick={this.handleClose} className="fa fa-times fa-2x"></i>
                        </div>

                        <div>
                            <div className="pd-bt-25">
                                <input
                                    type="email"
                                    id="forgot-email"
                                    className="form-control"
                                    placeholder="Email address"
                                    onChange={this.handleForgotEmailChange}
                                    required
                                    autoFocus/>
                            </div>

                            <div className="pd-bt-25">
                                <input
                                    type="password"
                                    id="forgot-password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={this.handleForgotPasswordChange}
                                    required/>
                            </div>
                            <div className="pd-bt-25">
                                <input
                                    type="password"
                                    id="confirm-password"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    onChange={this.handleForgotConfirmPasswordChange}
                                    required/>
                            </div>
                            <button
                                className={`btn btn-lg btn-block text-uppercase ${this.state.forgotPasswordEmail.length && this.state.forgotPasswordInput.length && this.state.forgotConfirmPasswordInput.length
                                ? ''
                                : 'disabled'}`}
                                type="submit"
                                onClick={this.checkForgotPassword}>Submit</button>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default Login