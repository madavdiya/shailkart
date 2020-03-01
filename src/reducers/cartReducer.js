import Cookies from 'universal-cookie';
const Cookie = new Cookies();

const initialState = {
    addToCartItem: isNaN(+Cookie.get('totalCartItem')) ? 0 : +Cookie.get('totalCartItem')
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
        default:
            return {
                ...state
            }
    }
}
export default cartReducer;