import React, { useState, useEffect } from 'react'
import './Menu.css'

import { connect } from 'react-redux'
import { baseApiUrl, mediaQuery } from '../../global'
import { withRouter } from 'react-router-dom'
import { menuNavToggle } from '../../store/actions/utilActions'
import axios from 'axios'
import TreeMenu from 'react-simple-tree-menu'

const INITIAL_TREE = [
    {
        key: '',
        label: '',
        node: []
    }
]

const Menu = ({ utilState, props, menuNavToggleChange }) => {

    const { history: { push } } = props
    const hidden = utilState.menuNavToggle ? '' : 'menu-hidden'
    const [treeData, setTreeData] = useState(INITIAL_TREE)

    useEffect(_ => {
        axios.get(`${baseApiUrl}/categories/tree`)
            .then(resp => setTreeData(resp.data))
            .catch(err => err.response)
    }, [])

    const clickFun = item => {
        push(`/categories/${item.id}/articles`)
        if (mediaQuery.sm || mediaQuery.xs) {
            menuNavToggleChange(false)
        }
    }

    return (
        <aside className={`menu ${hidden}`}>
            <TreeMenu onClickItem={clickFun} data={treeData} />
        </aside>
    )
}

const mapStateToProps = (state, ownProps) => {

    return {
        utilState: state.utilState,
        props: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        menuNavToggleChange: value => dispatch(menuNavToggle(value))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))