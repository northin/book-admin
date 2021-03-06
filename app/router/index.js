import React, { Component } from 'react';
import {Switch,Router, Route, } from "react-router"
import { Redirect,BrowserRouter,Link } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import lazyLoad from './lazyLoad';
import {IntlProvider, addLocaleData} from 'react-intl';
// import App from "@view/App.js"
// import Login from '@view/auth/Login'
// import Register from '@view/auth/Register'
import todoApp from "@redux/reducers/reducers.js"
import { isLogin } from "@redux/action/authAction.js"
import MyHeader from "@comp/MyHeader.js"
// import FindPass from '../view/auth/FindPass';
// import zhCN from '.././local/zh-CN.js';    //导入 i18n 配置文件
// import enUS from '.././local/en-US.js';
// import en from 'react-intl/locale-data/en';
// import zh from 'react-intl/locale-data/zh';
// addLocaleData([...en, ...zh]);
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/src/locale/zh-cn';
const Login = lazyLoad(() => import('@view/auth/Login'));
const FindPass = lazyLoad(() => import('@view/auth/FindPass'));
const Register = lazyLoad(() => import('@view/auth/Register'));
const App = lazyLoad(() => import('./App'));

const logger = store => next => action => {
    console.log('dispatching11111', action)
    let result = next(action)
    console.log('next state11111', store.getState().toJS())
    return result
}

const loggerMiddleware = createLogger()
function configureStore(preloadedState) {
    return createStore(
      todoApp,
      preloadedState,
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        logger
      )
    )
}
let store =  configureStore()

class ProtectPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            ispass:''
        }
    }
    componentWillMount() {
        this.request()
     
    }
    async request(){
        const pass = await store.dispatch(isLogin())
        if(!store.getState().getIn(['auth',"isAuth"])){
            this.setState({
                ispass:true
            }) 
        }else{
            this.setState({
                ispass:false
            }) 
        }
        // return 
    }
    render(){
        return (
            <div>
                
                {
                     (this.state.ispass)?(
                        <Redirect to='/login'></Redirect>
                    ):(
                        <App {...this.props}/>   
                    )
                }
            </div>
        )
    }

}
// const ProtectPage = (props) => {
//     // 如果没有登录
//     // dispatch(isLogin())
//     store.dispatch(isLogin())
//     if (!store.getState().getIn(['login',"isAuth"])) {
//         return <Redirect to='/login'></Redirect>
//     } else {
//         return <App {...props}/>
//     }

    
// }

class MyRouter extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <LocaleProvider locale={zh_CN}>
                <Provider store={store} >
                    <BrowserRouter>
                        
                        <div>
                            <MyHeader></MyHeader>
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/app" component={ProtectPage} />
                            <Route path="/findPass" component={FindPass} />
                        </div>
                    </BrowserRouter>
                
                </Provider>
            </LocaleProvider>
        )
    }
}



export default MyRouter