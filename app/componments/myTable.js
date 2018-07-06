import { Table, Pagination } from 'antd';
import React, { Component } from 'react';
import MyRangeDate from './myRangeDate';
import BaseComponent from "@comp/BaseComponment.js"
import config from "@config"
class MyTable extends BaseComponent {
  constructor(props){
      super(props)
      this.state = {
          loading:false,
          start : '',
          end : ''
      }
  }
  componentDidMount(){
    // this.props.onRef(this)
  }
  startDateChange = (value,mode) => {
    this.setState({
        startDate:mode
    })
  }
  endDateChange = (value,mode) => {
    this.setState({
        endDate:mode
    })
  }
  getDate = () => {
      this.props.onBtn(this.state.startDate,this.state.endDate)
  }
  render() {
    // const title = this.props.title
    const that = this
    return (
      <div className="myTable">
        <MyRangeDate onBtn={(start,end)=>this.dateQry(start,end)} />
        <Table
            columns={this.props.columns}
            dataSource={this.props.data}
            pagination={{
                total:this.props.data.length,
                pageSize:config.pageSize,
                onChange(current){
                    that.gotoCurrent(current,5)
                },
                showSizeChanger:true,
                showTotal: () => ("共" + this.props.data.length + '条数据')
            }}
            loading={that.state.loading}/>
      </div>
    );
  }
}

export default MyTable