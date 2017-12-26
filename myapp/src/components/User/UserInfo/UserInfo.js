import React, {Component} from 'react';
import Template from '../../Common/Template';
import $ from 'jquery/dist/jquery.min';
import cookie from '../../Libs/Cookie';
import show from '../../Libs/ToolTip';
import UserInfoHead from './UserInfoHead';
import {createForm} from 'rc-form';

class UserInfo extends Component {
	constructor(props){
		super(props);
		this.state = {
			data:{},
			isauth:false
		}
	}

	componentDidMount(){
		$.get('http://www.jzg.com/member/memberinfo',{accesstoken:cookie.Cookie('token')},(d) =>{
			this.setState({data:d.Data});
			if(d && d.Data){
				if(d.Data.IsAuth){
					this.setState({isauth:true});
				}

				this.setState({
					name:d.Data.Name||'',
					extendurl:d.Data.ExtendUrl||''
				});
			}
		});
	}


	handleSave(){

	}

	handlerSavePic(){

	}
	render() {
		const isAuth = (state) => {
			if(state){
				return (
					<span style={{color:'red',display:'block'}}>(已认证)</span>,
						<span style={{color:'gray',display:'none'}}>(未认证)</span>
				);
			}
			return (
				<span style={{color:'red',display:'none'}}>(已认证)</span>,
					<span style={{color:'gray',display:'block'}}>(未认证)</span>
			);
		}
		const content = (
			<div>
				<div style={{padding: '5px 20px'}}>
					<h3 style={{color: '#777'}}>个人信息</h3>
				</div>
				<UserInfoHead wappendComponentRef={(inst) => this.formRef = inst} />
				<div style={{padding:'5px 20px'}}> <h3 style={{color:'#777'}}>实名认证信息</h3> </div>
				<div style={{padding:'0 10px 5px 20px'}}>
					<div style={{border:'1px solid #e4e4e4'}}>
						<ul style={{height:'140px',padding:'10px 0',listStyle:'none'}}>
							<li style={{marginLeft:'140px'}}>
								<div className='col-xs-8'>
									<div className="col-xs-7">
										<div id="cardadiv" style={{width: '125px',height: '125px',marginRight: '31px',border: '1px solid #dcdcdc',position: 'relative',float: 'left',overflow:'hidden'}}>
											<span style={{height: '30px',lineHeight: '30px',color: '#606060',background: '#eaeaea',display: 'block',textAlign: 'center'}}>手持身份证正面</span>
											<span style={{height: '95px',lineHeight: '95px',display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column'}} >
												<i id="filedataIcon" className="iconzp"></i>
												<img className="icon-thum" id="filedataImg" src={this.state.data.CardAUrl} alt=''/>
											</span>
											<span id="cardaspan" className="hide" style={{width: '100%',height: '100%',lineHeight: '123px',position: 'absolute',top: '0',left: '0',color: '#fff',textAlign: 'center',fontSize: '14px',fontWeight: 'bold',background: 'rgba(0, 0, 0, .5)',cursor: 'pointer'}} data-fileid="filedata" data-imgid="filedataImg" data-type="1" data-icon="filedataIcon">选择图片上传</span>
										</div>
										<div id="cardbdiv" style={{width: '125px',height: '125px',marginRight: '31px',border: '1px solid #dcdcdc',position: 'relative',float: 'left',overflow:'hidden'}}>
											<span style={{height: '30px',lineHeight: '30px',color: '#606060',background: '#eaeaea',display: 'block',textAlign: 'center'}}>手持身份证反面</span>
											<span  style={{height: '95px',lineHeight: '95px',display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column'}}>
												<i id="filedata2Icon" className="iconzp"></i>
												<img className="icon-thum" id="filedata2Img" alt='' src={this.state.data.CardBUrl}/>
											</span>
											<span id="cardbspan" className="hide" style={{width: '100%',height: '100%',lineHeight: '123px',position: 'absolute',top: '0',left: '0',color: '#fff',textAlign: 'center',fontSize: '14px',fontWeight: 'bold',background: 'rgba(0, 0, 0, .5)',cursor: 'pointer'}} data-fileid="filedata2" data-imgid="filedata2Img" data-type="2" data-icon="filedata2Icon">选择图片上传</span>
										</div>
									</div>
									<div className="col-xs-4" style={{color:'red',display: 'block',marginTop: '5px',marginBottom: '10px'}}>1. 身份证为jpg/png格式图片</div>
									<div className="col-xs-4" style={{color:'red',display: 'block',marginTop: '5px',marginBottom: '10px'}}>2. 上传的图片每张不超过1M</div>
								</div>
							</li>
													</ul>
						<div style={{margin:'20px 0 20px 170px'}}>
							<button className='btn btn-primary'>确认修改</button>
						</div>
					</div>
				</div>
				<div style={{padding:'10px 10px 5px 20px'}}>
					<div style={{border:'1px solid #e4e4e4'}}>
						<div className="form-horizontal"> <div className="form-group"> 
							<label className="col-sm-2 control-label">真实姓名:</label> 
							<div className="col-sm-3"> 
								<label className="control-label" id="realname">{this.state.data.RealName||''}</label>
								<label className="control-label">
									{isAuth(this.state.isauth)}
								</label> 
							</div> 
						</div> 
							<div className="form-group"> 
								<label className="col-sm-2 control-label">证件类型:</label> 
								<div className="col-sm-3"> 
									<label className="control-label" id="cardtype">{this.state.data.CardType||''}</label>
								</div> 
							</div> 
							<div className="form-group"> 
								<label className="col-sm-2 control-label">证件号码:</label> 
								<div className="col-sm-3"> 
									<label className="control-label" id="idcard">{this.state.data.IdCard||''}</label>
								</div> 
							</div> 
						</div> 
					</div> 
				</div>
			</div>
		);
		return (
			<Template content={content}/>
		);
	}
}

export default UserInfo;