import React, {Component} from 'react';
import Template from '../../Common/Template';
import ModalInstance from '../../Common/ModalInstance';
import $ from'jquery/dist/jquery.min';
import cookie from '../../Libs/Cookie';
import show from '../../Libs/ToolTip';
import CryptoJS from 'crypto-js/md5';

class Security extends Component {
	constructor(props){
		super(props);
		this.state = {
			type:0
		}
		this.handleEdit = this.handleEdit.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleSndVerifyCode = this.handleSndVerifyCode.bind(this);
	}

	handleEdit(e){
		let eventEle = e.target;

		if(eventEle.getAttribute('id') === 'editloginpwd'){
			this.setState({type:1});
			this.refs.dialog.open('修改登录密码');
		}else if(eventEle.getAttribute('id')==='edittradepwd'){
			this.setState({type:2});
			this.refs.dialog.open('修改交易密码');
		}else{
			this.setState({type:3});
			this.refs.dialog.open('修改授权码');
		}
	}

	handleSave(e){
		const eventEle = e.target;
		let params = {};
		const oldpwd = this.refs.oldpwd.value.trim();
		if(oldpwd === ''){
			show.msg('旧密码不能为空');
			return;
		}
		params.oldpwd = CryptoJS(oldpwd).toString();
		const newpwd = this.refs.newpwd.value.trim();
		const newpwd2 = this.refs.newpwd2.value.trim();
		if(newpwd === ''){
			show.msg('新密码不能为空');
			return;
		}
		if(newpwd !== newpwd2){
			show.msg('两次输入的新密码不一致');
			return;
		}
		params.newpwd = CryptoJS(newpwd).toString();
		params.verifycode = this.refs.verifycode.value.trim();
		if(params.verifycode === ''){
			show.msg('验证码不能为空');
			return;
		}
		params.accesstoken = cookie.Cookie('token');
		let url = 'http://www.jzg.com/member/editpwd';
		switch (this.state.type){
			case 1:
				url = 'http://www.jzg.com/member/editpwd';
				break;
			case 2:
				url = 'http://www.jzg.com/member/edittradepwd';
				break;
			case 3:
				url = 'http://www.jzg.com/member/editauthpwd';
				break;
			default:break;
		}

		eventEle.setAttribute('disablede','disabled');
		$.post(url,params,(d) =>{
			if(d.IsError){
				show.msg(d.Msg);
				return;
			}
			setTimeout(()=>{
				this.setState({type:0});
				this.refs.dialog.close();
			},250);
		}).always(()=>{
			eventEle.removeAttribute('disabled');
		});
	}

	handleSndVerifyCode(e){
		let ele = e.target;
		$.post('http://www.jzg.com/member/sndcode',{accesstoken:cookie.Cookie('token')},(d) =>{
			if(d.IsError){
				show.msg(d.Msg);
				return;
			}
			showNum();
		});

		function showNum(){
			let num = 60;
			let timer = window.setInterval(() => {
				num--;
				ele.innerHTML = '发送验证码(' + num + 's)';
				ele.setAttribute('disabled', 'disabled');
				if (num === 0) {
					clearInterval(timer);
					ele.innerHTML = '发送验证码';
					ele.removeAttribute('disabled');
				}
			}, 1000);
		}
	}

