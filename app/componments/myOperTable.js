import { Button,Icon,Table, Pagination } from 'antd';
import React, { Component } from 'react';
import MyRangeDate from './myRangeDate';
import BaseComponent from "@comp/BaseComponment.js"
import config from "@config"
class MyOperTable extends BaseComponent {
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
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    // this.setState({
    //   sortedInfo: sorter,
    // });
    this.props.onChange(pagination, filters,sorter)
  }

  render() {
    // const title = this.props.title
    const that = this
    return (
      <div className="MyOperTable">
        <div className="oper-div">
            <Button type="" icon="search">查询</Button>
            <Button type="" icon="plus-square-o">添加</Button>
            <Button type="" icon="edit">修改</Button>
            <Button type="" icon="close">删除</Button>
        </div>
        <Table
            columns={this.props.columns}
            dataSource={this.props.data}
            onChange={this.handleChange}
            components={this.props.components}
            rowClassName="editable-row"
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

export default MyOperTable