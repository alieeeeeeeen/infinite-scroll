import React from 'react';

interface TodoProps {
    items: {id: string, text: string}[];
}

const TodoList: React.FC<TodoProps> = (props) => {
    return <ul>
        {props.items.length && props.items.map(v => <li key={v.id}>{v.text}</li>)}
    </ul>
}

export default TodoList;