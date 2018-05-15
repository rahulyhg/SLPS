import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading : false,
    error : '',
    orderPlaced : false
}

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case actionTypes.ORDER_INIT: 
            return {
                ...state,
                orderPlaced: false
            };
        case actionTypes.BURGER_ORDER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.BURGER_ORDER_SUCCESS:
            const newOrder = {...action.orderData, id : action.orderId};
            return {
                ...state,
                orderPlaced : true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.BURGER_ORDER_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            };
        case actionTypes.FETCH_ORDER_INIT:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDER_SUCCESS: 
            return {
                ...state,
                loading: false,
                orders: action.orders
            };
            case actionTypes.FETCH_ORDER_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;