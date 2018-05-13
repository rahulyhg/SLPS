import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Urls from '../../core/Urls';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{

    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
        
    //     const ingredients = {};
    //     console.log(query.entries());
    //     let price = 0.0;
    //     for(let param of query.entries()){
    //         if (param[0] === 'price'){
    //             price = +param[1];
    //         }
    //         else 
    //         {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients : ingredients, price: price});
    // }
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(Urls.checkout + Urls.contactData);
    }

    render(){
        let summary = <Redirect to="/" />;
        if (this.props.ings){
            summary = (
                <div>
                <CheckoutSummary ingredients={this.props.ings} 
                    checkoutCancelled = {this.checkoutCancelHandler} 
                    checkoutContinue = {this.checkoutContinueHandler}
                >
                </CheckoutSummary>
                <Route path={this.props.match.path + Urls.contactData} 
                    component={ContactData}
                    /> 
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(Checkout);
