import { Button,Icon,Table, Pagination ,Modal,Form, Input,DatePicker,Select,Upload } from 'antd';
import React, { Component } from 'react';
import MyRangeDate from './myRangeDate';
import BaseComponent from "@comp/BaseComponment.js"
import config from "@config"
const FormItem = Form.Item;
const Option = Select.Option;
class SearchForm extends BaseComponent{
  constructor(props){
    super(props)
  }
  handleChange = (value) =>{
    console.log(`selected ${value}`);
  }
  
  handleBlur = () => {
    console.log('blur');
  }
  
  handleFocus = () => {
    console.log('focus');
  }
  searchHandleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values)
      }
    });
    
  }
  
  render(){
    const { getFieldDecorator } = this.props.form;
    const columns = this.props.columns
    return (
      <Modal
          title="查询"
          visible={this.props.searchModle}
          onOk={this.searchHandleOk}
          onCancel={this.props.searchHandleCancel}
        >
      <Form onSubmit={this.handleSubmit} className="login-form">
      {columns.map((item,index) => {
            if(item.type == "select" && item.search){
              return (<FormItem key={index}>
                {getFieldDecorator(item.key, {
                  // rules: [{ required: true, message: '请输入'+item.title }],
                })(
                  <Select
                  
                  showSearch
                  placeholder={"请选择"+item.title} 
                  optionFilterProp="children"
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
                )}
              </FormItem>)
            }else if( item.type == "date" && item.search){
              return (<FormItem key={index}>
                {getFieldDecorator(item.key, {
                  // rules: [{ required: true, message: '请输入'+item.title }],
                })(
                  <div>
                    <DatePicker 
                        placeholder="开始日期"
                        onChange={this.startDateChange}/>
                    &nbsp;-&nbsp;
                    <DatePicker 
                        placeholder="结束日期"
                        onChange={this.endDateChange}/>
                  </div>
                )}
              </FormItem>)
            }else if(item.type == "file"&& item.search){

              return (<FormItem key={index}>
                {getFieldDecorator(item.key, {
                  rules: [{ required: true, message: '请输入'+item.title }],
                })(
                  <Upload name="logo" className="operUpload"  action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> 点击选择上传文件
                </Button>
              </Upload>
                )}
              </FormItem>)
            }else if(item.search){
              return (<FormItem key={index}>
                {getFieldDecorator(item.key, {
                  // rules: [{ required: true, message: '请输入'+item.title }],
                })(
                  <Input placeholder={item.title} />
                )}
              </FormItem>)
            }else{

            }
            
            
        })}
      </Form>
      </Modal>
    )
  }
    
  
  
}

class InsertForm extends BaseComponent{
  constructor(props){
    super(props)
  }
  handleChange = (value) =>{
    console.log(`selected ${value}`);
  }
  
  handleBlur = () => {
    console.log('blur');
  }
  
  handleFocus = () => {
    console.log('focus');
  }
  insertHandleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onInsert(values)
      }
    });
  }
  
  render(){
    const { getFieldDecorator } = this.props.form;
    const columns = this.props.columns
    return (
      <Modal
          title="添加"
          visible={this.props.insertModle}
          onOk={this.insertHandleOk}
          onCancel={this.props.insertHandleCancel}
        >
      <Form onSubmit={this.handleSubmit} className="login-form">
      {columns.map((item,index) => {
            if(item.type == "select"){
              return (<FormItem key={index}>
                {getFieldDecorator(item.key, {
                  rules: [{ required: true, message: '请输入'+item.title }],
                })(
                  <Select
                  
                  showSearch
                  placeholder={"请选择"+item.title} 
                  optionFilterProp="children"
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
                )}
              </FormItem>)
            }else if( item.type == "date"){
              return (<FormItem key={index}>
                {getFieldDecorator(item.key, {
                  rules: [{ required: true, message: '请输入'+item.title }],
                })(
                  <DatePicker className="operDatePicker" />
                )}
              </FormItem>)
            }else if(item.type == "file"){

              return (<FormItem key={index}>
                {getFieldDecorator(item.key, {
                  rules: [{ required: true, message: '请输入'+item.title }],
                })(
                  <Upload name="logo" className="operUpload"  action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> 点击选择上传文件
                </Button>
              </Upload>
                )}
              </FormItem>)
            }else if(item.type == "none" || item.key == "action"){

            }else{
              return (<FormItem key={index}>
                {getFieldDecorator(item.key, {
                  rules: [{ required: true, message: '请输入'+item.title }],
                })(
                  <Input placeholder={item.title} />
                )}
              </FormItem>)
            }
            
            
        })}
      </Form>
      </Modal>
    )
  }
    
  
  
}
const WrapSearchForm = Form.create()(SearchForm);
const WrapInsertForm = Form.create()(InsertForm);
class MyOperTable extends BaseComponent {
  constructor(props){
      super(props)
      this.state = {
          loading:false,
          searchModle:false,
          insertModle:false,
      }
  }
  componentDidMount(){
    // this.props.onRef(this)
  }
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    // this.setState({
    //   sortedInfo: sorter,
    // });
    this.props.onChange(pagination, filters,sorter)
  }
  onSerach = () => {
    this.setState({
      searchModle:true
    })
  }
  onInsert = () => {
    this.setState({
      insertModle:true
    })
  }
  insertHandleCancel = () => {
    this.setState({
      insertModle:false
    })
  }
  searchHandleCancel = () => {
    this.setState({
      searchModle:false
    })
  }
  onSerachHandle = (values) => {
    this.props.onSerachHandle(values)
    this.setState({
      searchModle:false
    })
  }
  onInsertHandle = (values) => {
    this.props.onInsertHandle(values)
    this.setState({
      insertModle:false
    })
  }
  render() {
    // const title = this.props.title
    
    const that = this
    const columns = this.props.columns
    return (
      <div className="MyOperTable">
        <div className="oper-div">
            <Button type="" icon="search" onClick={this.onSerach}>查询</Button>
            <Button type="" icon="plus-square-o" onClick={this.onInsert}>添加</Button>
        </div>
        
        <WrapSearchForm 
          columns={columns}
          searchModle={this.state.searchModle}
          searchHandleCancel={this.searchHandleCancel}
          onSearch={this.onSerachHandle}/>
        
        <WrapInsertForm 
          columns={columns}
          insertModle={this.state.insertModle}
          insertHandleCancel={this.insertHandleCancel}
          onInsert={this.onInsertHandle}/>
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