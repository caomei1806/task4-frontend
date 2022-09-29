import React from 'react'
import './App.scss'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Register from './components/Register'
import NotFound from './components/NotFound'
import AdminPanel from './components/AdminPanel'
import Logout from './components/Logout'

function App() {
	return (
		<div className='App'>
			<Router>
				<header className='App-header'>
					<Navbar />
				</header>
				<main className='p-5'>
					<Routes>
						<Route path='/' element={<Login />} />
						<Route path='/login' element={<Login />} />
						<Route path='/logout' element={<Logout />} />
						<Route path='/register' element={<Register />} />
						<Route path='/admin-panel' element={<AdminPanel />} />

						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
			</Router>
		</div>
	)
}

export default App
