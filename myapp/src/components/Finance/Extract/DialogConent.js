import React,{Component} from 'react';
import $ from 'jquery/dist/jquery.min';
import cookie from '../../Libs/Cookie';
import show from '../../Libs/ToolTip';

class DialogConent extends Component{
	constructor(props){
		super(props);
		this.handlePost = this.handlePost.bind(this);
	}

	handlePost(e){
		let params = {};
		params.bankid = this.refs.bankid.value || 0;
		if(params.bankid === 0){
			show.msg('请选择银行类型');
			return;
		}
		let bankcard = this.refs.bankcardno.value;
		if(bankcard.trim() === ''){
			show.msg('银行卡号不能为空');
			return;
		}
		let bankcard2 = this.refs.bankcardno2.value;
		if(bankcard !== bankcard2){
			show.msg('两次输入的银行卡卡号不一致');
			return;
		}

		params.bankcardno = bankcard;
		params.bankaddress = this.refs.bankaddress.value;
		params.verifycode = this.refs.verifycode.value;

		if(params.verifycode.trim() === ''){
			show.msg('验证码不能为空');
			return;
		}
		params.accesstoken=cookie.Cookie('token');

		var oEle = e.target;
		oEle.setAttribute('disabled','disabled');
		$.post('http://www.jzg.com/member/editbankinfo',params,(d)=>{
			if(d.IsError){
				show.msg(d.Msg);
				return;
			}

			let data = {};
			const ele = this.refs.bankid;
			let selectIndex = ele.selectedIndex;
			data.BankName = ele.options[selectIndex].text;
			data.BankCardNo = params.bankcardno;
			data.BankCardMember = this.props.realname;
			data.BankAddress = params.bankaddress;

			show.msg('success','修改成功');
			setTimeout(()=>{
				if(this.props.close){
					this.props.close();
				}
				if(this.props.refresh){
					this.props.refresh(data);
				}

			},300);
		}).always(()=>{
			oEle.removeAttribute('disabled');
		})

	}



	render(){
		const options = (
			this.props.data.map((item,index) =>{
				return (
					<option value={item.Id} key={index}>{item.BankName}</option>
				);
			})
		)

		return (
			<div className="form-horizontal">
				<div className="form-group">
					<label className="col-sm-3 control-label">银行卡类型:</label>
					<div className="col-sm-5">
						<select className="form-control" ref="bankid" aria-hidden="true">
							{options}
						</select>
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-3 control-label">银行卡账号:</label>
					<div className="col-sm-5">
						<input className="form-control" placeholder="银行卡账号" ref='bankcardno'/>
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-3 control-label">确认银行卡账号:</label>
					<div className="col-sm-5">
						<input className="form-control" placeholder="银行卡账号" ref="bankcardno2"/>
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-3 control-label">收款人姓名:</label>
					<div className="col-sm-5">
						<input className="form-control" value={this.props.realname} readOnly="true"/>
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-3 control-label">开户行地址:</label>
					<div className="col-sm-5">
						<input className="form-control" placeholder="开户行地址" ref="bankaddress"/>
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-3 control-label">短信验证码:</label>
					<div className="col-sm-5">
						<input className="form-control" placeholder="验证码" ref="verifycode"/>
					</div>
					<div className="col-sm-3">
						<a className="btn btn-default" onClick={(e) => {if(this.props.cb) this.props.cb(e);}}>发送验证码</a>
					</div>
				</div>
				<div className="form-group">
					<label className="col-sm-3 control-label">&nbsp;</label>
					<div className="col-sm-5">
						<button className="btn btn-primary" style={{width:'100px'}} onClick={this.handlePost}>确定</button>
					</div>
				</div>
			</div>
		);
	}
}

export default DialogConent;