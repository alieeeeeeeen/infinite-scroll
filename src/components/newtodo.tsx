import React, { useRef } from 'react';

const NewTodo: React.FC = () => {

    const textInputRef = useRef<HTMLInputElement>(null);

    const todosubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enterText = textInputRef.current!.value;
    }
    
    return (
    <form onSubmit={todosubmitHandler}>
        <div>
            <label htmlFor="todo-text">todo text</label>
            <input type="text" id="todo-text" ref={textInputRef}/>
        </div>
        <button type="submit">add todo</button>
    </form>
    )
}

export default NewTodo;