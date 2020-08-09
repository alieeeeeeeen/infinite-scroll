import React from 'react';
import Input from './input';
import { template, Product } from '../util';

interface State {
    [key: string]: any
}

@template('<h1>hello world</h1>', 'test')
class Form extends React.Component<State> {
    title = 'test'
    state: State = {
        form: {
            name: {
                elementInputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                validation: {
                    required: true
                },
                value: '',
                valid: false,
                touchend: false
            },
            password: {
                elementInputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your password'
                },
                validation: {
                    required: true
                },
                value: '',
                valid: false,
                touchend: false
            },
            gender: {
                elementInputType: 'select',
                elementConfig: {
                    options: [
                        {value: '1', displayValue: 'male'},
                        {value: '0', displayValue: 'female'}
                    ]
                },
                validation: {
                    required: true
                },
                value: '',
                valid: false,
                touchend: false
            }
        }
    }

    componentDidMount() {
        const a = new Product('1', 1);
        a.price = 2;
        console.log(a)
    }

    checkValid(value: string, validation: any) {
        let isValid = true;
        if(validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        return isValid;
    }

    inputChangedHandler = (e: any, inputIdentifier: string) => {
        const updatedForm = {
            ...this.state.form
        }

        const updatedElementForm = {
            ...this.state.form[inputIdentifier],
            value: e.target.value,
            touchend: true
        }

        updatedElementForm.valid = this.checkValid(e.target.value, updatedElementForm.validation);

        updatedForm[inputIdentifier] = updatedElementForm;
        this.setState({
            form: updatedForm
        })
        
    }

    render() {
        const formElementsArray = []; // convert config to elements array
        for(let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            })
        }
        let form = (
            <form>
                <div id="test"></div>
               {formElementsArray.map(v => (
                   <Input key={v.id}
                          value={v.config.value}
                          elementType={v.config.elementInputType}
                          elementConfig={v.config.elementConfig}
                          invalid={!v.config.valid}
                          touchend={v.config.touchend}
                          changed={(event: any) => this.inputChangedHandler(event, v.id)}
                    />
               ))}
            </form>
        )
        return form;
    }
}

export default Form;