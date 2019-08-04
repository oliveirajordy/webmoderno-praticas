import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from '../component/home/Home'
import AdminPages from '../component/admin/AdminPages'
import ArticlesByCategory from '../component/articles/ArticlesByCategory'
import ArticleById from '../component/articles/ArticleById'
import Auth from '../component/auth/Auth'


const Router = ({ userState }) => {

    return (
        <Switch>
            {!!userState && <Route exact path='/' component={Home} />}
            {userState && userState.admin && <Route path='/admin' component={AdminPages} />}
            <Route path='/categories/:id/articles' component={ArticlesByCategory} />
            <Route path='/articles/:id' component={ArticleById} />
            {!userState && <Route path='/auth' component={Auth} />}
            {!userState && <Redirect from='*' to='/auth' />}
            {!!userState && <Redirect from='*' to='/' />}
        </Switch>
    )
}

const mapStateToProps = state => {
    return {
        userState: state.userState
    }
}

export default connect(mapStateToProps)(Router)