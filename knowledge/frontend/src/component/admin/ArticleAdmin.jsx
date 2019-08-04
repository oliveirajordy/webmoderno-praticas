import React, { useState } from 'react'

import axios from 'axios'
import { connect } from 'react-redux'
import { baseApiUrl } from '../../global'
import { newNotification } from '../../store/actions/utilActions'


import ArticleForms from './ArticleForms'
import ArticleTable from './ArticleTable'

const INITIAL_STATE = {
    get: true,
    mode: 'save',
    categories: [],
    users: [],
    count: 1,
    limit: 3,
    page: 1,
    articles: [],
    article: {
        name: '',
        description: '',
        userId: 'null',
        categoryId: 'null',
    }
}


const ArticleAdmin = ({ props, addNotification }) => {

    const [data, setData] = useState(INITIAL_STATE)
    const [editorState, setEditorState] = useState('')

    const getAllData = async _ => {
        const articles = await axios.get(`${baseApiUrl}/articles?page=${data.page}`)
        const users = await axios.get(`${baseApiUrl}/users`)
        const categories = await axios.get(`${baseApiUrl}/categories`)

        data.get && setData({
            ...data,
            count: articles.data.count,
            limit: articles.data.limit,
            categories: categories.data,
            articles: articles.data.data,
            users: users.data,
            get: false
        })
    }

    const nextPage = page => {
        setData({ ...data, page, get: true })
    }

    const focus = (id, mode = 'save') => {
        if (id) {
            axios.get(`${baseApiUrl}/articles/${id}`)
                .then(res => {
                    const article = {
                        id: res.data.id,
                        categoryId: res.data.categoryId,
                        userId: res.data.userId,
                        name: res.data.name,
                        description: res.data.description
                    }

                    setData({ ...data, article, mode })
                    setEditorState(res.data.content)
                })
                .catch(err => {
                    addNotification({
                        type: 'fail',
                        msg: err.response.data ? err.response.data : 'Conteudo não encontrado'
                    })
                })
        } else {
            setData({ ...data, article: INITIAL_STATE.article, mode })
            setEditorState('')
        }

    }

    const reset = _ => {
        setData({ ...data, article: INITIAL_STATE.article, mode: 'save', get: true })
        setEditorState('')
    }

    const changeFild = e => {
        const fild = e.target.name
        const value = e.target.value
        const article = { ...data.article }

        article[fild] = value

        setData({ ...data, article })
    }

    const save = _ => {
        const method = data.article.id ? 'put' : 'post'
        const id = data.article.id ? `/${data.article.id}` : ''

        const content = editorState
        const sendData = {
            ...data.article,
            userId: data.article.userId === 'null' ? null : data.article.userId,
            categoryId: data.article.categoryId === 'null' ? null : data.article.categoryId,
            content
        }

        axios[method](`${baseApiUrl}/articles${id}`, sendData)
            .then(_ => {
                const msg = data.article.id ?
                    'Artigo atualizado com sucesso' : 'Artigo salvo com sucesso'
                addNotification({
                    type: 'success',
                    msg
                })
                reset()
            })
            .catch(err => {
                const msg = err.response.data ?
                    err.response.data : 'erro ao salvar/atualizar artigo'
                addNotification({
                    type: 'fail',
                    msg
                })
            })
    }

    const remove = _ => {
        axios.delete(`${baseApiUrl}/articles/${data.article.id}`)
            .then(_ => {
                addNotification({
                    type: 'success',
                    msg: 'Artigo deletado com sucesso'
                })
                reset()
            })
            .catch(err => {
                const msg = err.response.data ? err.response.data : 'Erro ao deletar artigo'
                addNotification({
                    type: 'fail',
                    msg
                })
            })
    }

    getAllData()

    return (
        <div className="article-admin">
            <ArticleForms article={data.article} changeFild={changeFild}
                categories={data.categories} users={data.users}
                editorState={editorState} setEditorState={setEditorState}
                mode={data.mode} focus={focus} save={save} remove={remove} />
            <hr />
            <ArticleTable articles={data.articles}
                focus={focus}
                count={data.count}
                limit={data.limit}
                page={data.page}
                nextPage={nextPage} />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        props: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNotification: value => dispatch(newNotification(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleAdmin)