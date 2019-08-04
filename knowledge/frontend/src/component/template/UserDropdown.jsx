import React from 'react'
import './UserDropdown.css'

import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { userKey } from '../../global'
import { deleteUser } from '../../store/actions/utilActions'

import Gravatar from 'react-gravatar'

const UserDropdown = ({ userState, props, removeUser }) => {

    const { history: { push } } = props
    const user = !!userState ? { ...userState } : { user: '', email: '' }

    const logout = e => {
        e.preventDefault()
        removeUser()
        push('/auth')
    }

    return (
        <div className="user-dropdown">
            <div className="user-button">
                <span className="d-none d-sm-block">{user.name}</span>
                <div className="user-dropdown-img">
                    <Gravatar email={user.email} />
                </div>
                <i className="fa fa-angle-down"></i>
            </div>
            <div className="user-dropdown-content">
                {user.admin && <Link to='/admin'><i className="fa fa-cogs"></i>Administração</Link>}
                <a href='' onClick={logout} ><i className="fa fa-sign-out"></i>Sair</a>
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

const mapDispatchToProps = dispatch => {
    return {
        removeUser: value => dispatch(deleteUser(value))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDropdown))