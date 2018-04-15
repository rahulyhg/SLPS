import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Urls from '../../core/Urls';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients : {
        }
    }
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        
        const ingredients = {};
        console.log(query.entries());
        for(let param of query.entries()){
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients : ingredients});
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace(Urls.checkout + Urls.contactData);
    }

    render(){
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} 
                    checkoutCancelled = {this.checkoutCancelHandler} 
                    checkoutContinue = {this.checkoutContinueHandler}
                >
                </CheckoutSummary>
                <Route path={this.props.match.path + Urls.contactData} component={ContactData} /> 
            </div>
        );
    }
}

export default Checkout;