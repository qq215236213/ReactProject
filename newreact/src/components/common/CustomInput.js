import React,{Component} from "react";

export default class CustomInput extends Component{
    render(){
        return (
            <div>
                <input type="text" ref={e => this.props.getElement(e)}/>
            </div>
        );
    }
};