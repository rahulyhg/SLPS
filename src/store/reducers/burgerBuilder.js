import * as actionTypes from '../actions/actionTypes';
import reduxThunk from 'redux-thunk';
import {updateObject} from '../../core/Utility/utility';

const initialState = {
    ingredients : null,
    totalPrice : 4,
    error: false
};

const INGREDIENT_PRICE = {
    salad : 0.5,
    bacon : 0.4,
    meat : 1.4,
    cheese : 1
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return updateObject(state, {error: true});
        case actionTypes.SET_INGREDIENT: return setIngredient(state, action);
    }
    return state;
};

const addIngredient = (state, action) => {
    const updatedState = updateObject(state, {totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName]});
    updatedState.ingredients[action.ingredientName] = updatedState.ingredients[action.ingredientName] + 1;
    return updatedState;
}

const removeIngredient = (state, action) => {
    const updatedState = updateObject(state, {totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName]});
    updatedState.ingredients[action.ingredientName] = updatedState.ingredients[action.ingredientName] - 1;
    return updatedState;
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        error: false,
        ingredients : action.ingredients,
        totalPrice : 4
    });
}
export default reducer;