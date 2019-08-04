import React, { useState } from 'react'
import './Auth.css'
import logo from '../../assets/logo.png'

import axios from 'axios'
import { baseApiUrl, userKey } from '../../global'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setUser, newNotification } from '../../store/actions/utilActions'

import AuthForms from './AuthForms'

const INITIAL_STATE = {
    signup: false,
    user: {
        email: '',
        password: ''
    }
}

const Auth = ({ props, addUser, addNotification }) => {

    const [data, setData] = useState(INITIAL_STATE)
    const { history: { push } } = props

    const signin = _ => {
        axios.post(`${baseApiUrl}/signin`, data.user)
            .then(res => {
                addUser(res.data)
                addNotification({
                    type: 'success',
                    msg: 'Logado com sucesso'
                })
                localStorage.setItem(userKey, JSON.stringify(res.data))
                push('/')
            })
            .catch(res => {
                addNotification({
                    type: 'fail',
                    msg: !!res.response ? res.response.data : 'erro no servidor'
                })
            })
    }

    const signup = _ => {
        axios.post(`${baseApiUrl}/signup`, data.user)
            .then(_ => {
                addNotification({
                    type: 'success',
                    msg: 'Usuario cadastrado com sucesso'
                })
                setData({ ...data, signup: false, user: INITIAL_STATE.user })
            })
            .catch(err => {
                addNotification({
                    type: 'fail',
                    msg: !!err.response ? err.response.data : 'erro no servidor'
                })
            })
    }

    const alterSign = e => {
        e.preventDefault()
        const user = !data.signup ? { name: '', email: '', password: '', confirmPassword: '' } : INITIAL_STATE.user
        setData({ ...data, signup: !data.signup, user })
    }

    const changeFild = e => {
        const fild = e.target.name
        const value = e.target.value
        const user = { ...data.user }

        user[fild] = value

        setData({ ...data, user })
    }

    return (
        <div className="auth-content">
            <div className="auth-modal">
                <img src={logo} alt="logo" style={{ width: '200px' }} />
                <hr />
                <div className="auth-title">{data.signup ? 'Cadastro' : 'Login'}</div>
                <AuthForms
                    {...data.user}
                    signupCheck={data.signup}
                    alterSign={alterSign}
                    changeFild={changeFild}
                    signin={signin}
                    signup={signup} />
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: value => dispatch(setUser(value)),
        addNotification: value => dispatch(newNotification(value))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        props: ownProps
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth))