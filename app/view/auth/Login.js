import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect,BrowserRouter,Link } from 'react-router-dom'
import BaseComponment from "@comp/BaseComponment.js"
import {
    login
} from "@redux/action/authAction.js"
import {message, Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Login extends BaseComponment{

    constructor(props){
        super(props)
        this.state = {
            redirect:false
        }
    }
    componentWillMount() {
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
    
    render(){
        const that = this.props
        
        if (this.state.redirect) {  
            return <Redirect push to="/app/user/baseInfo" />; //or <Redirect push to="/sample?a=xxx&b=yyy" /> 传递更多参数  
        }  
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="components-form-demo-normal-login">
                 <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入账号' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号/客户号/资金号" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(
                        <Checkbox>记住我</Checkbox>
                    )}
                    <Link to="/findPass" className="login-form-forgot">忘记密码</Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    或 <Link to="/register">马上注册!</Link>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

Login.propTypes = {
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

const WrappedNormalLogin= Form.create()(Login);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedNormalLogin)