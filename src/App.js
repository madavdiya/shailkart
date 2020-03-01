import React, {lazy, Suspense} from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
const LoginComponent = (lazy(() => (import ('./components/login/login'))));
const HomeComponent = (lazy(() => (import ('./components/home/home'))));
const Navbar = (lazy(() => (import ('./components/navbar/navbar'))));
const SignUpComponent = (lazy(() => (import ('./components/signup/signup'))));

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
                  <ToastContainer
                    position="top-right"
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick={false}
                    draggable={false}
                    rtl={false}/>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Switch>
                            <Route exact path="/login" component={LoginComponent}/>
                            <Route exact path="/signup" component={SignUpComponent}/>
                            <Route path='/' component={component}/>
                        </Switch>
                    </Suspense>
                </BrowserRouter>
            </div>
    );

}

export default App;