import { Switch, Route } from 'react-router-dom';

import './global.css';

import HomePage from './pages/home';
import SettingsPage from './pages/settings';

export default function Router() {
	return <Switch>
		<Route exact path='/' component={HomePage}/>
		<Route exact path='/settings' component={SettingsPage}/>
	</Switch>;
}

