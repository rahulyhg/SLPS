import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';
import Urls from '../../core/Urls';

describe('auth reducer', ()=> {
    const initialState = {
        token : null,
        error : null, 
        userId : null,
        loading : false,
        authRedirectPath : Urls.base
    };

    it('shold return initialtate when it is undefined.', ()=>{
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store token upon login.', ()=> {
        const updatedState = reducer(initialState, {type:actionTypes.AUTH_SUCCESS, idToken:'token', userId: 'userid'});
        
        expect(updatedState.userId).toEqual('userid');
        expect(updatedState.token).toEqual('token');
    });
});