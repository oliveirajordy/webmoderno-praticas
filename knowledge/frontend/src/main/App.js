import 'font-awesome/css/font-awesome.css'
import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from '../component/template/Header'
import Content from '../component/template/Content'
import Menu from '../component/template/Menu'
import Footer from '../component/template/Footer'

function App({ utilState }) {

	const hiddenMenu = utilState.menuNavToggle ? '' : 'menu-hidden'

	return (
		<BrowserRouter>
			<div className={`app ${hiddenMenu}`}>
				<Header title="Cod3er - Base de Conhecimento" />
				<Content />
				<Menu />
				<Footer />
			</div>
		</BrowserRouter>
	);
}

const mapStateToProps = state => {
	return {
		utilState: state.utilState
	}
}

export default connect(mapStateToProps)(App)
