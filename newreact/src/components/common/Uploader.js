import React ,{ Component } from 'react';
import { Upload,Button,Icon } from 'antd';


export default class Uploader extends Component{
	render(){
		const {fail,success,url,token,remove} = this.props;
		const prop = {
			name:'file',
			action:url,
			headers:{
				accesstoke:token
			},
			onChange(info){
				if(info.file.status !== 'uploadding'){

				}
				if(info.file.status === 'done'){
					typeof success === 'function' && success(info);
				}
				if(info.file.status === 'error'){
					typeof fail === 'function' && fail(info);
				}
			},
			defaultFileList:[],
			onRemove(info){
				typeof remove === 'function' && remove(info);
				return true;
			}
		};
		return (
			<div>
				<Upload {...prop}>
					<Button>
						<Icon type={'upload'}/>点击上传
					</Button>
				</Upload>
			</div>
		);
	}
}