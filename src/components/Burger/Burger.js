import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import IngredientType from './IngredientType';

import classes from './Burger.css';

const burger = (props) => {
    return(
        <div className={classes.Burger} >
            <BurgerIngredient type={IngredientType.BREADTOP.description} />
            <BurgerIngredient type={IngredientType.CHEESE.description} />
            <BurgerIngredient type={IngredientType.MEAT.description} />
            <BurgerIngredient type={IngredientType.BREADBOTTOM.description} />
        </div>
    )
}

export default burger;