import React ,{Component} from 'react';
import  {connect} from 'react-redux'
import PropTypes from 'prop-types';

class About extends Component{
	constructor(props,context){
		super(props,context);
		this.onChangeTxt = this.onChangeTxt.bind(this);
	}

	onChangeTxt(){
		const {store} = this.context;
		store.dispatch(changeTxt);
	}

	render(){
		const {text } = this.props;
		const {store} = this.context;
		console.log(store.getState())
		return (
			<div>
				<h1 onClick={this.onChangeTxt}>{text}</h1>
			</div>
		);
	}
}

//action
const changeTxt = {
	type:'CHANGE_TEXT'
}


//reducer
const initalState = {
		text : '关于'
};
const aboutReducer = (state = initalState,action)=>{
	switch (action.type){
		case 'CHANGE_TEXT':
			return {
				text : 'about'
			}
			default:
				return state;
	}
}


//映射
function mapStateToProps(state) {
	return {
		text:state.about.text
	}
}


/*function mapDispatchToProps(dispatch) {
	return {
		onChangeTxt:()=> dispatch(changeTxt)
	}
}*/

//store
//let aboutStore = createStore(reducer);

About.contextTypes = {
	store:PropTypes.object.isRequired
}

About = connect(mapStateToProps)(About);

export {About,aboutReducer};


