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

const INGREDIENT_PRICE = {
    salad : 0.5,
    bacon : 0.4,
    meat : 1.4,
    cheese : 1
};

class BurgerBuilder extends Component {
    constructor(props){
        super(props);
        this.state = {
            totalPrice : 4.0,
            canOrder: false,
            showOrderNow: false,
            loading : false            
        };
        this.addIngredientHandler.bind(this);
        this.removeIngredientHandler.bind(this);
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

    addIngredientHandler = (type) => {
        const intialCount = this.state.ingredients[type];
        const updatedCount = intialCount + 1;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const canOrderValue = this.checkCanOrder(updatedIngredients);
        this.setState({
            ingredients : updatedIngredients,
            totalPrice : updatedPrice,
            canOrder : canOrderValue
        });
    }

    removeIngredientHandler = (type) => {
        const intialCount = this.state.ingredients[type];
        if (intialCount <= 0){
            return ;
        }
        const updatedCount = intialCount - 1;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const canOrderValue = this.checkCanOrder(updatedIngredients);
        this.setState({
            ingredients : updatedIngredients,
            totalPrice : updatedPrice,
            canOrder: canOrderValue
        });
    }
    
    showOrderNowHandler = () => {
        this.setState({showOrderNow: true});
    }

    cancelOrderHandler = () => {
        this.setState({showOrderNow: false});
    }

    continueOrderHanlder = () => {

        const queryParams = [];
        let param = `${encodeURIComponent('price')}=${encodeURIComponent(this.state.totalPrice)}`;
        queryParams.push(param);
        for(let i in this.state.ingredients){
                param = `${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`;
                queryParams.push(param);
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: Urls.checkout,
            search: `?${queryString}`
        });
    }
    componentDidMount(){
        console.log(this.props);
    }
    render(){
        console.log('render props.ings', this.props.ings);
        const disabledInfo = {...this.props.ings};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let summary = <Spinner />;
        if (!this.state.loading){
            summary = <OrderSummary ingredients={this.props.ings} 
            cancelOrder={this.cancelOrderHandler}
            price={this.state.totalPrice}
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
                    price={this.state.totalPrice}
                    addIngredient={this.props.onAddIngredient}
                    removeIngredient={this.props.onRemoveIngredient}
                    disabledInfo={disabledInfo}
                    canOrder={this.state.canOrder}
                    showOrder={this.showOrderNowHandler}
                    />
            </AuxWrapper>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        ings : state.ingredients
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