import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import IngredientType from './IngredientType';

import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients)
        .map(igKey => {
            let a = [...Array(props.ingredients[igKey])];
            return a.map((_, i) => {
                        return <BurgerIngredient key={igKey + i} type={igKey} />;
                });
        })
        .reduce((arr, el)=> {
            return arr.concat(el);
        }, []);
        if (transformedIngredient.length === 0)
        {
            transformedIngredient = <p>Please start adding ingredients!</p>;
        }
    return(
        <div className={classes.Burger} >
            <BurgerIngredient type={IngredientType.BREADTOP.description} />
            {transformedIngredient}
            <BurgerIngredient type={IngredientType.BREADBOTTOM.description} />
        </div>
    )
}

export default burger;