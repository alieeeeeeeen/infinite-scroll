import React from 'react';

interface TodoProps {
    items: {id: string, text: string}[];
    onDelete: (todoId: string) => void
}

const TodoList: React.FC<TodoProps> = (props) => {
    return <ul>
        {props.items.length && props.items.map(v => (<li key={v.id}>
            <span>
                {v.text}
            </span>
            <button onClick={props.onDelete.bind(null, v.id)}>delete</button>
        </li>))}
    </ul>
}

export default TodoList;