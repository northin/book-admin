import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    add,
    testRemove
} from "@redux/action/action.js"
import BaseComponment from "@comp/BaseComponment.js"
import MyModal from '@comp/myModal.js'
import EchartTest from '@comp/echarTest.js'
import MyEditor from '@comp/myEditor.js'
import moment from "moment"
import { Cascader } from 'antd';
import areaData from "@util/areaData.js"
import {injectIntl, FormattedMessage} from 'react-intl';
import Immutable from 'immutable';
class About extends BaseComponment{

    constructor(props){
        super(props)
    }
    componentWillMount() {
        console.log(areaData)
        
    }
    componentDidMount(){
        WB2.anyWhere(function (W) {
            W.widget.connectButton({
                id: "wb_connect_btn",
                type: '3,2',
                callback: {
                    login: function (o) { //登录后的回调函数
                        alert("login: " + o.screen_name)
                    },
                    logout: function () { //退出后的回调函数
                        alert('logout');
                    }
                }
            });
        });
    }
    onEditorStateChange(e){
        console.log(e)
    }
    onChange(value) {
        console.log(value);
      }
    render(){
        const data = [
            {value:335, name:'直接访问'},
            {value:310, name:'邮件营销'},
            {value:234, name:'联盟广告'},
            {value:135, name:'视频广告'},
            {value:1548, name:'搜索引擎'}
        ]
        const {intl} = this.props;
        const options = areaData
        // const todos = Immutable.Map(this.props.todos)
        return (
            <div>
                <div id="wb_connect_btn" ></div>
                <p>
                <FormattedMessage 
                        id="intl.hello"
                        defaultMessage={'hello'}
                    />
                </p>
                {
                    this.props.todos.map((todo,index) =>  <div key={index}>{todo.id}</div> )
                }
                <Cascader defaultValue={[110000, 110100, 110101]} options={options} onChange={this.onChange} />
                <div>{moment(1454256000000).dates()}</div>
                
                <MyModal onRef={this.onRef} content="确认退出？" />
                <button onClick={()=>this.props.onClick(this.props.todos.length+1)}>添加</button>
                <button onClick={()=>this.props.onRemoveClick(1)}>
                    <FormattedMessage 
                        id="intl.hello"
                        defaultMessage={'hello'}
                    /></button>
                <button onClick={this.onModalClick}>弹框</button>
                <EchartTest  data={data} />
                <MyEditor getData={this.onEditorStateChange}/>
            
            </div>
        )
    }
}

About.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
    onClick: PropTypes.func.isRequired
}
const mapStateToProps  = state => {
    console.log(state.getIn(["test","test"]).toJS())
    return {
        todos : state.getIn(["test","test"]).toJS()
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onClick: id => {
            dispatch(add({"id":id}))
        },
        onRemoveClick:id => {
            dispatch(testRemove(id))
        }
    }

}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(About))