import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect,BrowserRouter,Link } from 'react-router-dom'
import BaseComponment from "@comp/BaseComponment.js"
import {
    checkPass
} from "@redux/action/commonAction.js"
import SendMessage from "@comp/SendMessage.js"
import { sendCode } from "@config"
import {message, Form, Icon, Input, Button, Checkbox,Row,Col } from 'antd';
const FormItem = Form.Item;

class FindPass extends BaseComponment{

    constructor(props){
        super(props)
        this.state = {
            isPass:false
        }
    }
    componentWillMount() {
    }
    checkPass = async (e) => {
        e.preventDefault();
        await this.props.form.validateFields( async (err, values) => {
          if (!err) {
            const res = await this.props.checkPass()
            if(res.errorCode == 0){
                this.setState({isPass: true});  
                this.props.form.setFields({
                    password:{
                        value:""
                    },
                    confirm:{
                        value:""
                    },
                })
                this.success("校验成功！")
            }else{
                this.error("校验失败！请重新发送！")
            }
            
          }
        });
      }
     handleSubmit = async (e) => {
        e.preventDefault();
        await this.props.form.validateFields( async (err, values) => {
          if (!err) {
            const res = await this.props.checkPass()
            if(res.errorCode == 0){
                this.success("设置成功！")
                this.urlRedirect("/login")
            }else{
                this.error("设置失败！请重新设置")
            }
            
          }
        });
      }
      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }
    render(){
        const that = this.props
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
         
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {
                    (!this.state.isPass)?(
                        <div id="components-form-demo-normal-reg" style={{ height:400 }}>
                            <Form onSubmit={this.checkPass} className="login-form">
                                <FormItem
                                {...formItemLayout}
                                label="手机号">
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入手机号' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                                )}
                                </FormItem>
                                <FormItem
                                {...formItemLayout}
                                label="验证码"
                                >
                                <Row gutter={8}>
                                    <Col span={12}>
                                    {getFieldDecorator('captcha', {
                                        rules: [{ required: true, message: '请输入你的短信验证码' }],
                                    })(
                                        <Input prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
                                    )}
                                    </Col>
                                    <Col span={12}>
                                    <SendMessage sendCode={sendCode.reg} sendMobile={that.form.getFieldValue("userName")}/>
                                    </Col>
                                </Row>
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    下一步
                                </Button>
                                </FormItem>
                            </Form>
                        </div>
                    ):(
                        <div id="components-form-demo-normal-reg" style={{ height:400 }}>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem
                                {...formItemLayout}
                                label="新密码">
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入新密码' }],
                                })(
                                    <Input type="password" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} autoComplete="off" placeholder="密码" />
                                )}
                                </FormItem>
                                <FormItem
                                {...formItemLayout}
                                label="确认密码">
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                    required: true, message: '请再次输入密码!',
                                    }, {
                                    validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} autoComplete="off" onBlur={this.handleConfirmBlur} placeholder="确认密码" />
                                )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    提交
                                </Button>
                                </FormItem>
                            </Form>
                        </div>
                    )
                }
            </div>
            
        )
    }
}

FindPass.propTypes = {
    // users: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         // name: PropTypes.string.isRequired,
    //         // age: PropTypes.number.isRequired,
    //     }).isRequired
    // ).isRequired,
    // isAuth: PropTypes.bool.isRequired,
    checkPass: PropTypes.func.isRequired
}
const mapStateToProps  = state => {
    return {
        // isAuth:state.getIn(["login","isAuth"])
    }
}
const mapDispatchToProps = dispatch => {
    return {
        checkPass: () => {
            return dispatch(checkPass())
        }
    }
}

const WrappedNormalFindPass= Form.create()(FindPass);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedNormalFindPass)