import { 
    LOGIN,
    LOGIN_OUT,
    IS_LOGIN,
    userIsLogin
} from "./../action/authAction.js"
// import { combineReducers } from 'redux'
import Immutable from 'immutable';
import {combineReducers} from 'redux-immutable';
import "@util/util.js"
// const initialState = ;
const initialState = Immutable.fromJS({
    isAuth:true,
});

function auth(state=initialState,action){
    switch(action.type){
        case LOGIN:
            if(action.data.errorCode){
                return state.set("isAuth",false)
            }else{
                return state.set("isAuth",true)
            }
        case LOGIN_OUT:
            if(action.data.errorCode){
                return state.set("isAuth",true)
            }else{
                return state.set("isAuth",false)
            }
        case IS_LOGIN:
            if(action.data.errorCode){
                return state.set("isAuth",false)
            }else{
                return state.set("isAuth",true)
            }
        default:
            return state 
    }
}




export default auth