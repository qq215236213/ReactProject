import React , {Component} from 'react';
import {createForm} from 'rc-form';

class UserInfoHead extends Component{

	render(){
		return (
			<div style={{padding:'0 10px 5px 20px'}}>
				<div className="form-horizontal" style={{border:'1px solid #e4e4e4'}}>
					<div className="form-group">
						<label className="col-sm-2 control-label">UID:</label>
						<div className="col-sm-3">
							<label className="control-label" id="uid"></label>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">E-mail:</label>
						<div className="col-sm-3">
							<label className="control-label" id="email"></label>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">昵称:</label>
						<div className="col-sm-3">
							<input className="form-control" ref="name" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">推广链接:</label>
						<div className="col-sm-3">
							<input className="form-control" ref="extendurl" placeholder="推广链接" />
						</div>
						<div className="col-sm-3">
							<button className="btn btn-primary" id="btnok">确定修改</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default createForm()(UserInfoHead);


