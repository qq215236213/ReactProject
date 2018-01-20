import React,{Component} from 'react';
import {Input,Select,Icon,Form,Checkbox} from 'antd';
import PropTypts from 'prop-types';
const Option = Select.Option;
const FormItem = Form.Item;

class Mod extends Component{
    constructor(props){
        super(props);
        this.state = {
            disabled:true,
            needvalidcheck:this.props.needValidCheck
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
        const form = this.props.form;
        form.resetFields(['password','confirmpassword']);
        this.setState({disabled:!this.state.disabled,needvalidcheck:!this.state.needvalidcheck});
    }


    render(){
        const {data,} = this.props;
        const {disabled,needvalidcheck} = this.state;
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
            initialValue: data.IsSystemManager?'1':'0',
        })(
            data.Id ===1
                ?
                <Select style={{ width: 275 }}>
                    <Option value="1">是</Option>
                </Select>
                :
                <Select style={{ width: 275 }}>
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                </Select>
        );
        const curStatusSelector = getFieldDecorator('curstatus', {
            initialValue: data.Id===1?'0':data.CurStatus+'',
        })(
            data.Id ===1
                ?
                <Select style={{ width: 275 }}>
                    <Option value="0">正常</Option>
                </Select>
                :
                <Select style={{ width: 275 }}>
                    <Option value="0">正常</Option>
                    <Option value="1">禁用</Option>
                </Select>
        );

        const passwordConfig = {
            rules:[{
                required:true,message:'密码不能为空'
            }]
        };

        const confirmPwdConfig = {
            rules:[{
                required:true,message:'确认密码不能为空'
            }/*,{
                validator:this.checkPassword
            }*/]
        }
        const checkbox = getFieldDecorator('editchk',{initialValue:false})(<Checkbox onChange={this.editPwdChkChange}>修改</Checkbox>);
        return (
            <Form>
                <FormItem	{...formItemLayout}
                             label={'登录名'}
                >
                    {getFieldDecorator('loginname',{initialValue:data.LoginName})(
                        <Input placeholder="登录名"
                               prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                               disabled={true}
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'密码'}
                >
                    {
                        needvalidcheck
                            ?
                            getFieldDecorator('password', passwordConfig)(
                                <Input placeholder="密码"
                                       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       type={'password'}
                                       addonAfter={checkbox}
                                       disabled={disabled}
                                />
                            )
                            :
                            getFieldDecorator('password')(
                                <Input placeholder="密码"
                                       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       type={'password'}
                                       addonAfter={checkbox}
                                       disabled={disabled}
                                />
                            )
                    }
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'确认密码'}
                >
                    {
                        needvalidcheck
                            ?
                            getFieldDecorator('confirmpassword',confirmPwdConfig)(
                                <Input placeholder="确认密码"
                                       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       type={'password'}
                                       disabled={disabled}
                                />
                            )
                            :
                            getFieldDecorator('confirmpassword')(
                                <Input placeholder="确认密码"
                                       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       type={'password'}
                                       disabled={disabled}
                                />
                            )
                    }
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'是否管理员'}
                >
                    {isSystemSelector}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'帐号状态'}
                >
                    {curStatusSelector}
                </FormItem>
            </Form>
        );
    }
}

Mod.propTypes = {
    data:PropTypts.object,
    needValidCheck:PropTypts.bool
}

export default Form.create()(Mod);