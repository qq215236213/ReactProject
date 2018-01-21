import React,{Component} from 'react';
import {Form,Input,message,Select} from 'antd';
import PropTypes from 'prop-types';
import {cookie} from "../common/cookie";
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;

class Mod extends Component{
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
        $.get('/platform/exist',{name:value,recid:this.props.data.RecId||0,accesstoken:cookie('token')},(d)=>{
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
        const {data} = this.props;
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
        return (
            <Form>
                <FormItem	{...formItemLayout}
                             label={'平台编号'}
                >
                    {getFieldDecorator('platformcode',{
                        initialValue:data.PlatformCode
                    })(
                        <Input placeholder="平台编号"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'平台名称'}
                             hasFeedback
                             validateStatus= {code === 0 ? 'validating':(code === 1?'success':(code ===-1?'error':''))}
                >
                    {getFieldDecorator('platformname',{
                        rules:[{required:true,message:'平台名称不能为空'},{validator:this.checkPlatFormNameExist}],
                        initialValue:data.PlatformName
                    })(
                        <Input placeholder="平台名称"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'AppKey'}
                >
                    {getFieldDecorator('appkey',{
                        initialValue:data.AppKey
                    })(
                        <Input placeholder="AppKey"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'AppSecret'}
                >
                    {getFieldDecorator('appsecret',{
                        initialValue:data.AppSecret
                    })(
                        <Input placeholder="AppSecret"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'AuthorizeUrl'}
                >
                    {getFieldDecorator('authorizeurl',{
                        rules:[{required:true,message:'认证地址不能为空'}],
                        initialValue:data.AuthorizeUrl
                    })(
                        <Input placeholder="AuthorizeUrl"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'UnauthorizeUrl'}
                >
                    {getFieldDecorator('unauthorizeurl',{
                        initialValue:data.UnauthorizeUrl
                    })(
                        <Input placeholder="UnauthorizeUrl"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'CallBackUrl'}
                >
                    {getFieldDecorator('callbackurl',{
                        initialValue:data.CallBackUrl
                    })(
                        <Input placeholder="CallBackUrl"
                        />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'是否停用'}
                >
                    {getFieldDecorator('isstop',{
                        initialValue:data.IsStop?'1':'0'
                    })(
                        <Select style={{ width: 275 }}>
                            <Option value="0">否</Option>
                            <Option value="1">是</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem style={{display:'none'}}
                          {...formItemLayout}
                             label={'id'}
                >
                    {getFieldDecorator('recid',{
                        initialValue:data.RecId
                    })(
                        <Input
                        />
                    )}
                </FormItem>
            </Form>
        );
    }
}
Mod.propTypes = {
    data:PropTypes.object
}

export default Form.create()(Mod);