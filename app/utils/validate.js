import reg from "./reg.js"
export const valide =  {
    phone:function(str){
        return reg.phone.key.test(str)?null:reg.phone.message
    }

}