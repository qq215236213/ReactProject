import React , { Component } from 'react';
import {Button,Modal} from 'antd';
import PropTypes from 'prop-types';


export default class ButtonCustom extends Component{
	render(){
		const {showBatchDelButton,onAdd,onBatchDel,dialogTitle,
				dialogIsShow,dialogOkFunc,dialogCancelFunc,dialogWidth,showFooter,modalChildren} = this.props;
		const footer = (
			<div>
				<Button key="back" onClick={dialogCancelFunc}>取消</Button>,
				<Button key="submit" type="primary" onClick={dialogOkFunc}>
					确定
				</Button>
			</div>
		);
		return (
			<div style={{marginBottom:'10px',float:'left'}}>
				<Button icon={'user-add'} type={'primary'} onClick={onAdd}>新增</Button>
				<Button style={{marginLeft:'5px',display:showBatchDelButton?'':'none'}} onClick={onBatchDel}>批量删除</Button>
				<Modal	title={dialogTitle}
						visible={dialogIsShow}
						onOk={dialogOkFunc}
						onCancel={dialogCancelFunc}
						width={dialogWidth||520}
					    maskClosable={false}
					    footer={showFooter?footer:null}
					    destroyOnClose={true}
				>
					{modalChildren}
				</Modal>
			</div>
		);
	}
}

ButtonCustom.propTypes = {
	showBatchDelButton:PropTypes.bool,
	onAdd:PropTypes.func,
	onBatchDel:PropTypes.func,
	dialogTitle:PropTypes.string,
	dialogIsShow:PropTypes.bool,
	dialogOkFunc:PropTypes.func,
	dialogCancelFunc:PropTypes.func,
	dialogWidth:PropTypes.number,
	showFooter:PropTypes.bool,
	modalChildren:PropTypes.object
}

