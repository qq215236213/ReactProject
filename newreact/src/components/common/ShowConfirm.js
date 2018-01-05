import { Modal } from 'antd';
const confirm = Modal.confirm;

export function ShowConfirm({title,content,okFun,cancelFun}) {
	confirm({
		title:title||'提示',
		content:content||'内容',
		onOk:function () {
			if(typeof okFun === 'function'){
				okFun();
			}
		},
		onCancel:function () {
			if(typeof cancelFun === 'function'){
				cancelFun();
			}
		}
	});
}
