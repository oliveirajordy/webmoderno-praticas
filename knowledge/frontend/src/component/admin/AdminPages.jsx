import React from 'react'
import './AdminPages.css'

import PageTitle from '../template/PageTitle'
import Tabs from './Tabs'

const AdminPages = props => {

    return (
        <div className="admin-pages">
            <PageTitle icon='fa fa-cogs' main='Administração do Sistema' 
                sub='Cadastros & Cie' />
            <Tabs />
        </div>
    )
}

export default AdminPages