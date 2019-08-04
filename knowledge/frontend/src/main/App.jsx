import 'font-awesome/css/font-awesome.css'
import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteUser } from '../store/actions/utilActions'
import { baseApiUrl } from '../global'
import axios from 'axios'
import '../config/axios'

import Header from '../component/template/Header'
import Content from '../component/template/Content'
import Menu from '../component/template/Menu'
import Footer from '../component/template/Footer'

function App({ utilState, userState, removeUser }) {

	const hiddenMenu = utilState.menuNavToggle && !!userState ? '' : 'menu-hidden'

	const tokenValidation = async _ => {
		const validation = await axios.post(`${baseApiUrl}/validateToken`, userState)
		if (!validation.data) {
			removeUser()
		}
	}

	!!userState && tokenValidation()

	return (
		<BrowserRouter>
			<div className={`app ${hiddenMenu}`}>
				<Header title="Cod3er - Base de Conhecimento" />
				<Content />
				{!!userState && <Menu />}
				<Footer />
			</div>
		</BrowserRouter>
	);
}

const mapStateToProps = (state) => {
	return {
		userState: state.userState,
		utilState: state.utilState
	}
}

const mapDispatchToProps = dispatch => {
	return {
		removeUser: value => dispatch(deleteUser(value))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
