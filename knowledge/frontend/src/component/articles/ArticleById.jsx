import React, { useState } from 'react'
import './ArticleById.css'

import { baseApiUrl } from '../../global'
import axios from 'axios'

import PageTitle from '../template/PageTitle'

const INITIAL_STATE = {
    get: true,
    article: {
        content: '',
        name: '',
        description: '',
        userId: '',
        categoryId: ''
    }
}

const ArticleById = props => {

    const { match: { params } } = props
    const [data, setData] = useState(INITIAL_STATE)

    const getArticle = async _ => {
        const resp = await axios(`${baseApiUrl}/articles/${params.id}`)
        setData({ get: false, article: resp.data })
    }

    data.get && getArticle()

    return (
        <div className="article-by-id">
            <PageTitle main={data.article.name} sub={data.article.description} icon=""  />
            <div className="article-content" dangerouslySetInnerHTML={{ __html: data.article.content }} />
        </div>

    )
}

export default ArticleById