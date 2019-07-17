import React from 'react'
import './UserDropdown.css'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Gravatar from 'react-gravatar'

const UserDropdown = ({ userState, props }) => {

    return (
        <div className="user-dropdown">
            <div className="user-button">
                <span className="d-none d-sm-block">{userState.name}</span>
                <div className="user-dropdown-img">
                    <Gravatar email={userState.email} />
                </div>
                <i className="fa fa-angle-down"></i>
            </div>
            <div className="user-dropdown-content">
                <Link to='/admin'><i className="fa fa-cogs"></i>Administração</Link>
                <a><i className="fa fa-sign-out"></i>Sair</a>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        userState: state.userState,
        props: ownProps
    }
}

export default connect(mapStateToProps)(UserDropdown)