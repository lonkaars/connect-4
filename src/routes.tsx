import { Switch, Route } from 'react-router-dom';

import './global.css';

import HomePage from './pages/home';

function Router() {
	return <Switch>
		<Route exact path='/' component={HomePage}/>
	</Switch>;
}

export default Router;

