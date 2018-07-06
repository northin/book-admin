import { DatePicker, Button } from 'antd';
import React, { Component } from 'react';
class MyRangeDate extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          startDate : '',
          endDate : ''
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
    const title = this.props.title
    return (
      <div className="myRangeDate">
        <DatePicker 
            placeholder="开始日期"
            onChange={this.startDateChange}/>
        &nbsp;-&nbsp;
        <DatePicker 
            placeholder="结束日期"
            onChange={this.endDateChange}/>
        <Button style={{ marginLeft:20 }} onClick={this.getDate}>查询</Button>
      </div>
    );
  }
}

export default MyRangeDate