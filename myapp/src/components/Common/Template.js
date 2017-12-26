import React ,{Component} from 'react';
import Logo from '../../img/app_icon_cloud.png';
import cookie from '../Libs/Cookie';

class Template extends Component{

	logout(){
		cookie.Cookie('token', '', { path: '/' });
		cookie.Cookie('memberid', '', { path: '/' });
		cookie.Cookie('membername', '', { path: '/' });
		window.location.href='/login';
	}

	componentDidMount(){
		if(!cookie.Cookie('membername')){
			window.location.href='/login';
		}
		this.refs.membername.innerHTML = cookie.Cookie('membername');
	}

	render(){
		return (
			<div>
				{/*顶部导航*/}
				<div className='navbar navbar-inverse navbar-fixed-top' style={{marginLeft:'130px',backgroundColor:'#1c2b36',padding:'0 10px 0 0'}}>
					<div className="navbar-collapse collapse" role='navigation'>
						<ul className='nav navbar-nav navbar-right'>
							<li>
								<a ref='membername'>1</a>
							</li>
							<li>
								<a title='安全退出' onClick={this.logout.bind(this)}>安全退出</a>
							</li>
						</ul>
					</div>
				</div>
				{/*顶部导航结束*/}
				{/*左侧导航开始*/}
				<nav className='navbar-default'>
					<div className='sidebar-collapse'>
						<a className="center-block" style={{margin:'20px 0'}}  role="button">
							<img src={Logo} className="center-block img-circle" alt='logo'/>
						</a>
						<ul className="nav" id='nav'>
							<li className="mastermenu">
								<a href="">
									<i className="icon iconfont icon-qiajuancardcoupon"></i>
									<span className="nav-label">财务管理</span>
									<span className="pull-right-container">
                            			<i className="fa icon-app_down pull-right"></i>
                        			</span>
								</a>
								<ul className="nav nav-second-level collapse in">
									<li>
										<a className="J_menuItem" href="/finance/extract">人民币提现</a>
									</li>
									<li>
										<a className="J_menuItem" href="/finance/personal">个人财务</a>
									</li>
									<li>
										<a className="J_menuItem" href="/finance/sharermb">分红中心</a>
									</li>
								</ul>
							</li>
							<li className="mastermenu">
								<a href="">
									<i className="icon iconfont icon-shezhi"></i>
									<span className="nav-label">基本设置</span>
									<span className="pull-right-container">
                            			<i className="fa icon-app_down pull-right"></i>
                        			</span>
								</a>
								<ul className="nav nav-second-level collapse in">
									<li>
										<a className="J_menuItem" href="/user/security">安全中心</a>
									</li>
									<li>
										<a className="J_menuItem" href="/user/userinfo">用户中心</a>
									</li>
									<li>
										<a className="J_menuItem" href="">消息中心</a>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</nav>
				{/*左侧导航结束*/}
				{/*右侧部分*/}
					<div id="page-wrapper">
						<div className="js_container" id="content-main">
							{this.props.content}
						</div>
						<footer className="main-footer">
							<strong>Copyright © 2017 家政股.</strong> All rights reserved.
						</footer>
					</div>
				{/*右侧部分结束*/}
			</div>
		);
	}
}


export default Template;