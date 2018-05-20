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

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT,
        path: path
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
            setTokenToLocalStorage(res.data);
            dispatch(authSuccess(res.data));
        })
        .catch(error => {
            dispatch(authFailed(error.response.data.error));
        });
    }
}

const setTokenToLocalStorage = (authData)=> {
    localStorage.setItem('token', authData.idToken);
    const expirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', authData.localId);
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            if (expirationDate > new Date()){
                dispatch(authSuccess({idToken: token, localId: userId}));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000));
            }
            else {
                dispatch(logout());
            }
        }
    }
}