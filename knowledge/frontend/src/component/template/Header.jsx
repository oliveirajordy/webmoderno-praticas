import React from 'react'
import './Header.css'

import UserDropdown from './UserDropdown'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { menuNavToggle } from '../../store/actions/utilActions'

const Header = ({ utilState, userState, props, menuNavToggleChange }) => {

    const faAngle = utilState.menuNavToggle ? 'fa-angle-left' : 'fa-angle-down'

    return (
        <header className="header">
            {!!userState && <a className="toggle" onClick={() => menuNavToggleChange(utilState.menuNavToggle)}>
                <i className={`fa fa-lg ${faAngle}`}></i>
            </a>}
            <h1 className="title">
                <Link to='/'>{props.title}</Link>
            </h1>
            {!!userState && <UserDropdown />}
        </header>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        userState: state.userState,
        utilState: state.utilState,
        props: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        menuNavToggleChange: (value) => dispatch(menuNavToggle(!value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)