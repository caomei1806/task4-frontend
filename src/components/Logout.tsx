import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { URL } from '../setup'

const Logout = () => {
	const { loggedInUser, setLoggedInUser } = useGlobalContext()
	const navigate = useNavigate()

	const logout = async () => {
		await axios
			.delete(`${URL}/auth/logout`, { withCredentials: true })
			.then(() => {
				setLoggedInUser('')
				navigate('/login')
			})
	}
	useEffect(() => {
		logout()
	}, [])
	return <div>Logout</div>
}

export default Logout
