import React, {lazy, Suspense} from 'react';
import './App.scss';
import * as Cookies from "js-cookie";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import * as $ from 'jquery';
const LoginComponent = (lazy(() => (import ('./components/login/login'))));
const HomeComponent = (lazy(() => (import ('./components/home/home'))));
const Navbar = (lazy(() => (import ('./components/navbar/navbar'))));

let component = () => {
    return (
        <div className='main-container'>
            <Navbar/>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path='/' component={HomeComponent} exact/>
                    {/* <Route path='/' component={requireAuth(HomeComponent)} exact/> */}
                </Switch>
            </Suspense>
        </div>
    )
}

function App() {
    return (
            <div>
                <BrowserRouter>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path="/login" component={LoginComponent}/>
                            <Route path='/' component={component}/>
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            </div>
    );

}

export default App;