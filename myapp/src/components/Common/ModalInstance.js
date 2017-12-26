import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';

class ModalInstance extends Component{
	constructor(...args){
		super(...args);
		this.state={
			showModal:false,
			title:'',
		}
	}

	close(){
		this.setState({showModal:false,title:''});
	}

	open(title){
		this.setState({showModal:true,title:title});
	}

	render(){
		if(this.props.showFoot){
			return(
				<div>
					<Modal backdrop={this.props.backdrop} show={this.state.showModal} onHide={this.close.bind(this)}>
						<Modal.Header closeButton>
							<Modal.Title>{this.state.title}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{this.props.children}
						</Modal.Body>
						<Modal.Footer>
							<Button>取消</Button>
							<Button bsStyle="primary">确定</Button>
						</Modal.Footer>
					</Modal>
				</div>
			);
		}
		return(
			<div>
				<Modal backdrop={this.props.backdrop} show={this.state.showModal} onHide={this.close.bind(this)}>
					<Modal.Header closeButton>
						<Modal.Title>{this.state.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{this.props.children}
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}


export  default ModalInstance;