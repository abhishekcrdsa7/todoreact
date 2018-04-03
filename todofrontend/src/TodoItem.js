import React from 'react';

const TodoItem = (props) => {
    return <li> 
            <span
            style={
                (() => {
                    return props.completed ? {textDecoration: "line-through"} : {textDecoration: "none"}
                })()} onClick={(e) => props.onToggle(props.todo)}>
                {props.name}
            </span>
            <span onClick={(e) => props.delete(props._id)}> X </span>
            </li>;
}

export default TodoItem;