import * as actionTypes from './actionTypes';
import axios from '../../axious-orders';

const sendOrderSuccess = (id, orderData) => {
    return {
        type: actionTypes.BURGER_ORDER_SUCCESS, 
        orderId : id,
        orderData : orderData
    };
};

const sendOrderFailed = (error) => {
    return {
        type: actionTypes.BURGER_ORDER_FAILED,
        error: error
    };
};

const sendOrderStart = () => {
    return {
        type: actionTypes.BURGER_ORDER_START
    };
}
export const sendBurgerOrder = (orderData) => {
    return dispatch => {
        dispatch(sendOrderStart());
        axios.post('/orders.json', orderData)
        .then(response => 
            {
                dispatch(sendOrderSuccess(response.data.id, orderData))
                // this.setState({loading:false});
                // this.props.history.push("/");
            })
        .catch(error =>{
            dispatch(sendOrderFailed(error));
            // this.setState({loading:false});
            // console.log(error);
        });
    }
}