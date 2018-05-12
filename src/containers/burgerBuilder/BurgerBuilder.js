import React, {Component} from 'react';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import AuxWrapper from '../../hoc/AuxWrapper';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axious-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';
import Urls from '../../core/Urls';

class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
            showOrderNow: false,
            loading : false            
        };
        this.checkCanOrder.bind(this);
    }

    checkCanOrder(ingredients){
        const totalIngredients = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, next) => sum + next, 0);
        if (totalIngredients < 0){
            console.warn("No indgredients, can't order");
        }
        return totalIngredients > 0;
    }
    
    showOrderNowHandler = () => {
        this.setState({showOrderNow: true});
    }

    cancelOrderHandler = () => {
        this.setState({showOrderNow: false});
    }

    continueOrderHanlder = () => {
        this.props.history.push(Urls.checkout);
    }
    componentDidMount(){
        console.log('BurgerBuilder.js componentDidMount')
    }
    render(){
        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let summary = <Spinner />;
        if (!this.state.loading){
            summary = <OrderSummary ingredients={this.props.ings} 
            cancelOrder={this.cancelOrderHandler}
            price={this.props.price}
            continueOrder={this.continueOrderHanlder}/>;
        }
        return(
            <AuxWrapper>
                <Modal show={this.state.showOrderNow} loading={this.state.loading}>
                    {summary}
                </Modal>
                <Burger 
                    ingredients ={this.props.ings}
                     />
                <BuildControls 
                    price={this.props.price}
                    addIngredient={this.props.onAddIngredient}
                    removeIngredient={this.props.onRemoveIngredient}
                    disabledInfo={disabledInfo}
                    canOrder={this.checkCanOrder(this.props.ings)}
                    showOrder={this.showOrderNowHandler}
                    />
            </AuxWrapper>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        ings : state.ingredients,
        price : state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient : (ingName) => {
            dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName})
        },
        onRemoveIngredient : (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));