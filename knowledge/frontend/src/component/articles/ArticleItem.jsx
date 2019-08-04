import React from 'react'
import './ArticleItem.css'

import img from '../../assets/article.png'

import { Link } from 'react-router-dom'

const ArticleItem = props => {

    const imgUrl = !!props.imgUrl ? props.imgUrl : img

    return (
        <div className="article-item">
            <Link to={`/articles/${props.id}`} >
                <div className="article-item-image d-none d-sm-block">
                    <img src={imgUrl} alt={`Article ${props.name}`} />
                </div>
                <div className="article-item-info">
                    <h2>{props.name}</h2>
                    <p>{props.description}</p>
                    <span className="article-item-author">
                        <strong>Autor: </strong>{props.author}
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default ArticleItem