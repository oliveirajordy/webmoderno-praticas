import React from 'react'

import Pagination from '../template/Pagination'

const ArticleTable = props => {

    return (
        <div className="article-table">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.articles.map(article => (
                        <tr key={article.name}>
                            <td>{article.id}</td>
                            <td>{article.name}</td>
                            <td>{article.description}</td>
                            <td>
                                <button className="btn btn-warning m-1" onClick={() => props.focus(article.id, 'edit')} ><i className="fa fa-pencil" ></i></button>
                                <button className="btn btn-danger m-1" onClick={() => props.focus(article.id, 'delete')} ><i className="fa fa-trash-o" ></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination page={props.page} count={props.count} limit={props.limit} nextPage={props.nextPage} />
        </div>
    )
}

export default ArticleTable