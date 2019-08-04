import React, { useState } from 'react'
import './ArticlesByCategory.css'

import { baseApiUrl } from '../../global'
import axios from 'axios'

import PageTitle from '../template/PageTitle'
import ArticlesItems from './ArticlesItems'

const INITIAL_STATE = {
    category: {
        id: 0
    },
    articles: [],
    page: 1,
    getCategory: true,
    getArticles: true,
    moreArticles: true
}

const ArticlesByCategory = (props) => {

    const { match: { params } } = props
    const { history: { listen } } = props
    const [data, setData] = useState(INITIAL_STATE)

    const getCategory = _ => {
        axios(`${baseApiUrl}/categories/${params.id}`)
            .then(res => {
                setData({ ...data, category: res.data, getCategory: false })
            })
    }

    listen(location => {
        if (!(location.pathname.split('/')[2] === params.id)) setData({ ...INITIAL_STATE })
    })

    const getArticles = _ => {
        axios(`${baseApiUrl}/categories/${params.id}/articles?page=${data.page}`)
            .then(res => {
                const moreArticles = res.data.length > 0 ? true : false
                const articles = [...data.articles, ...res.data]
                setData({ ...data, articles, getArticles: false, moreArticles })
            })
    }

    const moreArticles = _ => {
        setData({ ...data, page: data.page + 1, getArticles: true })
    }

    data.getCategory && getCategory()
    data.getArticles && getArticles()

    return (
        <div className="articles-by-category">
            <PageTitle icon='fa fa-folder-o' main={data.category.name} sub='Categoria' />
            <ArticlesItems articles={data.articles} />
            {
                data.moreArticles &&
                <div className="load-more">
                    <button className="btn btn-outline-primary" onClick={moreArticles}>Mais Artigos</button>
                </div>
            }
        </div>
    )
}

export default ArticlesByCategory