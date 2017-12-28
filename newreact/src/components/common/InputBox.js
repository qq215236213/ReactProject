import React , { Component } from 'react';
import { Input } from 'antd';
const Search = Input.Search;

export default class InputBox extends Component{
    constructor(props){
        super(props);
        this.pressEnterHandle = this.pressEnterHandle.bind(this);
        this.searchTest = this.searchTest.bind(this);
    }

    pressEnterHandle(e,cb){
        let txt = e.target.value;
        if(cb){
            cb(txt);
        }
    }

    searchTest(txt,cb){
        if(cb){
            cb(txt);
        }
    }

    render(){
        return (
            <div>
                <Search onPressEnter={(e,cb) => this.pressEnterHandle(e,this.props.cb)} onSearch={(txt,cb) =>this.searchTest(txt,this.props.cb)} placeholder="input text" enterButton="确定" size="large" />
            </div>
        );
    }
}