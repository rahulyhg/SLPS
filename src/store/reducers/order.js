import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../Utility/utility';

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
            return updateObject(state, {orderPlaced: false});
        case actionTypes.BURGER_ORDER_START:
            return updateObject(state, {loading: true});
        case actionTypes.BURGER_ORDER_SUCCESS:
            const newOrder = updateObject(action.orderData, {id : action.orderId});
            return updateObject(state, {orderPlaced : true, orders: state.orders.concat(newOrder)});
        case actionTypes.BURGER_ORDER_FAILED:
            return updateObject(state, {loading: false, error: true});

        case actionTypes.FETCH_ORDER_INIT:
            return updateObject(state, {loading: true});
        case actionTypes.FETCH_ORDER_SUCCESS: 
            return updateObject(state, {loading: false, orders: action.orders});
        case actionTypes.FETCH_ORDER_FAILED:
            return updateObject(state, {loading: false});
        default:
            return state;
    }
}

export default reducer;