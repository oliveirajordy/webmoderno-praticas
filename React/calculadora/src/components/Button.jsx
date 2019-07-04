import React from 'react'
import './Button.css'

export default props => {
    let classExtra = props.classExtra ? " "+props.classExtra : ""
    return <button className={"button"+classExtra} 
            onClick={e => props.click && props.click(props.label)}>
                {props.label}
            </button>
}