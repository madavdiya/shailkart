import Cookies from 'universal-cookie';
const Cookie = new Cookies();

const initialState = {
    addToCartItem: isNaN(+Cookie.get('totalCartItem')) ? 0 : +Cookie.get('totalCartItem'),
    cartItems: Cookie.get('cartItems') ? Cookie.get('cartItems'): {}
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                addToCartItem: state.addToCartItem + 1,
            }
        case 'DECREMENT':
            return {
                ...state,
                addToCartItem: state.addToCartItem -1,
            }
        case 'SET_CART_ITEMS':
            return {
                ...state,
                cartItems: action.payload,
                addToCartItem: action.cartItemsReset ? 0: state.addToCartItem
            }
        case 'TOTAL_CART_ITEM':
            return {
                ...state,
                addToCartItem: action.value
            }
        default:
            return {
                ...state
            }
    }
}
export default cartReducer;