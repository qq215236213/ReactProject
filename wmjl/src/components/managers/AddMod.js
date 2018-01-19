import React,{Component} from 'react';
import {Input,Select,Icon,Form,Checkbox} from 'antd';
import PropTypes from 'prop-types';
const Option = Select.Option;
const FormItem = Form.Item;


 class AddMod extends Component{
	constructor(props){
		super(props);
		this.state = {
			loginname:'',
			password:'',
			confirmpassword:''
		}
		this.checkPassword = this.checkPassword.bind(this);
	}

	 checkPassword(rule,value,callback){
		 const form = this.props.form;
		 if(value && value !== form.getFieldValue('password')){
			 callback('两次输入的密码不一致!');
		 }else {
			 callback();
		 }
	 }

	render(){
		const {showCurStus,showEditPwdChk,editPwdDisabled,editPwdChkChange} = this.props;
		const {getFieldDecorator} = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 22 },
				sm: { span: 6 },
			},
			wrapperCol: {
				xs: { span: 22 },
				sm: { span: 14 },
			},
		};
		const isSystemSelector = getFieldDecorator('issystem', {
			initialValue: '0',
		})(
			<Select style={{ width: 275 }}>
				<Option value="0">否</Option>
				<Option value="1">是</Option>
			</Select>
		);
		const curStatusSelector = getFieldDecorator('curstatus', {
			initialValue: '0',
		})(
			<Select style={{ width: 275 }}>
				<Option value="0">正常</Option>
				<Option value="1">禁用</Option>
			</Select>
		);
		const checkbox = <Checkbox onChange={editPwdChkChange}>修改</Checkbox>;
		return (
			<Form>
				<FormItem	{...formItemLayout}
							label={'登录名'}
				>
					{getFieldDecorator('loginname',{
						rules:[{
							required:true,message:'登录名不能为空'
						}]
					})(
						<Input placeholder="登录名"
							   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						/>
					)}
				</FormItem>
				<FormItem	{...formItemLayout}
							 label={'密码'}
				>
					{getFieldDecorator('password',{
						rules:[{
							required:true,message:'密码不能为空'
						}]
					})(
						showEditPwdChk
							?
						<Input placeholder="密码"
							   prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							   type={'password'}
							   addonAfter={checkbox}
							   disabled={editPwdDisabled}
						/>
							:
						<Input placeholder="密码"
							   prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							   type={'password'}
						/>
					)}
				</FormItem>
				<FormItem	{...formItemLayout}
							 label={'确认密码'}
				>
					{getFieldDecorator('confirmpassword',{
						rules:[{
							required:true,message:'确认密码不能为空'
						},{
							validator:this.checkPassword
						}]
					})(
						<Input placeholder="确认密码"
							   prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							   type={'password'}
							   disabled={editPwdDisabled}
						/>
					)}
				</FormItem>
				<FormItem	{...formItemLayout}
							 label={'是否管理员'}
				>
					{isSystemSelector}
				</FormItem>
				<FormItem	{...formItemLayout}
							 label={'帐号状态'}
							 style={{display:showCurStus?'':'none'}}
				>
					{curStatusSelector}
				</FormItem>
				<button ref={(el) => this.submit = el} type={'submit'} style={{display:'none'}}>Submit</button>
			</Form>
		);
	}
}

AddMod.propTypes = {
	showCurStus:PropTypes.bool,
	showEditPwdChk:PropTypes.bool,
	editPwdDisabled:PropTypes.bool,
	editPwdChkChange:PropTypes.func
}

export default Form.create()(AddMod);