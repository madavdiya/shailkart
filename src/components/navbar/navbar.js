import React, {Component} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import './navbar.scss'
import Cookies from 'universal-cookie';
import {connect} from 'react-redux';
const cookies = new Cookies();

class Navbar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: cookies.get('name'),
        };
    }
    signOut = () => {
        cookies.remove('token');
        if (cookies.get('token')) {
            cookies.remove('token');
        }
        this
            .props
            .history
            .push(`/login`);
    }

    goToPath = (path) => {
        this
            .props
            .history
            .push(`${path}`);
    }

    render() {
        console.log(this.props.addToCartItem, '.....')
        return (
            <div>
                <nav className="navbar navbar-fixed-top navbar-expand-lg height-90">
                    <div className="navbar-brand cursor-pointer" onClick={() => this.goToPath('/')}>
                        ShailKart</div>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            {cookies.get('token')
                                ? <li className="nav-item dropdown mr-25">
                                        <a
                                            href="true"
                                            className="shailkart-link nav-link dropdown-toggle cursor-pointer"
                                            id="navbarDropdownMenuLink"
                                            role="button"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false">
                                            Settings
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <div
                                                className="dropdown-item cursor-pointer"
                                                onClick={() => this.goToPath(`/profile`)}>Profile</div>
                                            <div className="dropdown-item cursor-pointer" onClick={this.signOut}>Logout</div>
                                        </div>
                                    </li>
                                : <li className="nav-item mr-25">
                                    <div
                                        className="shailkart-link login-btn"
                                        onClick={() => this.goToPath('login')}>Login</div>
                                </li>}

                            <li className="nav-item mr-50">
                                <i className="shopping-cart-icon fa fa-shopping-cart" aria-hidden="true"></i>
                               {cookies.get('token') && <span className="cartitem-count">{this.props.addToCartItem}</span>}
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        addToCartItem: state.addToCartItem
    }
}
export default connect(mapStateToProps)(withRouter(Navbar));