import React,{Component} from 'react';
import {Input,Select,Icon,Form} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;


class Add extends Component{
    constructor(props){
        super(props);
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

        const usernameConfig = {
            rules:[{
                required:true,message:'登录名不能为空'
            }]
        };

        const passwordConfig = {
            rules:[{
                required:true,message:'密码不能为空'
            }]
        };

        const confirmPwdConfig = {
            rules:[{
                required:true,message:'确认密码不能为空'
            },{
                validator:this.checkPassword
            }]
        }
        return (
            <Form>
                <FormItem	{...formItemLayout}
                             label={'登录名'}
                >
                    {getFieldDecorator('loginname',usernameConfig)(
                        <Input placeholder="登录名"
                               prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'密码'}
                >
                    {
                            getFieldDecorator('password',passwordConfig)(
                                <Input placeholder="密码"
                                       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       type={'password'}
                                />
                            )
                    }
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'确认密码'}
                >
                    {
                        getFieldDecorator('confirmpassword', confirmPwdConfig)(
                        <Input placeholder="确认密码"
                               prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type={'password'}
                        />)
                    }
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'是否管理员'}
                >
                    {isSystemSelector}
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(Add);