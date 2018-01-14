import React,{ Component } from 'react';
import {Input,Button} from 'antd';
import PropTypes from 'prop-types';

export default class AddInput extends Component{
    render(){
        const {onChange,value,onClick} = this.props;
        return (
            <div className={'inline'}>
                <Input type={'text'} value={value} onChange={onChange} style={{width:'65%'}}/>
                <Button type={'primary'} onClick={onClick}>添加</Button>
            </div>
        );
    }
}

AddInput.propTypes = {
    onChange:PropTypes.func.isRequired,
    onClick:PropTypes.func.isRequired,
    value:PropTypes.string.isRequired
};