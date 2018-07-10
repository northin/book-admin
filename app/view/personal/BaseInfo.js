import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    userQueryAll
} from "@redux/action/action.js"
import { Button } from 'antd/lib/radio';
import { Row, Col, Slider, Icon } from 'antd';
import '@less/common.less'
class BaseInfo extends Component{

    constructor(props){
        super(props)
    }
    componentWillMount() {
        // this.props.userQueryAll() //发送get请求
        // console.log(this.props.users)
    }
    render(){
        return (
            <div style={{ height: '80vh' }}>
                
            </div>
        )
    }
}

BaseInfo.propTypes = {
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
        users : state.user
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
)(BaseInfo)