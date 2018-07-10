import { Layout, Menu, Icon,Breadcrumb } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class MyLayout extends Component{
    constructor(props){
        super(props)
        this.state = {
            collapsed: false,
            sub:"账户中心",
            item:'基本信息',
            nowKey:'',
            openKey:''
        }
    }
    onCollapse(collapsed){
        this.setState({ collapsed });
    }
    onSelect = ({ item, key, selectedKeys }) => {
        console.log({ item, key, selectedKeys })
        if(key<20){
            this.setState({
                sub:"账户中心",
                openKey:'sub1'
                
            })
        }else if (key < 30){
            this.setState({
                sub:"商品管理",
                openKey:'sub2'
            })
        }else{
            this.setState({
                sub:"信息查询",
                openKey:'sub3'
            })
        }
        this.setState({
            item:item._reactInternalFiber.child.child.memoizedProps.children,
            nowKey:key
        })
    }
    componentWillMount(){
    }
    componentDidMount(){
        const that = this
        const currHost = window.location.pathname
        var subList = this.refs.menu._reactInternalFiber.child.child.memoizedProps.children.props.children;
        for (let i = 0; i < subList.length-2; i++) {
            const element = subList[i];
            
            var itemList =  element.props.children;
            for (let j = 0; j < itemList.length; j++) {
                const elementItem = itemList[j];
                if(currHost == elementItem.props.children.props.to){
                    that.setState({
                        nowKey:elementItem.key,
                        openKey:element.key,
                        item:elementItem.props.children.props.children
                    })
                    if(elementItem.key<20){
                        that.setState({
                            sub:"账户中心",
                            
                        })
                    }else if (elementItem.key < 30){
                        that.setState({
                            sub:"商品管理",
                        })
                    }else{
                        that.setState({
                            sub:"信息查询",
                        })
                    }
                    break;
                }
            }
            
        }
    }
    onSubClick = (value) => {
        this.setState({
            openKey:"sub"+value
        })
    }
    render(){


        return(
        
        <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
            <div className="logo" />
            <Menu theme="dark" ref="menu" mode="inline" selectedKeys={[this.state.nowKey]}  openKeys={[this.state.openKey]}  onSelect={this.onSelect}>
            <SubMenu
              key="sub1"
            //   onClick={this.onSubClick(1)}
               onTitleClick={()=>this.onSubClick(1)}
              title={<span><Icon type="user" /><span>账户中心</span></span>}
            >
              <Menu.Item key="11"><Link to="/app/user/baseInfo">基本信息</Link></Menu.Item>
              <Menu.Item key="12"><Link to="/app/user/mbChange">手机号更换</Link></Menu.Item>
              <Menu.Item key="13"><Link to="/app/user/cread">银行卡管理</Link></Menu.Item>
              <Menu.Item key="14"><Link to="/app/user/realName">实名认证</Link></Menu.Item>
              <Menu.Item key="15"><Link to="/app/user/safeQuesSet">安全问题设置</Link></Menu.Item>
              <Menu.Item key="16"><Link to="/app/user/passChange">登录密码修改</Link></Menu.Item>
              <Menu.Item key="17"><Link to="/app/user/passReset">交易密码重置</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              onTitleClick={()=>this.onSubClick(2)}
              title={<span><Icon type="book" /><span>商品管理</span></span>}
            >
              <Menu.Item key="21"><Link to="/app/fund/grounding">书本上架</Link></Menu.Item>
              <Menu.Item key="22"><Link to="/app/fund/classify">书本分类</Link></Menu.Item>
              <Menu.Item key="23"><Link to="/app/fund/collection">书本收藏</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              onTitleClick={()=>this.onSubClick(3)}
              title={<span><Icon type="profile" /><span>信息查询</span></span>}
            >
              <Menu.Item key="31"><Link to="/app/info/myHold">我的持仓</Link></Menu.Item>
              <Menu.Item key="32"><Link to="/app/info/hisOrderQry">历史订单查询</Link></Menu.Item>
              <Menu.Item key="33"><Link to="/app/info/orderQry">今日订单查询</Link></Menu.Item>
              <Menu.Item key="34"><Link to="/app/info">历史成交查询</Link></Menu.Item>
              <Menu.Item key="35"><Link to="/app/about">今日成交查询</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="41">
                <Icon type="upload" />
                <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="51">
                <Icon type="bar-chart" />
                <span className="nav-text">nav 4</span>
            </Menu.Item>
            </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: '20px 0 0 50px' }} >
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                    <Icon type="home" />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="">
                    <span>{this.state.sub}</span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                    {this.state.item}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff',minHeight:'80vh' }}>
                {this.props.children}
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
            </Footer>
        </Layout>
        </Layout>
        
    )}
}
export default MyLayout;