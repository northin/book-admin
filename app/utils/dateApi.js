import moment from "moment"
class DateApi {
    //时间戳 =》 2016-02-01 00:00:01
    UnixToTime(dateStr){
        if(dateStr.length == 14){   //20160201000000
            return dateStr.slice(0,4) + "-" + dateStr.slice(4,6) + "-"+dateStr.slice(6,8)+ " " + dateStr.slice(8,10) +":"+ dateStr.slice(10,12)+":"+dateStr.slice(12,14)
        }
        return moment(dateStr).format("YYYY-MM-DD HH:mm:ss")
    }
    //时间戳 =》 2016-02-01
    UnixToDate(dateStr){
        if(dateStr.length == 8){ //20160201
            return dateStr.slice(0,4) + "-" + dateStr.slice(4,6) + "-" + dateStr.slice(6,8)
        }
        return moment(dateStr).format("YYYY-MM-DD")
    }

}

export default new DateApi()