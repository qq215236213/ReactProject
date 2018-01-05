import {Modal} from 'antd';

export function ShowInfo({title,content,okFun}) {
	Modal.info({
		title:title || '提示',
		content:content || '提示信息',
		onOk:function () {
			if(typeof okFun === 'function'){
				okFun();
			}
		}
	});
}