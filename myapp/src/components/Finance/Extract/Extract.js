import React ,{Component} from 'react';
import $ from 'jquery/dist/jquery';
import show from '../../Libs/ToolTip';
import cookie from '../../Libs/Cookie';
import Title from '../../Common/Title';
import Template from '../../Common/Template';
import ModalInstance from '../../Common/ModalInstance';
import DialogConent from './DialogConent';
import CryptoJS from 'crypto-js/md5';


class Extract extends Component{
	constructor(props){
		super(props);
		this.state = {
			data:{},
			bankinfo:{}
		}
		this.sndVerifyCode = this.sndVerifyCode.bind(this);
		this.close = this.close.bind(this);
		this.updateData = this.updateData.bind(this);
		this.handleAmountChange = this.handleAmountChange.bind(this);
		this.handleCheckBalance = this.handleCheckBalance.bind(this);
		this.handleSeve = this.handleSeve.bind(this);
	}

	componentDidMount(){
		$.get('http://www.jzg.com/member/bankinfo',{accesstoken:cookie.Cookie('token')},(d)=>{
			if(d.IsError){
				show.msg(d.Msg);
				return;
			}
			this.setState({
				data:d.Data
			})
		});

		$.get('http://www.jzg.com/BankItem',{accesstoken:cookie.Cookie('token')},(d) =>{
			this.setState({
				bankinfo:d.Data.Collection || []
			});
		})
	}
	/*关闭对话框*/
	close(){
		this.refs.dialog.close();
	}
	/*更新数据*/
	updateData(d){
		this.setState({data:d});
	}
	/*发送验证码*/
	sndVerifyCode(e){
		let ele = e.target;
		$.post('http://www.jzg.com/member/sndcode',{accesstoken:cookie.Cookie('token')},(d) =>{
			if(d.IsError){
				show.msg(d.Msg);
				return;
			}
			showNum();
		});

		function showNum(){
			let num = 60;
			let timer = window.setInterval(() => {
				num--;
				ele.innerHTML = '发送验证码(' + num + 's)';
				ele.setAttribute('disabled', 'disabled');
				if (num === 0) {
					clearInterval(timer);
					ele.innerHTML = '发送验证码';
					ele.removeAttribute('disabled');
				}
			}, 1000);
		}
	}

	/*验证提现金额*/
	handleAmountChange(e){
		const btn = this.refs.btnok;
		btn.removeAttribute('disabled');
		const value = e.target.value;
		if(isNaN(parseFloat(value))){
			show.msg('提现金额必须为数字');
			return;
		}else{
			if(parseFloat(value) < 10){
				show.msg('提现金额不能小于最低限额');
				return;
			}
			if(parseFloat(value) > 50000){
				show.msg('提现金额不能大于最高限额');
				return;
			}
		}
	}

	/*验证余额*/
	handleCheckBalance(e){
		let value = e.target.value;
		const btn = this.refs.btnok;
		$.get('http://www.jzg.com/member/checkbalance',{amount:parseFloat(value),accesstoken:cookie.Cookie('token')},(d)=>{
			if(d.IsError){
				show.msg(d.Msg);
				return;
			}
			if(!d.Data){
				show.msg('余额不足');
				btn.setAttribute('disabled','disabled');
				return;
			}else{
				btn.removeAttribute('disable');
			}
		})
	}

