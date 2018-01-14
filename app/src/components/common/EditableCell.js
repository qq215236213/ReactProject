import React , {Component} from 'react';
import {Input,Icon} from 'antd';
import PropTypes from 'prop-types';


export default class EditableCell extends Component{
    constructor(props){
        super(props);
        this.state = {
            value:this.props.value,
            editable:false,
            showIcon:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.check = this.check.bind(this);
        this.edit = this.edit.bind(this);
        this.showEditIcon = this.showEditIcon.bind(this);
        this.hideEditIcon = this.hideEditIcon.bind(this);
    }

    handleChange(e){
        const value = e.target.value;
        this.setState({value});
    }

    check(){
        this.setState({editable:false});
        this.props.onChange && this.props.onChange(this.state.value);
    }

    edit(){
        this.setState({editable:true});
    }

    showEditIcon(){
        this.setState({showIcon:true});
    }

    hideEditIcon(){
        this.setState({showIcon:false});
    }

    render(){
        const {value,editable,showIcon} = this.state;
        return (
            <div style={{position:'relative'}}>
                {
                    editable?
                        <div style={{paddingRight:'24px'}} >
                            <Input onPressEnter={this.check} value={value} onChange={this.handleChange}/>
                            <Icon style={{position:'absolute',right:0,width:'20px',cursor:'pointer'}} type={'check'} onClick={this.check}/>
                        </div>
                        :
                        <div onMouseOver={this.showEditIcon} onMouseLeave={this.hideEditIcon}>
                            {value || ' '}
                            {
                                showIcon?
                                    <Icon style={{position:'absolute',right:0,width:'20px',cursor:'pointer'}} type={'edit'} onClick={this.edit}/>
                                    :
                                    ''
                            }
                        </div>
                }
            </div>
        );
    }
}

EditableCell.propTypes = {
    value:PropTypes.string.isRequired,
}
