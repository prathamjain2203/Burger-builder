import * as actionTypes from "./actionTypes";
import axios from "axios";


export const authStart = ()=> {
    return {
        type:actionTypes.AUTH_START
    }
}
export const authSuccess = (authData)=> {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData : authData
    }
}
export const authFail = (error)=> {
    return {
        type    : actionTypes.AUTH_FAIL,
        error : error
    }
}

export const logout = ()=> {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime)=> {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime *1000);
    }
}

export const auth = (email,password,isSignUp)=> {
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLN0Ab4c1h5YjWsSx60_Grx_gAfPTfUls'
if(!isSignUp){
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLN0Ab4c1h5YjWsSx60_Grx_gAfPTfUls'
}

        axios.post(url, authData)
        .then(res=>{
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn*1000)
           console.log(expirationDate)
            localStorage.setItem('token', res.data.idToken);
           localStorage.setItem('expirationDate', expirationDate);
           localStorage.setItem('userId', res.data.localId);

            dispatch(authSuccess(res.data))
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch(error=>{
            dispatch(authFail(error.response.data.error))
        })
    }
}

export const checkAuthStatus = ()=> {
    return dispatch => {
const token= localStorage.getItem('token');
if(!token){
    dispatch(logout());
}
else{
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if(expirationDate > new Date()){
        const userId = localStorage.getItem('userId');
        const authData = {
            token : token,
            localId : userId
        }
dispatch(authSuccess(authData));
dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
    }
    else{
        dispatch(logout())
    }
}
    }
}