	/*保存提现记录*/
	handleSeve(e){
		let params = {};
		params.memberbankinfoid = this.state.data.Id;
		params.DrawCashType = this.refs.drawcashtype.innerHTML.trim();
		params.DrawCashAmount = this.refs.drawcashamount.value;
		if(params.DrawCashAmount.trim() === ''){
			show.msg('提现金额不能为空');
			return;
		}else{
			if(isNaN(parseFloat(params.DrawCashAmount.trim()))){
				show.msg('提现金额必须为数字');
				return;
			}
			if(parseFloat(params.DrawCashAmount.trim()) < 10){
				show.msg('提现金额不得小于最低限额');
				return;
			}
			if(parseFloat(params.DrawCashAmount.trim()) > 50000){
				show.msg('提现金额不得大于最高限额');
				return;
			}
		}
		let pwd = this.refs.tradepwd.value;
		if(pwd.trim() === ''){
			show.msg('交易密码不能为空');
			return;
		}
		params.TradePwd = CryptoJS(pwd).toString();
		params.verifycode = this.refs.verifycode.value;
		if(params.verifycode.trim() === ''){
			show.msg('验证码不能为空');
			return;
		}
		params.accesstoken = cookie.Cookie('token');

		const ele = e.target;
		ele.setAttribute('disabled','disabled');
		$.post('http://www.jzg.com/drawcash',params,(d) =>{
			if(d.IsError){
				show.msg(d.Msg);
				return;
			}
			show.msg('success','保存成功');
			this.refs.drawcashamount.value = '';
			this.refs.tradepwd.value = '';
			this.refs.verifycode.value = '';
		}).always(()=>{
			ele.removeAttribute('disabled');
		})
	}

	render(){
		const content = (
			<div>
				<ModalInstance backdrop='static' ref='dialog'>
					<DialogConent close={this.close} refresh={this.updateData} cb={this.sndVerifyCode} realname={this.state.data.BankCardMember} data={this.state.bankinfo}/>
				</ModalInstance>
				<Title title='人民币提现'/>
				<div style={{padding:'0 10px 0 20px'}}>
					<div>
						<div style={{backgroundColor: '#fffaf4',borderColor: '#edd9c8',marginBottom: '10px',verticalAlign: 'middle'}}>
							<span style={{fontSize: '14px',fontWeight: '700',color: '#ff6000'}}>重要提示：</span>
							为了您的帐户安全，每次人民币提现的最高限额为￥50000.0、 提现的最低限额为￥10.0， 如果您有更高的需求，
							请与网站客服联系，银行卡提现不同的银行，实际到帐时间可能会有所延时。
							人民币提现到账时间: 自2017年9月23日起，平台提现改为每天处理一次，最迟次日到账，请知悉。
						</div>
						<div style={{height:'20px'}}></div>
						<div className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-2 control-label">提现方式:</label>
								<div className="col-sm-3">
									<label className="control-label" ref="drawcashtype">银行卡</label>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">银行:</label>
								<div className="col-sm-3">
									<label className="control-label" id="bankname">{this.state.data.BankName}</label>
								</div>
								<div className="col-sm-3">
									<a style={{color:'#333',cursor:'pointer'}} onClick={() =>this.refs.dialog.open()}>修改银行卡提现信息</a>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">银行卡账号:</label>
								<div className="col-sm-3">
									<label className="control-label" id="bankcardno">{this.state.data.BankCardNo}</label>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">收款人姓名:</label>
								<div className="col-sm-3">
									<label className="control-label" id="bankcardmember">{this.state.data.BankCardMember}</label>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">开户行地址:</label>
								<div className="col-sm-3">
									<label className="control-label" id="bankaddress">{this.state.data.BankAddress}</label>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">提现金额:</label>
								<div className="col-sm-3">
									<input className="form-control" ref="drawcashamount" placeholder="提现金额" onChange={this.handleAmountChange} onBlur={this.handleCheckBalance}/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">交易密码:</label>
								<div className="col-sm-3">
									<input className="form-control" type="password" ref="tradepwd" placeholder="交易密码"/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">短信验证码:</label>
								<div className="col-sm-3">
									<input className="form-control" ref="verifycode" placeholder="验证码"/>
								</div>
								<div className="col-sm-3">
									<button className="btn btn-default" type='button' onClick={this.sndVerifyCode}>发送验证码</button>
								</div>
							</div>
							<div className="form-group">
								<label className="col-sm-2 control-label">&nbsp;</label>
								<div className="col-sm-3">
									<button className="btn btn-primary" ref='btnok' onClick={this.handleSeve}>确定提现</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
		return(
			<Template content={content}/>
		);
	}
}

export default Extract;