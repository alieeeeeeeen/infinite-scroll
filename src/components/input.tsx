import React from 'react';
import './input.css';

const Input = (props: any) => {

    let inputElement = null;
    const inputClasses = ['InputElement'];

    if (props.invalid && props.touchend) {
        inputClasses.push('invalid');
    }

    switch(props.elementType) {
        case('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
        break;
        case('text'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
        break;
        case('select'):
            inputElement = <select
                className={inputClasses.join(' ')}
                onChange={props.changed}
                value={props.value}
            >
                {props.elementConfig.options.map((option: any) => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>
            break;
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