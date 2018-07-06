import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    userQueryAll
} from "@redux/action/action.js"
import { Table, Icon, Divider,DatePicker  } from 'antd';
import MyTitle from '@comp/myTitle.js'
import BaseComponment from "@comp/BaseComponment.js"
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
class FundQry extends BaseComponment{

    constructor(props){
        super(props)
    }
    componentWillMount() {
        this.props.userQueryAll() //发送get请求
        console.log(this.util)
    }
    onChange = (date, dateString) =>  {
        console.log(date, dateString);
      }
      
    render(){
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
          }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            render: text => <div>{this.util.toMoney(text)}</div>
          }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          }];
          
          const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
          }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
          }];
        return (
            <div>
                <MyTitle title="充提流水查询" />
                <RangePicker onChange={this.onChange} />
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

FundQry.propTypes = {
    // users: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         // name: PropTypes.string.isRequired,
    //         // age: PropTypes.number.isRequired,
    //     }).isRequired
    // ).isRequired,
    userQueryAll: PropTypes.func.isRequired
}
const mapStateToProps  = state => {
    return {
        // users : state.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        userQueryAll: () => {
            dispatch(userQueryAll())
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FundQry)