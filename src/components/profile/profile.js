import React, {Component} from 'react';
import './profile.scss';
import Cookies from 'universal-cookie';
import axios from '../../services/axios';
import {environment} from '../../environment';
import {Redirect} from 'react-router-dom'
const Cookie = new Cookies();

class Profile extends Component {
    state = {
        auth: Cookie.get('token')
            ? true
            : false,
        user: {
            payments :[]
        }
    };

    componentDidMount() {
        if (this.state.auth) {
            axios
                .get(`${environment.baseUrl}/api/user/getUserDetail`)
                .then(res => {
                    res.data.userDetails.payments = res.data.userDetails.payments.filter(payment => {
                        return payment.hasOwnProperty('transaction');
                    })
                    this.setState({user: res.data.userDetails});
                })
                .catch(err => {
                    console.log({err});
                })
        }
    }

    render() {
        if (!this.state.auth) {
            return (<Redirect to={'/login'}/>)
        }
        return (
            <div className="child-container profile-container">
                <h3>List of transactions</h3>
                <div className="transaction-container">
                    <div className="transaction-box">
                            <div className="header-text">Date/Time</div>
                            <div className="header-text">Trans Id</div>
                       
                            <div className="header-text">Customer Email</div>
                            <div className="header-text">Contact</div>
                            <div className="header-text">Mode</div>
                            <div className="header-text">Amount</div>
                    </div>
                    <div>
                        {this.state.user.payments.map(payment => {
                            return <div className="display-flex">
                                <div className="transaction-value">{new Date(payment.transaction.created_at).toLocaleDateString()}</div>
                                <div className="transaction-value">{payment.transaction.id}</div>
                                <div className="transaction-value">{payment.transaction.email}</div>
                                <div className="transaction-value">{payment.transaction.contact}</div>
                                <div className="transaction-value">{payment.transaction.method}</div>
                                <div className="transaction-value">{payment.transaction.amount / 100} &nbsp;₹</div>
                                </div>
                        })}
                    </div>
                </div>

            </div>
        )
    }
}

export default Profile;
