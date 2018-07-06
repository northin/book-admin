import {common_api} from "./../../api/index.js"
export let DICT = "DICT"
// export let CHECK_PASS = "CHECK_PASS" 
//字典
export const dict = (params) => async (dispatch) => {
    try {
        let response = await common_api.dict(params)
        await dispatch(getDict(response.data,params))
        // return response.data
    } catch (error) {
        console.log('error: ', error)
    }
}
export function getDict(data,params){
    return {type:DICT,data,params}
}
//短信校验
export const checkPass = (params) => async (dispatch) => {
    try {
        let response = await common_api.checkPass(params)
        // await dispatch(getDict(response.data,params))
        return response.data
    } catch (error) {
        console.log('error: ', error)
    }
}
// export function getCheckPass(data,params){
//     return {type:CHECK_PASS,data,params}
// }