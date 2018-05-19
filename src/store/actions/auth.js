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
        idToken: authData.idToken,
        userId: authData.localId
    };
};

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}
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
            dispatch(checkAuthTimeOut(+res.data.expiresIn));
            dispatch(authSuccess(res.data));
        })
        .catch(error => {
            dispatch(authFailed(error.response.data.error));
        });
    }
}
