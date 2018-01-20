import React ,{ Component } from 'react';
import {Input,Icon} from 'antd';
import PropTypes from 'prop-types';

export default class ConfirmEditPwd extends Component{
    render(){
        const { Disabled } = this.props;
        return (
            <Input placeholder="确认密码"
                   prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                   type={'password'}
                   disabled={Disabled}
            />
        );
    }
}


ConfirmEditPwd.propTypes = {
    Disabled:PropTypes.bool
}