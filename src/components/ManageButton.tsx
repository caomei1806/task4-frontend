import axios from 'axios'
import React from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { CheckedUser } from '../model/CheckedUser'
import { ManageButtonType } from '../model/enums/ManageButtonType'
import { URL } from '../setup'

interface IProps {
	color: string
	size: 'sm' | 'lg' | undefined
	text: String
	action: ManageButtonType
	checkedUsers: CheckedUser[]
}
const ManageButton = ({ ...props }: IProps) => {
	const { checkedUsers, action } = props
	const { trigger, setTrigger, loggedInUser } = useGlobalContext()
	const navigate = useNavigate()

	const handleSubmit = async () => {
		switch (action) {
			case ManageButtonType.unblock:
				checkedUsers.map(async (user) => {
					if (user.isBlocked) {
						await axios.patch(
							`${URL}/users/${user.userId}`,
							{
								manageStatus: ManageButtonType.unblock,
							},
							{
								withCredentials: true,
							}
						)
					}
				})
				break
			case ManageButtonType.block:
				checkedUsers.map(async (user) => {
					if (user.isBlocked) {
						await axios
							.patch(
								`${URL}/users/${user.userId}`,
								{
									manageStatus: ManageButtonType.block,
								},
								{
									withCredentials: true,
								}
							)
							.then(() => {
								console.log(user.userId + ' ' + loggedInUser)
								if (user.userId === loggedInUser) {
									navigate('/logout')
								}
							})
					}
				})
				break
			case ManageButtonType.delete:
				checkedUsers.map(async (user) => {
					if (user.isBlocked) {
						await axios
							.delete(`${URL}/users/${user.userId}`, {
								withCredentials: true,
							})
							.then(() => {
								console.log(user.userId + ' ' + loggedInUser)
								if (user.userId === loggedInUser) {
									navigate('/logout')
								}
							})
					}
				})
				break
			default:
				break
		}
		setTrigger(!trigger)
	}
	return (
		<Button
			className='px-5'
			variant={props.color}
			size={props.size}
			onClick={() => handleSubmit()}
		>
			{props.text}
		</Button>
	)
}

export default ManageButton
