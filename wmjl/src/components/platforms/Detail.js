import React ,{Component} from 'react';
import {Form,Select,Input} from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const Option = Select.Option;

class Detail extends Component{
    render(){
        const {data} = this.props;
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
                        <Input disabled={true} />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'平台名称'}
                >
                    {getFieldDecorator('platformname',{
                        initialValue:data.PlatformName
                    })(
                        <Input disabled={true} />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'AppKey'}
                >
                    {getFieldDecorator('appkey',{
                        initialValue:data.AppKey
                    })(
                        <Input disabled={true} />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'AppSecret'}
                >
                    {getFieldDecorator('appsecret',{
                        initialValue:data.AppSecret
                    })(
                        <Input disabled={true} />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'AuthorizeUrl'}
                >
                    {getFieldDecorator('authorizeurl',{
                        initialValue:data.AuthorizeUrl
                    })(
                        <Input disabled={true} />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'UnauthorizeUrl'}
                >
                    {getFieldDecorator('unauthorizeurl',{
                        initialValue:data.UnauthorizeUrl
                    })(
                        <Input disabled={true} />
                    )}
                </FormItem>
                <FormItem	{...formItemLayout}
                             label={'CallBackUrl'}
                >
                    {getFieldDecorator('callbackurl',{
                        initialValue:data.CallBackUrl
                    })(
                        <Input disabled={true} />
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
            </Form>
        );
    }
}
Detail.propTypes = {
    data:PropTypes.object
}
export default Form.create()(Detail);