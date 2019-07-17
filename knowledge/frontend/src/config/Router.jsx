import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../component/home/Home'
import AdminPages from '../component/admin/AdminPages'

const Router = props => {

    return(
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/admin' component={AdminPages} />
            <Redirect from='*' to='/' />
        </Switch>
    )
}

export default Router