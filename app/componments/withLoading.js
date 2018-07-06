import { Table, Spin } from 'antd';
import React, { Component } from 'react';

export default function(isLoading){
    return function(WarpComponment){
        return class Inheritance extends WarpComponment{
            render(){
                const Loading = () => <div className="spin-example"> <Spin /></div>
                if(isLoading(this.state)){
                    return <Loading />
                }else{
                    return super.render()
                }
            }
        }
    }
}