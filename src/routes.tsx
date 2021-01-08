import { Switch, Route } from 'react-router-dom';

import './global.css';

import HomePage from './pages/home';
import SettingsPage from './pages/settings';
import GamePage from './pages/game';

export default function Router() {
	return <Switch>
		<Route exact path='/' component={HomePage}/>
		<Route exact path='/settings' component={SettingsPage}/>
		<Route exact path='/game' component={GamePage}/>
	</Switch>;
}

