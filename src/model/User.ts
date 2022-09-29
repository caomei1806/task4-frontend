export type User = {
	_id: String,
	name: String,
	email: String,
	blocked?: Boolean,
	registration_time?: Date,
	login_time?: Date
}