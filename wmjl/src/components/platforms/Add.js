import React,{Component} from 'react';
import {Form,Input,message} from 'antd';
import {cookie} from "../common/cookie";
import $ from 'jquery/dist/jquery.min';
const FormItem = Form.Item;

class Add extends Component{
    constructor(props){
        super(props);
        this.state = {
            code:2
        };
        this.checkPlatFormNameExist = this.checkPlatFormNameExist.bind(this);
    }
    checkPlatFormNameExist(rule,value,callback){
        this.setState({code:0});
        if(value === '' || typeof value === 'undefined' || value === null){
            this.setState({code:-1});
            callback();
            return;
        }
        $.get('/platform/exist',{name:value,recid:0,accesstoken:cookie('token')},(d)=>{
           if(d.IsError){
               message.error(d.Msg);
               callback();
               return;
           }
           if(d.Data){
               this.setState({code:-1});
               callback('平台名称已存在');
               return;
           }
           this.setState({code:1});
            callback();
        });
    }
    render(){
        const {code} = this.state;
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
        const platformnameConfig = {
            rules:[{required:true,message:'平台名称不能为空'},{validator:this.checkPlatFormNameExist}]
        };
        const authorizeUrlConfit = {
            rules:[{required:true,message:'认证地址不能为空'}]
        };
        return (
            <Form>
                <FormItem	{...formItemLayout}
                             label={'平台编号'}
                >
                    {getFieldDecorator('platformcode')(
                        <Input placeholder="平台编号"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'平台名称'}
                            hasFeedback
                            validateStatus= {code === 0 ? 'validating':(code === 1?'success':(code ===-1?'error':''))}
                >
                    {getFieldDecorator('platformname',platformnameConfig)(
                        <Input placeholder="平台名称"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'AppKey'}
                >
                    {getFieldDecorator('appkey')(
                        <Input placeholder="AppKey"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'AppSecret'}
                >
                    {getFieldDecorator('appsecret')(
                        <Input placeholder="AppSecret"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'AuthorizeUrl'}
                >
                    {getFieldDecorator('authorizeurl',authorizeUrlConfit)(
                        <Input placeholder="AuthorizeUrl"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'UnauthorizeUrl'}
                >
                    {getFieldDecorator('unauthorizeurl')(
                        <Input placeholder="UnauthorizeUrl"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'CallBackUrl'}
                >
                    {getFieldDecorator('callbackurl')(
                        <Input placeholder="CallBackUrl"
                        />
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(Add);