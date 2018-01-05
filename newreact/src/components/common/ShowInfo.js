import {Modal} from 'antd';

export function ShowInfo(title,content,okFun) {
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


export function ShowSuccessInfo(title,content) {
	let tl = title || '提示';
	let cnt = content || '内容';
	const modal = Modal.success({
		title:tl,
		content:cnt
	});

	setTimeout(()=> {modal.destroy();},1000);
}