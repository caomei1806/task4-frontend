import React, { Dispatch, SetStateAction } from 'react'
import ManageButton from './ManageButton'
import Stack from 'react-bootstrap/Stack'
import { ManageButtonType } from '../model/enums/ManageButtonType'
import { CheckedUser } from '../model/CheckedUser'
import { User } from '../model/User'

interface IProps {
	checkedUsers: CheckedUser[]
}
const ManageButtons = ({ ...props }: IProps) => {
	const { checkedUsers } = props
	return (
		<Stack
			className='mb-5 w-100 justify-content-center'
			direction='horizontal'
			gap={5}
		>
			<ManageButton
				color={'primary'}
				size={'lg'}
				text={'unblock'}
				action={ManageButtonType.unblock}
				checkedUsers={checkedUsers}
			/>
			<ManageButton
				color={'secondary'}
				size={'lg'}
				text={'block'}
				action={ManageButtonType.block}
				checkedUsers={checkedUsers}
			/>
			<ManageButton
				color={'danger'}
				size={'lg'}
				text={'delete'}
				action={ManageButtonType.delete}
				checkedUsers={checkedUsers}
			/>
		</Stack>
	)
}

export default ManageButtons
