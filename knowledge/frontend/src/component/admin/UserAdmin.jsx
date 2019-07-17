import React, { useState } from 'react'

import UsersTable from './UsersTable'
import UserForms from './UserForms'

import { connect } from 'react-redux'
import { baseApiUrl } from '../../global'
import { newNotification } from '../../store/actions/utilActions'
import axios from 'axios'

const INITIAL_DATA = {
    get: true,
    mode: 'save',
    user: {
        name: '',
        email: '',
        admin: false,
        password: '',
        confirmPassword: ''
    },
    users: []
}

const UserAdmin = ({ props, addNotification }) => {

    const [data, setData] = useState(INITIAL_DATA)

    const getTableData = async () => {
        const res = await axios.get(`${baseApiUrl}/users`)
        data.get && setData({ ...data, users: res.data, get: false })
    }

    const changeFild = e => {
        const fild = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const user = { ...data.user }

        user[fild] = value

        setData({ ...data, user })
    }

    const focus = (user = INITIAL_DATA.user, mode = 'save') => {
        user.password = ''
        user.confirmPassword = ''
        setData({ ...data, user, mode })
    }

    const reset = _ => {
        setData({ ...data, user: INITIAL_DATA.user, mode: 'save', get: true })
    }

    const save = _ => {
        const method = data.user.id ? 'put' : 'post'
        const id = data.user.id ? `/${data.user.id}` : ''

        axios[method](`${baseApiUrl}/users${id}`, data.user)
            .then(() => {
                addNotification({
                    type: 'success',
                    msg: data.user.id ? `Usuário ${data.user.name} atualizado com sucesso` : `Usuário ${data.user.name} salvo com sucesso`
                })
                reset()
            })
            .catch(err => {
                const msg = data.user.id ? 'Erro ao atualizar o usuário' : 'Erro ao salvar o usuário'

                addNotification({
                    type: 'fail',
                    msg: err.response.data ? err.response.data : msg
                })
            })
    }

    const remove = _ => {
        axios.delete(`${baseApiUrl}/users/${data.user.id}`)
            .then(_ => {
                addNotification({
                    title: 'Deletado',
                    msg: `Usuário ${data.user.name} removido.`
                })
                reset()
            })
            .catch(err => addNotification({
                type: 'fail',
                msg: err.response.data
            }))
    }


    getTableData()

    return (
        <div className="user-admin">
            <UserForms mode={data.mode} user={data.user}
                changeFild={changeFild} save={save} focus={focus}
                remove={remove} />
            <hr />
            <UsersTable users={data.users} focus={focus} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addNotification: value => dispatch(newNotification(value))
    }
}

const mapStateToProps = (onwProps) => {
    return {
        props: onwProps
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin)