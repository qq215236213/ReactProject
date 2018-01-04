import React , { Component } from 'react';
import { Form,Icon,Button,Checkbox,Input } from 'antd';
const FormItem = Form.Item;

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

		}
		if(password === ''){

		}

		// this.props.form.validateFields((err,values) =>{
		//
		// });
	}

	componentDidMount(){
		// console.log(this.userInput.input);
		// console.log(this.passwordInput.input);
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