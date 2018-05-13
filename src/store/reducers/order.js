import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading : false,
    error : ''
}

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case actionTypes.BURGER_ORDER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.BURGER_ORDER_SUCCESS:
            const newOrder = {...action.orderData, id : action.orderId};
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.BURGER_ORDER_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
}

export default reducer;