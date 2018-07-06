import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    userQueryAll
} from "@redux/action/action.js"
import {dict} from '@redux/action/commonAction.js'
import { Form,Row, Col, Icon, Input, Button, Checkbox,Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import MyTitle from '@comp/myTitle.js'
import { sendCode } from "@config"
import BaseComponment from "@comp/BaseComponment.js"
import SendMessage from "@comp/SendMessage.js"
import Cookies from "js-cookie"
class PassReset extends BaseComponment{

    constructor(props){
        super(props)


    }
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        isPass:false,
        confirmDirtyPass: false,
    }
    componentWillMount() {
        this.props.onDict("idType")
        Cookies.set('mobile', '15957199647');
        
    }
    componentDidMount(){
        
        this.props.form.setFields({
            ques1: {
              value: "第一问？",
            },
            ques2: {
                value: "第二问？",
              },
              ques3: {
                value: "第三问？",
              },
          });
    }
    handleSubmit= (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.setState({
                isPass:true
            })
          }
        });
      }
      handleSubmitPass= (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
    validateToNextIdCode = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    render(){
        const { getFieldDecorator } = this.props.form;
        const that = this.props
        return (
            <div>
                <MyTitle title="交易密码重置"/>
                {!this.state.isPass?(<Form onSubmit={this.handleSubmitPass} style={{ width:'25vw',margin:'20vh auto' }}>
                    <FormItem
                    {...this.formItemLayout}
                    label="请选择证件类型"
                    >
                    {getFieldDecorator('idType', {
                        rules: [{
                        required: true, message: '请选择证件',
                        }],
                    })(<Select style={{  }} >
                        
                            { 
                                that.dict["idType"]?(
                                    that.dict["idType"].map( (item,index) => (
                                        <Option key={index} value={item.id}>{item.user_email}</Option>
                                    ))
                                        
                                   
                                ):(
                                    null
                                ) 
                            }
                            </Select>
                    )}
                    </FormItem>
                    <FormItem
                    {...this.formItemLayout}
                    label="请输入证件号"
                    >
                    {getFieldDecorator('idCode', {
                        rules: [{
                        required: true, message: '请输入证件号',
                        }, {
                        validator: this.validateToNextIdCode,
                        }],
                    })(
                        <Input type="text" />
                    )}
                    </FormItem>
                    <FormItem
                    {...this.formItemLayout}
                    label="验证码"
                    >
                    <Row gutter={8}>
                        <Col span={12}>
                        {getFieldDecorator('captcha1', {
                            rules: [{ required: true, message: '输入手机短信验证码' }],
                        })(
                            <Input type="text"/>
                        )}
                        </Col>
                        <Col span={12}>
                        <SendMessage sendCode={sendCode.reg} sendMobile={Cookies.get("mobile")}/>
                        </Col>
                    </Row>
                    </FormItem>
                    <FormItem
                    {...this.formItemLayout}
                    label="问题一"
                    >
                    {getFieldDecorator('ques1', {
                        rules: [{
                        }, {
                        }],
                    })(
                        <Input type="text" disabled />
                    )}
                    </FormItem>
                    <FormItem
                    {...this.formItemLayout}
                    label="答案一"
                    >
                    {getFieldDecorator('answer1', {
                        rules: [{
                        required: true, message: '请输入答案',
                        }, {
                        }],
                    })(
                        <Input type="text" />
                    )}
                    </FormItem>
                    <FormItem
                    {...this.formItemLayout}
                    label="问题二"
                    >
                    {getFieldDecorator('ques2', {
                        rules: [{
                        }, {
                        }],
                    })(
                        <Input type="text" disabled />
                    )}
                    </FormItem>
                    <FormItem
                    {...this.formItemLayout}
                    label="答案二"
                    >
                    {getFieldDecorator('answer2', {
                        rules: [{
                        required: true, message: '请输入答案',
                        }, {
                        }],
                    })(
                        <Input type="text" />
                    )}
                    </FormItem>
                    <FormItem
                    {...this.formItemLayout}
                    label="问题三"
                    >
                    {getFieldDecorator('ques3', {
                        rules: [{
                        }, {
                        }],
                    })(
                        <Input type="text" disabled />
                    )}
                    </FormItem>
                    <FormItem
                    {...this.formItemLayout}
                    label="答案三"
                    >
                    {getFieldDecorator('answer3', {
                        rules: [{
                        required: true, message: '请输入答案',
                        }, {
                        }],
                    })(
                        <Input type="text" />
                    )}
                    </FormItem>
                    <FormItem {...this.tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>):(<Form onSubmit={this.handleSubmit} style={{ width:'25vw',margin:'20vh auto' }}>
                    <FormItem
                    {...this.formItemLayout}
                    label="登录密码"
                    >
                    {getFieldDecorator('password', {
                        rules: [{
                        required: true, message: '请输入密码',
                        }, {
                        validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                    </FormItem>
                    <FormItem
                    {...this.formItemLayout}
                    label="验证码"
                    >
                    <Row gutter={8}>
                        <Col span={12}>
                        {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: '输入手机短信验证码' }],
                        })(
                            <Input />
                        )}
                        </Col>
                        <Col span={12}>
                        <Button>发生短信</Button>
                        </Col>
                    </Row>
                    </FormItem>
                    <FormItem {...this.tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">下一步</Button>
                    </FormItem>
                </Form>)}
                
            </div>
        )
    }
}

PassReset.propTypes = {
    // users: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         // name: PropTypes.string.isRequired,
    //         // age: PropTypes.number.isRequired,
    //     }).isRequired
    // ).isRequired,
    dict: PropTypes.object.isRequired,
    onDict: PropTypes.func.isRequired
}
const mapStateToProps  = state => {
    return {
        dict :state.getIn(["common","dict"]).toJS()
    }
}
const WrappedNormalPassReset = Form.create()(PassReset);
const mapDispatchToProps = dispatch => {
    return {
        userQueryAll: () => {
            dispatch(userQueryAll())
        },
        onDict: (params) => {
            dispatch(dict(params))
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedNormalPassReset)