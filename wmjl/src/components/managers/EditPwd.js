import React ,{ Component } from 'react';
import {Checkbox,Input,Icon} from 'antd';
import PropTypes from 'prop-types';

export default class EditPwd extends Component{
    render(){
        const {editPwdChkChange,Disabled } = this.props;
        const checkbox = <Checkbox onChange={editPwdChkChange}>修改</Checkbox>;

        return (
            <Input placeholder="密码"
                   prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                   type={'password'}
                   addonAfter={checkbox}
                   disabled={Disabled}
            />
        );
    }
}

EditPwd.propTypes = {
    editPwdChkChange:PropTypes.func,
    Disabled:PropTypes.bool
}