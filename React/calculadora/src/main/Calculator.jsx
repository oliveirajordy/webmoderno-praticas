import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values:[0,0],
    current:0
}

export default class Calculator extends Component {

    state = {...initialState}

    constructor(props){
        super(props)
        this.setOperation = this.setOperation.bind(this)
        this.setDigit = this.setDigit.bind(this)
        this.clearDisplay = this.clearDisplay.bind(this)
    }
    
    clearDisplay(){
        this.setState({...initialState})
    }

    
    setDigit(d){
        if(d === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + d
        this.setState({displayValue, clearDisplay: false})
        
        if(d !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    setOperation(operation){
        if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            switch (currentOperation) {
                case '+':
                    values[0] = (parseFloat(values[0]) + parseFloat(values[1])).toString()
                    values[1] = 0
                    break;
                case '-':
                    values[0] = (parseFloat(values[0]) - parseFloat(values[1])).toString()
                    values[1] = 0
                break;
                case '*':
                    values[0] = (parseFloat(values[0]) * parseFloat(values[1])).toString()
                    values[1] = 0
                break;
                case '/':
                    values[0] = (parseFloat(values[0]) / parseFloat(values[1])).toString()
                    values[1] = 0
                break;
                default:
                break;
            }
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 :1,
                clearDisplay: !equals,
                values
            })
        }
    }
    
    render(){
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearDisplay} classExtra="ac" /> 
                <Button label="/"  click={this.setOperation} classExtra="oprator" /> 
                <Button label="7"  click={this.setDigit} /> 
                <Button label="8"  click={this.setDigit} /> 
                <Button label="9"  click={this.setDigit} /> 
                <Button label="*"  click={this.setOperation} classExtra="oprator" /> 
                <Button label="4"  click={this.setDigit} /> 
                <Button label="5"  click={this.setDigit} /> 
                <Button label="6"  click={this.setDigit} /> 
                <Button label="-"  click={this.setOperation} classExtra="oprator" /> 
                <Button label="1"  click={this.setDigit} /> 
                <Button label="2"  click={this.setDigit} /> 
                <Button label="3"  click={this.setDigit} /> 
                <Button label="+"  click={this.setOperation} classExtra="oprator" /> 
                <Button label="0"  click={this.setDigit} classExtra="zero" /> 
                <Button label="."  click={this.setDigit} /> 
                <Button label="="  click={this.setOperation} classExtra="oprator" /> 
            </div>
        )
    }

}