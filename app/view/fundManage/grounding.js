import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    userQueryAll
} from "@redux/action/action.js"
import { Table, Icon, Divider,DatePicker, Input, InputNumber, Popconfirm, Form } from 'antd';
import MyTitle from '@comp/myTitle.js'
import MyOperTable from '@comp/myOperTable.js'
import { getbookColumns} from '@util/columns.js';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
const data = [{
    key: '1',
    id:'1',
    name: '舞舞舞',
    author:'村上春树',
    country:'日本',
    store:'32',
    price:'35.5',
    classify:'1',
    isbn:'13456',
    groundingDate:'2017-12-12',
    company:'中国出版社'
  }, {
    key: '2',
    id:'2',
    name: '舞舞舞',
    author:'村上春树',
    country:'日本',
    store:'32',
    price:'35.5',
    classify:'1',
    isbn:'13456',
    groundingDate:'2017-12-12',
    company:'中国出版社'
  }, {
    key: '3',
    id:'3',
    name: '舞舞舞',
    author:'村上春树',
    country:'日本',
    store:'32',
    price:'35.5',
    classify:'1',
    isbn:'13456',
    groundingDate:'2017-12-12',
    company:'中国出版社'
  }];

class Grounding extends Component{

    constructor(props){
        super(props)
        this.state = {
            sortedBookInfo:'',
            editingKey:'',
            data
        }
    }
    componentWillMount() {
        // this.props.userQueryAll() //发送get请求
        // console.log(this.props.users)
        
    }
    onChange = (date, dateString) =>  {
        console.log(date, dateString);
      }
      dateQry = (start,end) =>{

      }
      gotoCurrent = (current,pageSize,start,end) => {
      }
    handChange = (pagination, filters,sorter) => {
        this.setState({
            sortedBookInfo:sorter
        })
    }
    edit = (key)=> {
        this.setState({ editingKey: key });
      }
    
      save = (form, key) => {
        form.validateFields((error, row) => {
          if (error) {
            return;
          }
          const newData = [...this.state.data];
          const index = newData.findIndex(item => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            this.setState({ data: newData, editingKey: '' });
          } else {
            newData.push(data);
            this.setState({ data: newData, editingKey: '' });
          }
        });
      }
    
      cancel = () => {
        this.setState({ editingKey: '' });
      };
    render(){
          
          const isEditing = (record) => {
            return record.key === this.state.editingKey;
          };
          const bookColumns = getbookColumns(this.state.sortedBookInfo || {},isEditing,this,EditableContext)
          const columns = bookColumns.map((col) => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: record => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
              }),
            };
          });
          const components = {
            body: {
              row: EditableFormRow,
              cell: EditableCell,
            },
          };
      
        return (
            <div>
                <MyTitle title="书本上架" />
                <MyOperTable
                    components={components}
                    columns={columns}
                    onChange={(pagination, filters,sorter) => this.handChange(pagination, filters,sorter)}
                    data={this.state.data}
                    dateQry={(start,end) => {this.dateQry(start,end)}}
                    gotoCurrent={(current,pageSize,start,end) => this.gotoCurrent(current,pageSize,start,end)}/>
            </div>
        )
    }
}
Grounding.propTypes = {
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
)(Grounding)