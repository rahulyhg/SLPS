import * as actionTypes from '../actions/actionTypes';
import reduxThunk from 'redux-thunk';

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
        case actionTypes.ADD_INGREDIENT:
            const t = {
                ...state,
                ingredients : {
                    ...state.ingredients,
                },
                totalPrice : state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
            t.ingredients[action.ingredientName] = t.ingredients[action.ingredientName] + 1;
            return t;
        case actionTypes.REMOVE_INGREDIENT:
            const t1 = {
                ...state,
                ingredients : {
                    ...state.ingredients,
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };
            t1.ingredients[action.ingredientName] = t1.ingredients[action.ingredientName] - 1;
            return t1;
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            }
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                error: false,
                ingredients : action.ingredients
            }
    }
    return state;
};

export default reducer;