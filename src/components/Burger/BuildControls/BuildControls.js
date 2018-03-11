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
    console.log(props.disabledInfo);
    const transformedControls = controls.map(c => {
        return <BuildControl label={c.label} key={c.label} 
            added={()=> props.addIngredient(c.type)} 
            removed={() => props.removeIngredient(c.type)} 
            isDisable={props.disabledInfo[c.type]}/>
    })
    return (
        <div className={classes.BuildControls} >
            {transformedControls}
        </div>
    )
}

export default buildControls;