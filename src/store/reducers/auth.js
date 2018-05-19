import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../Utility/utility';

const initialState = {
    token : null,
    error : null, 
    userId : null,
    loading : false
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false, 
        userId: action.userId,
        token: action.idToken
    });
}

const authFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const logout = (state, action) => {
    return updateObject(state, {
        userId : null,
        token: null
    })
}
const authReducer = (state = initialState, action) => { 
    switch(action.type){
        case actionTypes.AUTH_START: 
            return updateObject(state, {loading: true, error: null});
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return logout(state, action);
        default: return state;
    }
}

export default authReducer;