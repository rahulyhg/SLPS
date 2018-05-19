import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';
import IngredientTypes from '../../Burger/IngredientType';

const controls = [
    {label: 'Salad', type: IngredientTypes.SALAD.description},
    {label: 'Bacon', type: IngredientTypes.BACON.description},
    {label: 'Meat', type: IngredientTypes.MEAT.description},
    {label: 'Cheese', type: IngredientTypes.CHEESE.description},
]

const buildControls = (props) => {
    const transformedControls = controls.map(c => {
        return <BuildControl label={c.label} key={c.label} 
            added={()=> props.addIngredient(c.type)} 
            removed={() => props.removeIngredient(c.type)} 
            isDisable={props.disabledInfo[c.type]}/>
    });
    const orderCaption = props.isAuthenticated ? 'ORDER NOW' : 'SING IN TO ORDER';
    return (
        <div className={classes.BuildControls} >
            <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
            {transformedControls}
            <button className={classes.OrderButton}
                onClick={props.showOrder}
                disabled={!props.canOrder}>{orderCaption}</button>
        </div>
    )
}

export default buildControls;