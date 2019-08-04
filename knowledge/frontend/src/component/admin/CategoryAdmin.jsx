import React, { useState } from 'react'
import './CategoryAdmin.css'

import CategoryTable from './CategoryTable'
import CategoryForms from './CategoryForms'

import axios from 'axios'
import { connect } from 'react-redux'
import { baseApiUrl } from '../../global'
import { newNotification } from '../../store/actions/utilActions'

const INITIAL_STATE = {
    get: true,
    mode: 'save',
    category: {
        name: '',
        parentId: 'null'
    },
    categories: []
}

const CategoryAdmin = ({ props, addNotfication }) => {

    const [data, setData] = useState(INITIAL_STATE)

    const getTableData = async _ => {
        const res = await axios.get(`${baseApiUrl}/categories`)
        data.get && setData({ ...data, categories: res.data, get: false })
    }

    const focus = (category = INITIAL_STATE.category, mode = 'save') => {
        setData({ ...data, category, mode })
    }

    const reset = _ => {
        setData({ ...data, mode: 'save', category: INITIAL_STATE.category, get: true })
    }

    const save = _ => {
        const method = data.mode === 'save' ? 'post' : 'put'
        const id = data.category.id ? `/${data.category.id}` : ''

        const sendCategory = { name: data.category.name, parentId: data.category.parentId }
        data.category.id && (sendCategory.id = data.category.id)
        sendCategory.parentId = sendCategory.parentId === 'null' ?
            null : data.category.parentId

        axios[method](`${baseApiUrl}/categories${id}`, sendCategory)
            .then(_ => {
                const msg = data.category.id ?
                    `Categoria ${data.category.name} atualizada` : `Categoria ${data.category.name} salva`

                addNotfication({
                    type: 'success',
                    msg
                })
                reset()
            })
            .catch(err => {
                const msg = err.response.data ?
                    err.response.data : 'Falha na Incerção/Atualização de Categoria'
                addNotfication({
                    type: 'fail',
                    msg
                })
            })
    }

    const changeFild = e => {
        const fild = e.target.name
        const value = e.target.value
        const category = { ...data.category }

        category[fild] = value

        setData({ ...data, category })
    }

    const remove = _ => {
        axios.delete(`${baseApiUrl}/categories/${data.category.id}`)
            .then(_ => {
                addNotfication({
                    type: 'success',
                    msg: 'Categoria deletada com sucesso'
                })
                reset()
            })
            .catch(err => {
                const msg = err.response.data ?
                    err.response.data : 'Erro ao deletar o Categoria'
                addNotfication({
                    type: 'fail',
                    msg
                })
            })
    }

    getTableData()

    return (
        <div className="category-admin">
            <CategoryForms mode={data.mode} focus={focus}
                changeFild={changeFild} category={data.category}
                save={save} remove={remove} categories={data.categories} />
            <hr />
            <CategoryTable categories={data.categories} mode={data.mode} focus={focus} />
        </div>
    )
}

const mapStateToProps = ownProps => {
    return {
        props: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNotfication: value => dispatch(newNotification(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdmin)