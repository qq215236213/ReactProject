import React , { Component } from 'react';
import {Button,Modal} from 'antd';
import PropTypes from 'prop-types';


export default class ButtonCustom extends Component{
	render(){
		const {
			/**是否现实批量删除按钮 类型：bool*/
			showBatchDelButton,
			/**批量删除按钮的Icon*/
			batchDelIcon,
            /**批量删除按钮的事件 类型：func*/
            onBatchDel,
			/**新增按钮的事件 类型：func*/
			onAdd,
			/**新增按钮的Icon 类型：string*/
			addIcon,
			/**modal对话框是否显示 类型：bool*/
			dialogIsShow,
			/**modal对话框的确定按钮事件 类型：func*/
			dialogOkFunc,
            /**modal对话框的取消按钮事件 类型：func*/
			dialogCancelFunc,
			/**modal对话框的宽度 类型：number*/
			dialogWidth,
			/**是否现实modal对话框的脚页 类型：bool*/
			showFooter,
            /**modal对话框的标题 类型：string*/
            dialogTitle,
			/**modal对话框中的内容 类型：reactnode*/
			modalChildren
		} = this.props;
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
				<Button icon={addIcon} type={'primary'} onClick={onAdd}>新增</Button>
				<Button icon={batchDelIcon} style={{marginLeft:'5px',display:showBatchDelButton?'':'none'}} onClick={onBatchDel}>批量删除</Button>
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
	modalChildren:PropTypes.object,
    addIcon:PropTypes.string,
    batchDelIcon:PropTypes.string
}

