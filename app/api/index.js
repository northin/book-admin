import axios from 'axios'
import Immutable from 'immutable';
//BASE_URL是默认的url地址，如果你安装了webpack，可以在webpack配置全局变量
// axios.defaults.baseURL = BASE_URL;
/*
如果没有安装webpack，就使用下面这种写法

*/
axios.defaults.baseURL = "http://127.0.0.1:3000"
//token配置，拦截等



const getData = (url, param) => {
    return (
        Immutable.fromJS(axios.get(`${url}`) || {})
    )
}

const postData = (url, param) => {
    return (
        Immutable.fromJS(axios.post(`${url}`, param) || {})
    )
}

class AUTH_API{
    async UserQueryAll(){
        try {
            let response = await postData(`/cat`)
            return response
        } catch (error) {
            console.log('error: ', error)
        }
    }
    async IsLogin(){
        try {
            let response = await getData(`/user/isLogin`)
            return response
        } catch (error) {
            console.log('error: ', error)
        } 
    }
    async Login(){
        try {
            return await getData(`/user/login`)
        } catch (error) {
            console.log('error: ', error)
        } 
    }
    async Logout(){
        try {
            return await getData(`/user/logout`)
        } catch (error) {
            console.log('error: ', error)
        } 
    }
    async Register(){
        try {
            return await getData(`/user/register`)
        } catch (error) {
            console.log('error: ', error)
        } 
    }
}


class COMMON_API  {
    async dict(params){
        try {
            return await getData(`/user/dict?ddId=${params}`)
        } catch (error) {
            console.log('error: ', error)
        } 
    }
    async checkPass(params){
        try {
            return await getData(`/user/check`)
        } catch (error) {
            console.log('error: ', error)
        } 
    }
}

export let auth_api = new AUTH_API()
export let common_api = new COMMON_API()