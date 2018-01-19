import {Modal} from 'antd';
const confirm = Modal.confirm;

export function tipMsg(title,content,okfunc,cancelfunc) {
	confirm({
		title: title || '提示',
		content: content,
		okText: '确定',
		okType: 'danger',
		cancelText: '取消',
		onOk() {
			typeof okfunc === 'function' && okfunc();
		},
		onCancel() {
			typeof cancelfunc === 'function' && cancelfunc();
		},
	});
}