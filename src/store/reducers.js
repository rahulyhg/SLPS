import * as actionTypes from './actions';

const initialState = {
    ingredients : {
        salad : 0,
        bacon : 0, 
        cheese : 0, 
        meat : 0
    },
    totalPrice : 4
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
    }
    return state;
};

export default reducer;