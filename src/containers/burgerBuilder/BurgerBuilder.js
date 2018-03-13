import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import AuxWrapper from '../../hoc/AuxWrapper';

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
            ingredients : {
                salad : 0,
                bacon : 0, 
                cheese : 0, 
                meat : 0
            },
            totalPrice : 4.0,
            canOrder: false,
            showOrderNow: false            
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

    continueOrderHanlder = () => alert('Order continued...');

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <AuxWrapper>
                <Modal show={this.state.showOrderNow}>
                    <OrderSummary ingredients={this.state.ingredients} 
                        cancelOrder={this.cancelOrderHandler}
                        price={this.state.totalPrice}
                        continueOrder={this.continueOrderHanlder}/>
                </Modal>
                <Burger 
                    ingredients ={this.state.ingredients}
                     />
                <BuildControls 
                    price={this.state.totalPrice}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    canOrder={this.state.canOrder}
                    showOrder={this.showOrderNowHandler}
                    />
            </AuxWrapper>
        )
    }
}

export default BurgerBuilder;