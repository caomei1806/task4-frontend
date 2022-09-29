import axios from 'axios'
import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Navigation = () => {
	const { loggedInUser } = useGlobalContext()

	return (
		<div>
			<Navbar bg='dark' variant='dark'>
				<Container>
					<Navbar.Brand as={Link} to='/login'>
						Account Manager
					</Navbar.Brand>
					{loggedInUser && loggedInUser.length > 0 && (
						<Nav className='me-auto'>
							<Nav.Link as={Link} to='/admin-panel' className='px-5'>
								Admin panel
							</Nav.Link>
						</Nav>
					)}

					<Nav className='ml-auto'>
						{(!loggedInUser || loggedInUser.length === 0) && (
							<>
								<Nav.Link as={Link} to='/register' className='px-5'>
									Sign up
								</Nav.Link>
								<Nav.Link as={Link} to='/login'>
									Sign in
								</Nav.Link>
							</>
						)}
						{loggedInUser && loggedInUser.length > 0 && (
							<Nav.Link as={Link} to='/logout'>
								Sign out
							</Nav.Link>
						)}
					</Nav>
				</Container>
			</Navbar>
		</div>
	)
}

export default Navigation
