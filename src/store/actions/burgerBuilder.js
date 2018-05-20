import * as actionTypes from './actionTypes';
import axios from '../../axious-orders';

export const addIngredient = (ingName) => {
    return {type: actionTypes.ADD_INGREDIENT, ingredientName: ingName};
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    };
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    };
}

const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED,
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json')
        .then(res => {
            dispatch(setIngredients(res.data));
        })
        .catch(error => {
            dispatch(fetchIngredientFailed());
        });
    }
};