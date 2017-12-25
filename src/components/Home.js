import React ,{Component} from 'react';
import {createStore} from 'redux';
import  {connect} from 'react-redux'

class Home extends Component{
    render(){
        const {text,onChangeTxt,onBtnClick} = this.props;
        return (
            <div>
                <h1 onClick={onChangeTxt}>{text}</h1>
                <button onClick={onBtnClick}>Click Me</button>
            </div>
        );
    }
}

//action
const changeTxtAction = {
    type:'CHANGE_TEXT'
}

const buttonClickAction = {
    type:'BUTTON_CLICK'
}

//reducer
const initialState = {
    text:'Hello'
}

const reducer = (state=initialState,action) =>{
    switch (action.type){
        case 'CHANGE_TEXT':
            return {
                text:state.text === 'Hello'?'World':'Hello'
            }
        case 'BUTTON_CLICK':
            return {
                text:'Hello World'
            }
        default:
            return state;
    }
}


//store
let store = createStore(reducer);

//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        text:state.text
    }
}

//映射Redux actions 到组件的属性
function mapDispatchToProps(dispath) {
    return {
		onChangeTxt:()=>dispath(changeTxtAction),
		onBtnClick:()=>dispath(buttonClickAction)
    }
}

Home = connect(mapStateToProps,mapDispatchToProps)(Home);

export {Home,store};