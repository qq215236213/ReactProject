import React , { Component } from 'react';
import './pagelayout.css';
import {cookie} from '../cookie';
import { Layout,Menu,Icon,Dropdown } from 'antd';
const { SubMenu } = Menu;
const { Header,Content,Sider,Footer } = Layout;

export default class PageLayout extends Component{
	constructor(props){
		super(props);
		this.state = {
			collapsed:false,
			username:'',
			openkeys:[]
		};
		this.rootSubmenuKeys = ['sub1','sub2'];
		this.toggle = this.toggle.bind(this);
		this.logoutEvent = this.logoutEvent.bind(this);
		this.onOpenChange = this.onOpenChange.bind(this);
	}

	toggle(){
		this.setState({
			collapsed:!this.state.collapsed
		});
	}

	onOpenChange(openkeys){
		const latestOpenKey = openkeys.find(key =>this.state.openkeys.indexOf(key) === -1);
		if(this.rootSubmenuKeys.indexOf(latestOpenKey) === -1){
			this.setState({openkeys});
		}else{
			this.setState({
				openkeys:latestOpenKey?[latestOpenKey]:[]
			});
		}
	}

	componentDidMount(){
		const username = cookie('membername');
		if(username === null || typeof username === 'undefined' || username === ''){
			window.location.hash = '#/login';
		}
		this.setState({
			username
		});
	}

	logoutEvent(e){
		e.preventDefault();
		cookie('token',null,{path:'/'});
		cookie('memberid',null,{path:'/'});
		cookie('membername',null,{path:'/'});
		cookie('issystemmanager',null,{path:'/'});
		this.setState({
			username:''
		});
		window.location.hash = '#/login';
	}

	render(){
		const {username} = this.state;
		const menu = (
			<Menu>
				<Menu.Item key={'item1'}>
					<a href="">
						<Icon type={'user'}></Icon>个人中心
					</a>
				</Menu.Item>
				<Menu.Item key={'item2'}>
					<a onClick={this.logoutEvent}>
						<Icon type={'logout'}></Icon> 退出
					</a>
				</Menu.Item>
			</Menu>
		);
		const Styles = {color:'#fff',display:'inline-block',textDecoration:'none'};
		return (
			<Layout style={{minHeight:'100%'}}>
				<Sider
					breakpoint={'sm'}
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
				>
					<div className="logo"/>
					<Menu theme="dark" mode="inline"
						  defaultSelectedKeys={['1']}
						  openKeys={this.state.openkeys}
						  onOpenChange={this.onOpenChange}>
						<Menu.Item key="1">
							<Icon type="team" style={{fontSize:18}}/>
							<span>
								<a href="#/" style={Styles}>会员列表</a>
							</span>
						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="bars" style={{fontSize:18}}/>
							<span>
								<a href="#/platform" style={Styles}>平台列表</a>
							</span>
						</Menu.Item>
						<Menu.Item key="3">
							<Icon type="upload" />
							<span>nav 3</span>
						</Menu.Item>
						<SubMenu
							key={'sub1'}
							title={<span><Icon type={'user'}/><span>User</span></span>}
						>
							<Menu.Item key="4">
								<Icon type="upload" />
								<span>nav 4</span>
							</Menu.Item>
							<Menu.Item key="5">
								<Icon type="upload" />
								<span>nav 5</span>
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key={'sub2'}
							title={<span><Icon type={'setting'} style={{fontSize:18}}/><span>系统设置</span></span>}
						>
							<Menu.Item key="6">
								<Icon type="user" style={{fontSize:16}}/>
								<span>
									<a href="#/manager" style={Styles}>管理员列表</a>
								</span>
							</Menu.Item>
							<Menu.Item key="7">
								<Icon type="upload" />
								<span>nav 7</span>
							</Menu.Item>
						</SubMenu>
					</Menu>
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>
						<div className={'inline'}>
							<Icon
								className="trigger"
								type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={this.toggle}
							/>
							<div style={{float:'right',marginRight:'16px',fontSize:'16px'}}>
								<Dropdown overlay={menu}>
									<a className="ant-dropdown-link">
										{username} <Icon type="down" />
									</a>
								</Dropdown>
							</div>
						</div>
					</Header>
					<Content style={{ margin: '16px', padding: 24, background: '#fff', minHeight: 480 }}>
						{this.props.children}
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						© 2013-2017 笛升科技
					</Footer>
				</Layout>
			</Layout>
		);
	}
}