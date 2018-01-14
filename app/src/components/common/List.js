import React,{Component} from 'react';
import PropTypes from 'prop-types';

export default class List extends Component{
    render(){
        const {lists,onDelete} = this.props;
        let dataSource = lists || [];
        const tr = dataSource.map((item,index) =>{
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                        <a onClick={()=>onDelete(item.id)}>删除</a>
                    </td>
                </tr>
            );
        });
        return (
            <React.Fragment>
                {tr}
            </React.Fragment>
        );
    }
}

List.propTypes = {
    lists:PropTypes.array.isRequired,
    onDelete:PropTypes.func.isRequired
};

