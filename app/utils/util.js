import validate from './validate.js'
import dateApi from "./dateApi.js"
Array.prototype.removeIndex = function(num){
    let pos = this.indexOf(num)
    return this.splice(pos,1)
}
/** 
 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。 
 *  
 * @param num1加数1 | num2加数2 
 */  
function numAdd(num1, num2) {  
    var baseNum, baseNum1, baseNum2;  
    try {  
        baseNum1 = num1.toString().split(".")[1].length;  
    } catch (e) {  
        baseNum1 = 0;  
    }  
    try {  
        baseNum2 = num2.toString().split(".")[1].length;  
    } catch (e) {  
        baseNum2 = 0;  
    }  
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));  
    return (num1 * baseNum + num2 * baseNum) / baseNum;  
};  
Number.prototype.add = function (arg) {  
    return numAdd(arg, this);  
};  
/** 
 * 减法运算，避免数据相减小数点后产生多位数和计算精度损失。 
 *  
 * @param num1被减数  |  num2减数 
 */  
function numSub(num1, num2) {  
    var baseNum, baseNum1, baseNum2;  
    var precision;// 精度  
    try {  
        baseNum1 = num1.toString().split(".")[1].length;  
    } catch (e) {  
        baseNum1 = 0;  
    }  
    try {  
        baseNum2 = num2.toString().split(".")[1].length;  
    } catch (e) {  
        baseNum2 = 0;  
    }  
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));  
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;  
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);  
};  
Number.prototype.sub = function (arg) {  
    return numSub(this, arg);  
};  
/** 
 * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。 
 *  
 * @param num1被乘数 | num2乘数 
 */  
function numMulti(num1, num2) {  
    var baseNum = 0;  
    try {  
        baseNum += num1.toString().split(".")[1].length;  
    } catch (e) {  
    }  
    try {  
        baseNum += num2.toString().split(".")[1].length;  
    } catch (e) {  
    }  
    return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);  
};  
Number.prototype.mul = function (arg) {  
    return numMulti(this, arg);  
};  
/** 
 * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。 
 *  
 * @param num1被除数 | num2除数 
 */  
function numDiv(num1, num2) {  
    var baseNum1 = 0, baseNum2 = 0;  
    var baseNum3, baseNum4;  
    try {  
        baseNum1 = num1.toString().split(".")[1].length;  
    } catch (e) {  
        baseNum1 = 0;  
    }  
    try {  
        baseNum2 = num2.toString().split(".")[1].length;  
    } catch (e) {  
        baseNum2 = 0;  
    }  
    // with (Math) {  
        baseNum3 = Number(num1.toString().replace(".", ""));  
        baseNum4 = Number(num2.toString().replace(".", ""));  
        return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);  
    // }  
};  

Number.prototype.div = function (arg) {  
    return numDiv(this, arg);  
};  

class MoneyFun{
    toMoney = (num) => {
        num = num.toFixed(2);
        num = parseFloat(num)
        num = num.toLocaleString();
        let pos = num.indexOf(".");
        if(pos === -1){
            num += '.00'
        }else if(num.split("."[1].length === 1)){
            num += '0'
        }
        return num;
    }
    toRmb = (num) => {
        return '￥ ' + this.toMoney(num)
    }
}

export default {
    valide:validate,
    MoneyFun:new MoneyFun(),
    dateApi:dateApi
}