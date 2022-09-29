import React, { useContext, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import moment from 'moment'
import { CheckedUser } from '../model/CheckedUser'
import ManageButtons from './ManageButtons'
import { AppContext } from '../context'

const AdminPanel = () => {
	const { users, setUsers } = useContext(AppContext)
	const [checkedUsers, setCheckedUsers] = useState<CheckedUser[]>([])

	const manageUsers = (
		e: React.ChangeEvent<HTMLInputElement>,
		userId: String
	) => {
		const isUserOnTheList = checkedUsers?.filter(
			(user) => user.userId === userId
		)
		if (isUserOnTheList.length > 0) {
			checkedUsers?.map((user) => {
				if (user.userId === userId) {
					user.isBlocked = e.target.checked
				}
			})
			setCheckedUsers([...checkedUsers])
		} else {
			setCheckedUsers((prevCheckedUsers) => [
				...prevCheckedUsers,
				{ userId: userId, isBlocked: e.target.checked },
			])
		}
	}
	return (
		<>
			<ManageButtons checkedUsers={checkedUsers} />
			<Table striped bordered hover variant='dark'>
				<thead>
					<tr>
						<th style={{ width: '30px' }}></th>
						<th>#</th>
						<th>Name</th>
						<th>Email</th>
						<th>Blocked</th>
						<th>Registration date</th>
						<th>Login date</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users?.map((user, index) => {
							return (
								<tr key={`user-${index}`}>
									<td>
										<Form.Check
											inline
											name={`${user._id}`}
											type='checkbox'
											id={`${user.name}-${index}`}
											onChange={(e) => {
												manageUsers(e, user._id)
											}}
										/>
									</td>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.blocked ? 'blocked' : '-'}</td>
									<td>
										{moment(user.registration_time).format('l, h:mm:ss a')}
									</td>
									<td>{moment(user.login_time).format('l, h:mm:ss a')}</td>
								</tr>
							)
						})}
				</tbody>
			</Table>
		</>
	)
}

export default AdminPanel
