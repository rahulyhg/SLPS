import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IngredientType from '../IngredientType';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {

    render(){
        let ingredient = null;
        console.log('ingredient being added', this.props.type);
        switch(this.props.type){
            case (IngredientType.BREADBOTTOM.description):
                ingredient = <div className={classes.BreadBottom} />
                break;
            case (IngredientType.BREADTOP.description):
                ingredient = <div className={classes.BreadTop}>
                                <div className={classes.Seeds1} />
                                <div className={classes.Seeds2} />
                            </div>
                break;
            case (IngredientType.MEAT.description):
                ingredient = <div className={classes.Meat} />
                break;
            case(IngredientType.CHEESE.description):
                ingredient = <div className={classes.Cheese} />
                break;
            case (IngredientType.SALAD.description):
                ingredient = <div className={classes.Salad} />
                break;
            case (IngredientType.BACON.description):
                ingredient = <div className={classes.Bacon} />
                break;
        }
        return(ingredient);
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}
export default BurgerIngredient;
