import { Switch, Route } from 'react-router-dom';

import './global.css';

import HomePage from './pages/home';
import SettingsPage from './pages/settings';
import GamePage from './pages/game';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

export default function Router() {
	return <Switch>
		<Route exact path='/' component={HomePage}/>
		<Route exact path='/settings' component={SettingsPage}/>
		<Route exact path='/game' component={GamePage}/>
		<Route exact path='/login' component={LoginPage}/>
		<Route exact path='/register' component={RegisterPage}/>
	</Switch>;
}

