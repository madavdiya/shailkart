import React, {Component} from 'react';
import './cart.scss';
import Cookies from 'universal-cookie';
import axios from '../../services/axios';
import {environment} from '../../environment';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Cookie = new Cookies();

class Cart extends Component {
    state = {
        totalPrice: 0,
        totalCount: 0
    }

    static getDerivedStateFromProps(props, state) {
        console.log({props, state});
        let totalPrice = 0;
        let totalCount = 0;
        props
            .cartItems
            .forEach(item => {
                totalPrice += item.price * item.count;
                totalCount += item.count;
            });
        return {
            ...state,
            totalPrice,
            totalCount
        }
    }

    componentDidMount() {
        let totalPrice = 0;
        let totalCount = 0;
        this
            .props
            .cartItems
            .forEach(item => {
                totalPrice += item.price * item.count;
                totalCount += item.count;
            });
        this.setState({totalPrice, totalCount});
    }

    proceedToCheckout = (e) => {
        e.preventDefault();
        const self = this;
        const paymentAmount = self.state.totalPrice*100;
        const options = {
            key: environment.RAZOR_PAY_TEST_KEY,
            amount: paymentAmount,
            name: 'Payments',
            description: 'Keep shopping with us',

            handler(response) {
                const paymentId = response.razorpay_payment_id;
                const url = `${environment.baseUrl}/api/payment/savePayment/${paymentId}`
                axios.post(url, {itemsBought: self.props.cartItems})
                .then(() => {
                    self.props.SetCartItems({});
                    self.props.setTotalCartItem(0);
                    toast.success("Payment done successfully.. Enjoy!!!", {position: toast.POSITION.BOTTOM_RIGHT});
                }).catch(err => {
                    console.log(err);
                     toast.error('Something went wrong :(', {position: toast.POSITION.BOTTOM_RIGHT});
                })
            },
            theme: {
                color: '#f7f04e'
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    render() {
        return (
            <div className="child-container cart-container">
                <div className="cart-box">
                    <div className="cart-list-box">
                        <div className="cart-text">Cart</div>
                        <div className="cart-lists">
                            {this.props.cartItems.length
                                ? this
                                    .props
                                    .cartItems
                                    .map((cart, index) => {
                                        return <div className="cart-list" key={index}>
                                            <div
                                                className="cart-image"
                                                style={{
                                                backgroundImage: `url(${cart.image})`
                                            }}></div>
                                            <div className="cart-name">{cart.name}</div>
                                            <div className="cart-price">{cart.price}
                                                ₹</div>
                                            <div className="cart-quantity">
                                                <span
                                                    className="cart-minus"
                                                    onClick={() => cart.count === 1
                                                    ? ''
                                                    : this.props.removeFromCart(cart)}>
                                                    <i
                                                        className={`fa fa-minus ${cart.count === 1
                                                        ? 'disabled'
                                                        : ''}`}></i>
                                                </span>
                                                <span className="quantity">{cart.count}</span>
                                                <span className="cart-plus" onClick={() => this.props.addToCart(cart)}>
                                                    <i className="fa fa-plus"></i>
                                                </span>
                                            </div>
                                            <div className="cart-remove"></div>
                                        </div>

                                    })
                                : <div>No cart Added, go back to shopping</div>}
                        </div>
                    </div>
                    <div className="checkout-box">
                        <div className="summary">Order Summary</div>
                        <div className="order-detail">
                            <table>
                                <tbody>
                                    <tr className="item-desc">
                                        <td>{this.state.totalCount}
                                            &nbsp; Items</td>
                                        <td>{this.state.totalPrice}&nbsp; ₹</td>
                                    </tr>
                                    <tr className="item-desc">
                                        <td>
                                            Delivery fee</td>
                                        <td>{0}&nbsp; ₹</td>
                                    </tr>
                                    <tr className="item-desc-final">
                                        <td>Total Cost</td>
                                        <td>{this.state.totalPrice}&nbsp; ₹</td>
                                    </tr>
                                </tbody>

                            </table>
                            <div className="checkout-btn">
                                <button className={`btn ${!this.state.totalCount?'disabled-checkout' : ''}`} onClick={this.state.totalCount ? this.proceedToCheckout: (() => {})()}>Proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let cartList = [];
    Object
        .keys(state.cartItems)
        .forEach(key => {
            cartList.push(state.cartItems[key]);
        });
    return {cartItems: cartList, calculateTotal: 0}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (list) => {
            let cartItems = Cookie.get('cartItems');
            if (cartItems.hasOwnProperty(list._id)) {
                cartItems[list._id].count = cartItems[list._id].count + 1;
            }
            Cookie.set('cartItems', cartItems);
            Cookie.set('totalCartItem', (parseInt(Cookie.get('totalCartItem')) + 1))
            // fetchCartList();
            dispatch({type: 'INCREMENT'})
            dispatch({type: 'SET_CART_ITEMS', payload: cartItems})
        },
        removeFromCart: (list) => {
            let totalCartItem = parseInt(Cookie.get('totalCartItem')) - 1;
            let cartItems = Cookie.get('cartItems');
            if (cartItems.hasOwnProperty(list._id)) {
                let count = cartItems[list._id].count - 1;
                console.log(count);
                if (1 <= count) {
                    cartItems[list._id].count = cartItems[list._id].count - 1;
                    Cookie.set('cartItems', cartItems);
                    Cookie.set('totalCartItem', totalCartItem);
                    dispatch({type: 'DECREMENT'});
                    dispatch({type: 'SET_CART_ITEMS', payload: cartItems});
                }
            }
        },
        SetCartItems: (list) => {
            console.log('SetCartItemsSetCartItemsSetCartItems');
            dispatch({type: 'SET_CART_ITEMS', payload: list});
        },
        setTotalCartItem: (value) => {
            console.log('SetCartItemsdsadasdadadas dadas dadas ddasdas')
            dispatch({type: 'TOTAL_CART_ITEM', value})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
