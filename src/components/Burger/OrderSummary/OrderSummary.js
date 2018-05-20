import React, {Component} from 'react';
import AuxWrapper from '../../../hoc/AuxWrapper';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

    componentWillUpdate(nextProps, nextState, nextContext){
    }
    
    render(){
        const orderIngredients = Object.keys(this.props.ingredients)
        .map((igKey) => {
            return <li key={igKey}>
                <span style={{textTranform:'capitalize'}}>{igKey}</span> :{this.props.ingredients[igKey]}
                </li>
            });
    return (
        <AuxWrapper>
            <p>Your order summary</p>
            <p>delicious burger with following ingredients</p>
            <ul>
                {orderIngredients}
            </ul>
            <p><strong>price: {this.props.price.toFixed(2)}</strong></p>
            <p>continue to checkout?</p>
            <Button btnType={"Danger"} clicked={this.props.cancelOrder}>CANCEL</Button>
            <Button btnType={"Success"} clicked={this.props.continueOrder} >CONTINUE</Button>
        </AuxWrapper>        
    )}
}

export default OrderSummary;