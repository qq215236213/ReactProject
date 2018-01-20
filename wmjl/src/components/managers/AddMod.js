import React,{Component} from 'react';
import {Input,Select,Icon,Form} from 'antd';
import PropTypes from 'prop-types';
import EditPwd from './EditPwd';
import ConfirmEditPwd from './ConfirmEditPwd';
const Option = Select.Option;
const FormItem = Form.Item;


 class AddMod extends Component{
	constructor(props){
		super(props);
		this.state = {
			disabled:this.props.disabled,
			needcheckstate:false
		}
		this.checkPassword = this.checkPassword.bind(this);
		this.editPwdChkChange = this.editPwdChkChange.bind(this);
	}

	 checkPassword(rule,value,callback){
		 const form = this.props.form;
		 if(value && value !== form.getFieldValue('password')){
			 callback('两次输入的密码不一致!');
		 }else {
			 callback();
		 }
	 }

     editPwdChkChange(){
		this.setState({disabled:!this.state.disabled,needcheckstate:!this.state.needcheckstate});
	 }

	render(){
		const {showCurStus,showEditPwdChk} = this.props;
		const {disabled,needcheckstate} = this.state;
		const {getFieldDecorator,getFieldProps} = this.props.form;
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


		const passwordProps =  getFieldProps('password',{
            rules:[{
                required:true,message:'密码不能为空'
            }]
		});
		const confirmPwdProps = getFieldProps('confirmpassword',{
            rules:[{
                required:true,message:'确认密码不能为空'
            },{
                validator:this.checkPassword
            }]
		});

		const pwdInput = () =>{
            if(needcheckstate){
                return (
                    <EditPwd Disabled={disabled} editPwdChkChange={this.editPwdChkChange}
							 {...passwordProps}
					/>
				);
            }else{
                return (
                    <EditPwd Disabled={disabled} editPwdChkChange={this.editPwdChkChange}
                    />
				);
            }
		};

		const confirmPwdInput = () =>{
			if(needcheckstate){
                return (
                    <ConfirmEditPwd Disabled={disabled} {...confirmPwdProps}/>
				);
			}else{
				return (
                    <ConfirmEditPwd Disabled={disabled}/>
				);
			}
		}

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
					{
						showEditPwdChk
							?
							pwdInput()
							:
						<Input {...passwordProps}
								placeholder="密码"
							   	prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
							   	type={'password'}
						/>
                    }
				</FormItem>
				<FormItem	{...formItemLayout}
							 label={'确认密码'}
				>
					{confirmPwdInput()}
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
			</Form>
		);
	}
}

AddMod.propTypes = {
	showCurStus:PropTypes.bool,
	showEditPwdChk:PropTypes.bool,
    disabled:PropTypes.bool
}

export default Form.create()(AddMod);