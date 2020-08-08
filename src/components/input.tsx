import React from 'react';
import './input.css';

const Input = (props: any) => {
    let inputElement = null;

    switch(props.elementType) {
        case('input'):
            inputElement = <input
                className='InputElement'
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
        case('text'):
            inputElement = <textarea
                className='InputElement'
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
        case('select'):
            inputElement = <select
                className='InputElement'
                onChange={props.changed}
                value={props.value}
            >
                {props.elementConfig.options.map((option: any) => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>
        default:
            inputElement = <input
                className='InputElement'
                onChange={props.changed}
                value={props.value}
            />
    }

    return (
        <div className='input'>
            <label className='label'>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;