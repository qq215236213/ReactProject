import React , {  Component  } from 'react';
import {Input} from 'antd';


export default class SearchText extends Component{
    render(){
        return (
            <div>
                <label htmlFor="">查询内容</label>
                <Input value={this.props.text} onChange={(e) => this.props.changeHandle(e.target.value)}/>
            </div>
        );
    }
}