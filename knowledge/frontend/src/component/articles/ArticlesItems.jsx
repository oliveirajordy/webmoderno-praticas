import React from 'react'
import './ArticlesItems.css'

import ArticleItem from './ArticleItem'

const ArticlesItems = props => {

    const articles = props.articles.map(article => {
        return (
            <li key={article.id}>
                {<ArticleItem {...article} />}
            </li>
        )
    })

    return (
        <ul>
            {articles}
        </ul>
    )
}

export default ArticlesItems