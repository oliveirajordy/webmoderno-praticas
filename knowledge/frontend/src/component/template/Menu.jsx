import React from 'react'
import './Menu.css'
import { connect } from 'react-redux'

const Menu = ({utilState, props}) => {

    const hidden = utilState.menuNavToggle ? '' : 'menu-hidden'

    return (
        <aside className={`menu ${hidden}`}>

        </aside>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        utilState: state.utilState,
        props: ownProps
    }
}

export default connect(mapStateToProps)(Menu)