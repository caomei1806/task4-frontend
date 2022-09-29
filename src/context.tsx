import axios from 'axios'
import React, {
	useContext,
	useState,
	createContext,
	useEffect,
	useCallback,
} from 'react'
import { User } from './model/User'
const URL = 'http://localhost:5000/api/v1'

interface AppContextInterface {
	users: User[] | []
	setUsers: (Users: User[]) => void
	trigger: Boolean | undefined
	setTrigger: (trigger: Boolean) => void
	loggedInUser: String | undefined
	setLoggedInUser: (userId: String) => void
}
const defaultUser: User = {
	_id: '',
	name: '',
	email: '',
}
const defaultAppContext: AppContextInterface = {
	users: [defaultUser],
	setUsers: (users) => console.warn(`no user provided: ${users}`),
	trigger: false,
	setTrigger: (trigger) => console.warn(`trigger`),
	loggedInUser: '',
	setLoggedInUser: (user) => console.warn(`no user provided: ${user}`),
}

const AppContext = createContext<AppContextInterface>(defaultAppContext)
const AppProvider = ({ children }: React.PropsWithChildren<unknown>) => {
	const [users, setUsers] = useState<User[]>([defaultUser])
	const [loggedInUser, setLoggedInUser] = useState<String>()
	const [trigger, setTrigger] = useState<Boolean>(false)
	// const [errors, setErrors] = useState<Error[]>([])

	const getUsers = async () => {
		const res = await axios.get(`${URL}/users`, { withCredentials: true })
		const data = await res
		console.log(data.data.users)
		setUsers([...data.data.users])
	}
	useEffect(() => {
		if (loggedInUser) {
			const timeout = setInterval(() => {
				getUsers()
				console.log('triggered')
			}, 10000)
			return () => clearInterval(timeout)
		}
	}, [users])
	useEffect(() => {
		const timeout = setTimeout(() => {
			getUsers()
			console.log('triggered')
		}, 300)
		return () => clearTimeout(timeout)
	}, [trigger, loggedInUser])
	return (
		<AppContext.Provider
			value={{
				users,
				setUsers,
				trigger,
				setTrigger,
				loggedInUser,
				setLoggedInUser,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}
export { AppContext, AppProvider }
