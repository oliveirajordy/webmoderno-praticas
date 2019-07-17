import React from 'react'
import './PageTitle.css'

const PageTitle = props => {

    return (
        <div className="page-title">
            <h1><i className={props.icon}></i> {props.main}</h1>
            <h2>{props.sub}</h2>
            <hr />
        </div>
    )
}

export default PageTitle