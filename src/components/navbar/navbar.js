import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import './navbar.scss'
import * as Cookies from "js-cookie";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: true,
        };
    }
    componentDidMount() {
        if (!Cookies.get('token')) {
            this.setState({auth: false});
        }
    }

    signOut = () => {
        // cookies.remove('token'); if (cookies.get('token')) { cookies.remove('token');
        // } this     .props     .history     .push(`/`);
    }

    goToPath = (path) => {
        this
            .props
            .history
            .push(`${path}`);
    }

    searchOption = (e) => {
        this.setState({searchOption: e.target.value});
    }

    render() {

        return (
            <header className="navbar">
                <div onClick={() => this.goToPath('/')} className="home-link router-link-exact-active router-link-active cursor-pointer">
                    <span className="site-name">MERN</span>
                </div>
                <div className="links" style={{maxWidth: '1312px'}}>
                    
                    <nav className="nav-links">
                        <div className="nav-item cursor-pointer"><div onClick={() => this.goToPath('/login')} className="nav-link">Login</div></div>
                    </nav>
                </div>
            </header>
        )
    }
}

export default withRouter(Navbar);
