// Redux
import { useDispatch, useSelector } from 'react-redux'

// Actions
import {
	setUserRegistered,
	setUserTokenToLocalStorage,
	setUserUnregistered,
} from './actions/registered'
import { loadUserData } from './actions/user'

import { useEffect } from 'react'

// Components
import RegisterModal from './Components/RegisterModal/RegisterModal'
import WelcomeWindow from './Components/WelcomeWindow/WelcomeWindow'
import Chat from './Components/Chat/Chat'
import error404 from './Components/404/404'
import LoginModal from './Components/LoginModal/LoginModal'

import { Redirect, Route, Switch } from 'react-router-dom'

const App = () => {
	// Redux base stuff
	const dispatch = useDispatch()

	// Data about either registered user or not
	const registeredState = useSelector((state) => state.registered)
	useEffect(() => {
		const isRegistered = localStorage.getItem('user')
		if (!isRegistered) {
			dispatch(setUserUnregistered())
		} else {
			dispatch(setUserRegistered())
			dispatch(setUserTokenToLocalStorage(isRegistered))
			dispatch(loadUserData())
		}
	}, [dispatch])

	// if (!localStorage.getItem('user')) {
	// 	return <Redirect to='/register' />
	// }

	return (
		<div className='app'>
			<Switch>
				<Route exact path='/register' component={RegisterModal} />
				<Route exact path='/login' component={LoginModal} />
				<Route exact path='/' component={WelcomeWindow} />
				<Route exact path='/chat' component={Chat} />
				<Route component={error404} />
			</Switch>
		</div>
	)
}

export default App
