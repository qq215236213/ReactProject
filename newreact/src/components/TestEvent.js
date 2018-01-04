import React , { Component } from 'react';
import $ from 'jquery';
import md5 from 'md5';
import {CookieHelper} from './common/CookieHelper';
import { Form,Icon,Button,Checkbox,Input,message } from 'antd';
const FormItem = Form.Item;

message.config({
	top:100,
});

class TestEvent extends Component{
	constructor(props){
		super(props);
		this.state = {
			rememberMeChecked:true
		}
		this.checkboxChange = this.checkboxChange.bind(this);
		this.loginSumbit = this.loginSumbit.bind(this);
	}

	checkboxChange(){
		this.setState({
			rememberMeChecked:!this.state.rememberMeChecked
		});
	}

	loginSumbit(e){
		e.preventDefault();
		const username = this.userInput.input.value;
		const password = this.passwordInput.input.value;
		if(username === ''){
			message.error('用户名不能为空');
			return;
		}
		if(password === ''){
			message.error('密码不能为空');
			return;
		}

		$.post('http://www.jfbsc.com/login',{username:username,password:md5(password).toString()},function (d) {
			console.log(d)
			if(d.IsError){
				message.error(d.Msg);
				return;
			}
			CookieHelper('username',d.Data.User.MemberName);
			CookieHelper('userid',d.Data.User.MemberId);
			CookieHelper('token',d.Data.Token);
			CookieHelper('isteammanager',d.Data.User.IsTeamManager);

			//window.location.href = '/testdemo';
		});

		// this.props.form.validateFields((err,values) =>{
		//
		// });
	}

	componentDidMount(){
		// console.log(this.userInput.input);
		// console.log(this.passwordInput.input);
		// $.post('http://www.jfbsc.com/login',{},function (d) {
		// 	console.log(d);
		// });
	}

	render(){
		const userIcon = <Icon type='user' style={{color:'rgba(0,0,0,.25)'}}/>;
		const passwordIcon = <Icon type='lock' style={{color:'rgba(0,0,0,.25)'}}/>;
		return (
			<div style={{width:'300px',margin:'100px auto'}}>
				<Form>
					<FormItem>
						<Input prefix={userIcon} placeholder='用户名' ref={el => this.userInput = el}/>
					</FormItem>
					<FormItem>
						<Input prefix={passwordIcon} placeholder={'密码'} type="password" ref={el => this.passwordInput = el}/>
					</FormItem>
					<FormItem>
						<Checkbox checked={this.state.rememberMeChecked} onChange={this.checkboxChange}>记住密码</Checkbox>
						<a href="javascript:;" className={'login-form-forget'} style={{float:'right'}}>忘记密码</a>
						<Button style={{width:'100%'}} type={'primary'} htmlType={'submit'} className={'login-form-button'} onClick={this.loginSumbit}>
							登录
						</Button>
						<a href="javascript:;">注册</a>
					</FormItem>
				</Form>
			</div>
		);
	}

	//TestEvent = Form.create()(TestEvent);
}

export default  TestEvent;