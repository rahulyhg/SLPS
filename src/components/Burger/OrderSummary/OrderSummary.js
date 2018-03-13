import React from 'react';
import AuxWrapper from '../../../hoc/AuxWrapper';

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
            <p>continue to checkout?</p>
        </AuxWrapper>        
    )
}

export default orderSummary;