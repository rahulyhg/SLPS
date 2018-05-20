import React, {Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axious-orders';

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render(){
        const orders = this.props.loading ? <Spinner /> : (
            this.props.orders.map(order => <Order key={order.id} 
                ingredients={order.ingredients} 
                price={+order.price} />)
        );

       return (           
           <div>
               {
                   orders
               }
           </div>
       ); 
    }
}

const mapStateToProps = state => {
    return {
        loading : state.orders.loading,
        orders : state.orders.orders,
        token : state.auth.token,
        userId : state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));