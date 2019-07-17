import React from 'react'
import './Content.css'

import Router from '../../config/Router'
import Notifications from '../notfications/Notifications'

export default props => {

    return (
        <div className="content">
            <Router />
            <Notifications />
        </div>
    )
}