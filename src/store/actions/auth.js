import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const authenticate = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email : email, 
            password: password,
            returnSecureToken : true
        };
        const url = isSignUp ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDPFnJ79THW0wVklIRALLkARibI5WlmkcE'
            : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDPFnJ79THW0wVklIRALLkARibI5WlmkcE';
            
        axios.post(url,
        authData)
        .then(res => {
            console.log(res.data);
            dispatch(authSuccess(res.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(authFailed(error));
        });
    }
}
