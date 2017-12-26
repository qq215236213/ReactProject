import React,{Component} from 'react';
import $ from 'jquery/dist/jquery.min';
import CryptoJS from 'crypto-js/md5';
import show from '../Libs/ToolTip';
import cookie from '../Libs/Cookie';

class WebLogin extends Component{
	constructor(props){
		super(props);
		this.state = {
			username:'',
			password:''
		}
		this.handlePost = this.handlePost.bind(this);
		this.handlePwdChange = this.handlePwdChange.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
	}

	handleUserChange(e){
		this.setState({
			username:e.target.value.trim()
		})
	}

	handlePwdChange(e){
		this.setState({
			password:e.target.value.trim()
		})
	}

	handlePost(){
		let params = {};
		if(this.state.username === ''){
			show.msg('用户名不能为空');
			return;
		}
		if(this.state.password === ''){
			show.msg('密码不能为空');
			return;
		}
		params.username = this.state.username;
		params.password = CryptoJS(this.state.password).toString();

		$.post('http://www.jzg.com/login',params,(d) =>{
			if(d.IsError){
				show.msg(d.Msg);
				return;
			}
			cookie.Cookie('token',d.Data.Token,{path:'/'});
			cookie.Cookie('token', d.Data.Token, { path: '/' });
			cookie.Cookie('memberid', d.Data.User.MemberId, { path: '/' });
			cookie.Cookie('membername', d.Data.User.MemberName, { path: '/' });

			window.location.href = '/';
		});
	}

	render(){
		return (
			<div className='form-horizontal center-block' style={{width:'350px',backgroundColor:'#fff',padding:'20px 40px 40px 40px',marginTop:'100px'}}>
				<h3>登录系统</h3>
				<div className='input-group'>
				   <span className='input-group-addon'>
					   <i className='fa fa-user' aria-hidden='true'></i>
				   </span>
					<input ref="username" type="text" className='form-control input-lg' placeholder='用户名' onChange={this.handleUserChange}/>
				</div>
				<div className='input-group' style={{marginTop:'5px'}}>
				   <span className="input-group-addon">
					   <i className="fa fa-unlock-alt" aria-hidden='true'></i>
				   </span>
					<input ref="password" type="password" className='form-control input-lg' placeholder='密码' onChange={this.handlePwdChange}/>
				</div>
				<input type="button" value="登录" className="btn btn-primary btn-lg btn-block" style={{marginTop:'5px'}} onClick={this.handlePost}/>
				<div className='input-group' style={{width:'100%',marginTop:'5px'}}>
					<a>注册</a>
					<div className='pull-right'>
						<a>忘记密码</a>
					</div>
				</div>
			</div>
		);
	}
}

export default WebLogin;
