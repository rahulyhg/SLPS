import React from 'react';
import AuxWrapper from '../../../hoc/AuxWrapper';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const orderIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return <li key={igKey}>
                <span style={{textTranform:'capitalize'}}>{igKey}</span> :{props.ingredients[igKey]}
                </li>
            });
    return (
        <AuxWrapper>
            <p>Your order summary</p>
            <p>delicious burger with following ingredients</p>
            <ul>
                {orderIngredients}
            </ul>
            <p><strong>price: {props.price.toFixed(2)}</strong></p>
            <p>continue to checkout?</p>
            <Button btnType="Danger" clicked={props.cancelOrder}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueOrder} >CONTINUE</Button>
        </AuxWrapper>        
    )
}

export default orderSummary;