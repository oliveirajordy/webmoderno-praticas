import React from 'react'
import './Toast.css'

const Toast = props => {

    const type = props.type === 'success' ? 'bg-success' : 'bg-danger'

    return (
        <div className="toast show" key={props.index}>
            <div className={`toast-body text-white ${type}`}>
                {props.msg}
            </div>
        </div>
    )
}

export default Toast