import React, { useState } from 'react'
import './Home.css'

import PageTitle from '../template/PageTitle'
import Stat from './Stat'

import axios from 'axios'
import { baseApiUrl } from '../../global'

const Home = (props) => {

    const [data, setData] = useState({})

    const getData = async () => {
        const res = await axios.get(`${baseApiUrl}/stats`)
        if (data.categories !== res.data.categories) setData(res.data)
    }

    getData()

    return (
        <div className="home">
            <PageTitle icon='fa fa-home' main='Dashboard'
                sub='Base de Conhecimento' />
            <div className="stats">
                <Stat title='Categorias' icon='fa fa-folder'
                    value={data.categories} color='#d54d50' />
                <Stat title='Artigos' icon='fa fa-file'
                    value={data.articles} color='#3bc480' />
                <Stat title='Usuários' icon='fa fa-user'
                    value={data.users} color='#3282cd' />
            </div>
        </div>
    )
}

export default Home