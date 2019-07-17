import React from 'react'
import './Tabs.css'
import 'bootstrap/js/dist/tab'

import CategoryAdmin from './CategoryAdmin'
import ArticleAdmin from './ArticleAdmin'
import UserAdmin from './UserAdmin'

const Tabs = props => {

    return (
        <div className="tabs card">
            <div className="card-header pb-0  border-bottom-0 px-0">
                <ul className="nav nav-tabs px-2" >
                    <li className="nav-item">
                        <a className="nav-link active" id="categories-tab" data-toggle="tab" role="tab" aria-controls="categories" aria-selected="true" href="#categories" >Categorias</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="articles-tab" data-toggle="tab" role="tab" aria-controls="articles" aria-selected="false" href="#articles" >Artigos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="users-tab" data-toggle="tab" role="tab" aria-controls="users" aria-selected="false" href="#users" >Usuários</a>
                    </li>
                </ul>
            </div>
            <div className="card-body">
                <div className="tab-content" id="admin-pages-content">
                    <div className="tab-pane fade show active" id="categories" role="tabpanel" aria-labelledby="categories-tab">
                        <CategoryAdmin />
                    </div>
                    <div className="tab-pane fade" id="articles" role="tabpanel" aria-labelledby="articles-tab">
                        <ArticleAdmin />
                    </div>
                    <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
                        <UserAdmin />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tabs