import React from 'react';
import Input from './input';

interface State {
    [key: string]: any
}

class Form extends React.Component<State> {
    state: State = {
        form: {
            name: {
                elementInputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: ''
            },
            password: {
                elementInputType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your password'
                },
                value: ''
            },
            gender: {
                elementInputType: 'select',
                elementConfig: {
                    options: [
                        {value: '1', displayValue: 'male'},
                        {value: '0', displayValue: 'female'}
                    ]
                },
                value: ''
            }
        }
    }

    inputChangedHandler = (e: any, inputIdentifier: string) => {
        const updatedForm = {
            ...this.state.form
        }

        const updatedElementForm = {
            ...this.state.form[inputIdentifier],
            value: e.target.value
        }
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
               {formElementsArray.map(v => (
                   <Input key={v.id} 
                          value={v.config.value}
                          elementType={v.config.elementType}
                          elementConfig={v.config.elementConfig}
                          changed={(event: any) => this.inputChangedHandler(event, v.id)}
                    />
               ))}
            </form>
        )
        return form;
    }
}

export default Form;