	render() {
		const context = (
			<div className="form-horizontal">
				<div className="form-group">
					<label className="col-sm-3 control-label">请输入原密码:</label>
					<div className="col-sm-5">
						<input className="form-control" type="password" placeholder="原密码" ref="oldpwd"/>
					</div> </div> <div className="form-group">
				<label className="col-sm-3 control-label">请输入新密码:</label>
				<div className="col-sm-5">
					<input className="form-control" type="password" placeholder="新密码" ref="newpwd"/>
				</div>
			</div>
				<div className="form-group">
					<label className="col-sm-3 control-label">请再输入一次密码:</label>
					<div className="col-sm-5">
						<input className="form-control" type="password" ref="newpwd2" placeholder="新密码"/>
					</div> </div> <div className="form-group">
				<label className="col-sm-3 control-label">短信验证码:</label>
				<div className="col-sm-5">
					<input className="form-control" placeholder="验证码" ref="verifycode"/>
				</div>
				<div className="col-sm-3">
					<a className="btn btn-default" id="btnsend" onClick={this.handleSndVerifyCode}>发送验证码</a>
				</div>
			</div>
				<div className="form-group">
					<label className="col-sm-3 control-label">&nbsp;</label>
					<div className="col-sm-5">
						<button className="btn btn-primary" style={{width:'100px'}} onClick={this.handleSave}>确定</button>
					</div>
				</div>
			</div>
		);
		const content = (
			<div>
				<ModalInstance backdrop='static' ref='dialog'>{context}</ModalInstance>
				<div style={{padding: '20px 10px 5px 20px', backgroundColor: '#fffaf4', borderColor: '#edd9c8', marginBottom: '10px', verticalAlign: 'middle'}}>
					<span style={{fontSize: '14px', fontWeight: '700', color: '#ff6000'}}>重要提示:</span>
					客服不会要求用QQ远程控制您的电脑,所有要求远程的都是
					<span style={{color: '#ff6000', fontWeight: '700'}}>骗子</span>。
					<span style={{color: '#ff6000', fontWeight: '700'}}>短信验证码、谷歌验证码非常重要，请勿透露给任何人，包括客服</span>。
				</div>
				<div style={{margin: '0 10px 0 20px', borderColor: '#ff6000 #d9d9d9 #d9d9d9', borderStyle: 'solid', borderWidth: '2px 1px 1px', float: 'left', marginBottom: '10px', width: '778px'}}>
					<h3 style={{color: '#ff6000', display: 'inline-block', fontSize: '18px', padding: '15px 20px', textAlign: 'left'}}>安全中心</h3>
					<div style={{
						background: 'none repeat scroll 0 0 #ffedda',
						border: '1px solid #fec6ad',
						color: '#656b78',
						fontSize: '12px',
						height: '54px',
						margin: '0 0 5px 20px',
						padding: '0 20px',
						width: '736px'}}>
						<span style={{
							color: '#ffffff',
							display: 'inline-block',
							float: 'left',
							fontSize: '18px',
							height: '36px',
							lineHeight: '36px',
							marginTop: '9px',
							paddingLeft: '60px',
							width: '165px'
						}}
							  className="iconred">邮箱验证</span>
						<div style={{width: '360px', fontSize: '12px', float: 'left', height: '46px', lineHeight: '23px', marginTop: '5px', paddingLeft: '20px'}}>
							<span>Email：</span><span id="email">530500556@qq.com</span>
							<br/> <span>用于登陆和找回密码</span></div>
						<div style={{float: 'right', marginTop: '17px'}}><span style={{color: '#002434', fontSize: '12px'}}><a style={{color: '#002434',cursor:'pointer',textDecorationLine:'none'}}>重发验证邮件</a></span></div>
					</div>
					<div style={{
						background: 'none repeat scroll 0 0 #f1ffe2',
						border: '1px solid #c2ee93',
						color: '#656b78',
						fontSize: '12px',
						height: '54px',
						margin: '0 0 5px 20px',
						padding: '0 20px',
						width: '736px'
					}}>
						<span
						style={{
							color: '#ffffff',
							display: 'inline-block',
							float: 'left',
							fontSize: '18px',
							height: '36px',
							lineHeight: '36px',
							marginTop: '9px',
							paddingLeft: '60px',
							width: '165px'
						}}
						className="icongreen">登陆密码</span>
						<div style={{width: '360px', fontSize: '12px', float: 'left', height: '46px', lineHeight: '46px', marginTop: '5px', paddingLeft: '20px'}}><span
							style={{fontSize: '12px'}}>开通短信验证才能进行设置</span>
						</div>
						<div style={{float: 'right', marginTop: '17px'}}><span style={{color: '#002434', fontSize: '12px'}}><a style={{color: '#002434',cursor:'pointer',textDecorationLine:'none'}} id="editloginpwd" onClick={this.handleEdit}>修改</a></span>
						</div>
					</div>
					<div style={{
						background: 'none repeat scroll 0 0 #f1ffe2',
						border: '1px solid #c2ee93',
						color: '#656b78',
						fontSize: '12px',
						height: '54px',
						margin: '0 0 5px 20px',
						padding: '0 20px',
						width: '736px'
					}}><span
						style={{
							color: '#ffffff',
							display: 'inline-block',
							float: 'left',
							fontSize: '18px',
							height: '36px',
							lineHeight: '36px',
							marginTop: '9px',
							paddingLeft: '60px',
							width: '165px'
						}}
						className="icongreen">交易密码</span>
						<div style={{width: '360px', fontSize: '12px',  float: 'left', height: '46px', lineHeight: '46px', marginTop: '5px', paddingLeft: '20px'}}><span
							style={{fontSize: '12px'}}>开通短信验证才能进行设置 </span>
						</div>
						<div style={{float: 'right', marginTop: '17px'}}>
							<span style={{color: '#002434', fontSize: '12px'}}>
								<a style={{color: '#002434',cursor:'pointer',textDecorationLine:'none'}} id="edittradepwd" onClick={this.handleEdit}>修改</a>
							</span>
						</div>
					</div>
					<div style={{
						background: 'none repeat scroll 0 0 #f1ffe2',
						border: '1px solid #c2ee93',
						color: '#656b78',
						fontSize: '12px',
						height: '54px',
						margin: '0 0 5px 20px',
						padding: '0 20px',
						width: '736px'
					}}><span
						style={{
							color: '#ffffff',
							display: 'inline-block',
							float: 'left',
							fontSize: '18px',
							height: '36px',
							lineHeight: '36px',
							marginTop: '9px',
							paddingLeft: '60px',
							width: '165px'
						}}
						className="icongreen">授权码</span>
						<div style={{width: '360px', fontSize: '12px',  float: 'left', height: '46px', lineHeight: '46px', marginTop: '5px', paddingLeft: '20px'}}><span
							style={{fontSize: '12px'}}>开通短信验证才能进行设置 </span>
						</div>
						<div style={{float: 'right', marginTop: '17px'}}>
							<span style={{color: '#002434', fontSize: '12px'}}>
								<a style={{color: '#002434',cursor:'pointer',textDecorationLine:'none'}} id="editauthpwd" onClick={this.handleEdit}>修改</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		)
		return (
			<Template content={content}/>
		)
	}
}


export default Security;