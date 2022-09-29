import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider } from './context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<CookiesProvider>
			<AppProvider>
				<App />
			</AppProvider>
		</CookiesProvider>
	</React.StrictMode>
)
