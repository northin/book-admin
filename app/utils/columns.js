import React, { Component } from 'react';
import util from "@util/util.js"
import { Table, Icon, Divider,DatePicker,Popconfirm  } from 'antd';
const EditableContext = React.createContext();
export const fundQryColumns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>
},{
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    render: text => <div> {util.moneyFun.toMoney(text)} </div>
},{
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
}]

export function getbookColumns(sortedBookInfo,isEditing,that,EditableContext){
    return [{
        title: '书本编号',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => (+a.id) - (+b.id),
        sortOrder: sortedBookInfo.columnKey === 'id' && sortedBookInfo.order,
        // render: text => <div> {util.moneyFun.toMoney(text)} </div>
    },{
        title: '书本名称',
        dataIndex: 'name',
        key: 'name',
        // render: text => <div> {util.moneyFun.toMoney(text)} </div>
    },{
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        editable: true,
        // render: text => <div> {util.moneyFun.toMoney(text)} </div>
    },{
        title: '国籍',
        dataIndex: 'country',
        key: 'country',
        editable: true,
        // render: text => <div> {util.moneyFun.toMoney(text)} </div>
    },{
        title: 'ISBN',
        dataIndex: 'isbn',
        key: 'isbn',
        // render: text => <div> {util.moneyFun.toMoney(text)} </div>
    },{
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        // render: text => <div> {util.moneyFun.toMoney(text)} </div>
    },{
        title: '图片',
        dataIndex: 'picture',
        key: 'picture',
        // render: text => <div> {util.moneyFun.toMoney(text)} </div>
    },{
        title: '上架时间',
        dataIndex: 'groundingDate',
        key: 'groundingDate',
        // render: text => <div> {util.moneyFun.toMoney(text)} </div>
    },{
        title: '库存',
        dataIndex: 'store',
        key: 'store',
        // render: text => <div> {util.moneyFun.toMoney(text)} </div>
    },{
        title: '分类',
        dataIndex: 'classify',
        key: 'classify',
        editable: true,
        // render: text => <div> {util.moneyFun.toMoney(text)} </div>
    },{
        title: '出版社',
        dataIndex: 'company',
        key: 'company',
        editable: true,
        // render: text => <div> {util.moneyFun.toMoney(text)} </div>
    },{
        title: '操作',
        key: 'action',
        render: (text, record) => {
            const editable = isEditing(record);
            return (
                <div>
                  {editable ? (
                    <span>
                      <EditableContext.Consumer>
                        {form => (
                          <a
                            href="javascript:;"
                            onClick={() => that.save(form, record.key)}
                            style={{ marginRight: 8 }}
                          >
                            Save
                          </a>
                        )}
                      </EditableContext.Consumer>
                      <Popconfirm
                        title="Sure to cancel?"
                        onConfirm={() => that.cancel(record.key)}
                      >
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                  ) : (
                      <span>
                        <a onClick={() => that.edit(record.key)}>修改</a>
                        <a onClick={() => that.edit(record.key)}>删除</a>
                      </span>
                   
                  )}
                </div>
            )
          
        },
      }]
}