import axios from 'axios'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../model/Auth'
import { URL } from '../setup'

const Register = () => {
	const [auth, setAuth] = useState<Auth>()
	const navigate = useNavigate()
	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (auth?.email && auth.password && auth.name) {
			const res = await axios.post(
				`${URL}/auth/register`,
				{
					name: auth.name,
					email: auth.email,
					password: auth.password,
				},
				{ withCredentials: true }
			)
			if (res.status === 201) {
				navigate('/login')
			}
		}
	}
	return (
		<Stack gap={2} className='col-md-5 mx-auto'>
			<Form>
				<Form.Group className='mb-3' controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter name'
						onChange={(e) => {
							setAuth({ ...auth, name: e.target.value })
						}}
					/>
				</Form.Group>
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
						Sign up
					</Button>
				</Stack>
			</Form>
		</Stack>
	)
}

export default Register
