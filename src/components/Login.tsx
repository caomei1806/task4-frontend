import axios from 'axios'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { Auth } from '../model/Auth'
import { URL } from '../setup'

const Login = () => {
	const [auth, setAuth] = useState<Auth>()
	const navigate = useNavigate()
	const { setLoggedInUser } = useGlobalContext()
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (auth?.email && auth.password) {
			const res = await axios.post(
				`${URL}/auth/login`,
				{
					email: auth.email,
					password: auth.password,
				},
				{ withCredentials: true }
			)
			const user = await res
			setLoggedInUser(user.data.user.userId)
			if (res.status === 200) {
				const timeout = setTimeout(() => {
					navigate('/admin-panel')
				}, 500)
				return () => clearTimeout(timeout)
			}
		}
	}
	return (
		<Stack gap={2} className='col-md-5 mx-auto'>
			<Form>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						onChange={(e) => {
							setAuth({ ...auth, email: e.target.value })
						}}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						onChange={(e) => {
							setAuth({ ...auth, password: e.target.value })
						}}
					/>
				</Form.Group>
				<Stack gap={2} className='col-lg-5 mx-auto'>
					<Button
						variant='secondary'
						type='submit'
						onClick={(e) => handleSubmit(e)}
					>
						Sign in
					</Button>
				</Stack>
			</Form>
		</Stack>
	)
}

export default Login
