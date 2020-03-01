import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from '../../services/axios';
import Cookies from 'universal-cookie';
import './signup.scss';
import { toast} from 'react-toastify';
import { environment } from '../../environment';
const cookies = new Cookies();

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        name: '',
        redirect: cookies.get('token')
            ? true
            : false
    }

    handleSignupClick = (e) => {
        e.preventDefault()
        if (this.state.email && this.state.password && this.state.name) {

            axios
                .post(`${environment.baseUrl}/api/user/createUser`, {
                "name": this.state.name,
                "email": this.state.email,
                "password": this.state.password
            })
                .then((response) => {
                    toast.success('Successfully signed up :)', {position: toast.POSITION.BOTTOM_RIGHT});
                    this.setState({name: '', email: '', password: ''});
                    this.forceUpdate();
                })
                .catch((error) => {
                    toast.error('Email is already exist', {position: toast.POSITION.BOTTOM_RIGHT});
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

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
        let elem = document.getElementById('name')
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

        goToLogin = () => {
        this
            .props
            .history
            .push(`/login`);
    }



    componentWillMount() {}

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/home'}/>)
        }
        return (
            <div className="login-page">
                <div className="container">
                    <div className="row">
                        <div className="go-to-login" onClick={this.goToLogin}>
                            <i className="fa fa-arrow-left"></i>
                        </div>
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Sign Up</h5>
                                    <form className="form-signin">
                                        <div className="pd-bt-25">
                                            <input
                                                type="text"
                                                id="name"
                                                className="form-control"
                                                placeholder="* Full Name"
                                                onChange={this.handleNameChange}
                                                required
                                                autoFocus/>
                                        </div>

                                        <div className="pd-bt-25">
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                placeholder="* Email address"
                                                onChange={this.handleEmailChange}
                                                required/>
                                        </div>

                                        <div className="pd-bt-25">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                placeholder="* Password"
                                                onChange={this.handlePasswordChange}
                                                required/>
                                        </div>
                                        {this.state.name && this.state.password && this.state.email
                                            ? <button
                                                    className="btn btn-lg btn-signup btn-block text-uppercase"
                                                    type="submit"
                                                    onClick={this.handleSignupClick}>Signup</button>
                                            : <button className="btn btn-lg btn-dark btn-block text-uppercase" type="submit">Signup</button>
                                        }

                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp