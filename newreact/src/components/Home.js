import React ,{Component} from 'react';
import  {connect} from 'react-redux'
import {changeTxtAction,buttonClickAction} from './redux/action';

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

//reducer
/*function homeReducer(state={text:'Hello'},action){
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
}*/


//映射Redux state到组件的属性
function mapStateToProps(state) {
    return {
        text:state.home.text
    }
}

//映射Redux actions 到组件的属性
function mapDispatchToProps(dispath) {
    return {
		onChangeTxt:()=>dispath(changeTxtAction),
		onBtnClick:()=>dispath(buttonClickAction)
    }
}

//store
//let store = createStore(homeReducer);
Home = connect(mapStateToProps,mapDispatchToProps)(Home);

// export {Home,homeReducer};
export default Home;