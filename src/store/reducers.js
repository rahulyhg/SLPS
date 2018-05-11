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

const reducer = (state = initialState, action) => {
    console.log('reducer, ', action, state, action.ingredientName);
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            console.log('Add ingredient action');
            const t = {
                ...state,
                ingredients : {
                    ...state.ingredients,
                }
            };
            t.ingredients[action.ingredientName] = t.ingredients[action.ingredientName] + 1;
            return t;
        case actionTypes.REMOVE_INGREDIENT:
            const t1 = {
                ...state,
                ingredients : {
                    ...state.ingredients,
                }
            };
            t1.ingredients[action.ingredientName] = t1.ingredients[action.ingredientName] - 1;
            return t1;
    }
    return state;
};

export default reducer;