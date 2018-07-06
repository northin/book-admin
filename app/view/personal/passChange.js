import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect,BrowserRouter,Link } from 'react-router-dom'
import BaseComponment from "@comp/BaseComponment.js"
import {
    login
} from "@redux/action/authAction.js"
import MyTitle from '@comp/myTitle.js'
import {message, Form, Icon, Input, Button, Checkbox,Row,Col } from 'antd';
const FormItem = Form.Item;

class PassChange extends BaseComponment{

    constructor(props){
        super(props)
        this.state = {
            redirect:false
        }
        
    }
    componentWillMount() {
        console.log(this.formItemLayout)
    }
     handleSubmit = async (e) => {
        e.preventDefault();
        await this.props.form.validateFields( async (err, values) => {
          if (!err) {
            await this.props.onLogin()
            if(this.props.isAuth){
                this.setState({redirect: true});  
                this.success("登录成功！")
            }else{
                this.error("登录失败！密码错误或账号错误！")
            }
            
          }
        });
      }
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPass')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }
    render(){
        const that = this.props
        
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <MyTitle title="登录密码修改"/>
                <Form onSubmit={this.handleSubmit} style={{ width:'25vw',margin:'20vh auto' }}>
                    <FormItem
                    {...this.formItemLayout}
                    label="原密码"
                    >
                    {getFieldDecorator('oldPass', {
                        rules: [{
                            required: true, message: '请输入原密码',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入原密码" />
                    )}
                    </FormItem>
                    <FormItem
                    {...this.formItemLayout}
                    label="新密码"
                    >
                    {getFieldDecorator('newPass', {
                        rules: [{
                            required: true, message: '请输入新密码',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入新密码"  />
                    )}
                    </FormItem>
                    <FormItem
                    {...this.formItemLayout}
                    label="确认密码"
                    >
                    {getFieldDecorator('comfirm', {
                        rules: [{
                            required: true, message: '请再次输入新密码',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  onBlur={this.handleConfirmBlur} placeholder="确认密码"  />
                    )}
                    </FormItem>
                    <FormItem {...this.tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

PassChange.propTypes = {
    // users: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         // name: PropTypes.string.isRequired,
    //         // age: PropTypes.number.isRequired,
    //     }).isRequired
    // ).isRequired,
    isAuth: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired
}
const mapStateToProps  = state => {
    return {
        isAuth:state.getIn(["auth","isAuth"])
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogin: () => {
            return dispatch(login())
        }
    }
}

const WrappedNormalPassChange= Form.create()(PassChange);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedNormalPassChange)