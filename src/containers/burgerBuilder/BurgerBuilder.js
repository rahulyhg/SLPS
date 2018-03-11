import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
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
            totalPrice : 4.0            
        };
        this.addIngredientHandler.bind(this);
        this.removeIngredientHandler.bind(this);
    }

    addIngredientHandler = (type) => {
        const intialCount = this.state.ingredients[type];
        const updatedCount = intialCount + 1;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        this.setState({
            ingredients : updatedIngredients,
            totalPrice : updatedPrice
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
        this.setState({
            ingredients : updatedIngredients,
            totalPrice : updatedPrice
        });
    }
    
    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <AuxWrapper>
                <Burger 
                    ingredients ={this.state.ingredients}
                     />
                <BuildControls 
                    price={this.state.totalPrice}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    />
            </AuxWrapper>
        )
    }
}

export default BurgerBuilder;