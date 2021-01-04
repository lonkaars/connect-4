import { Switch, Route } from 'react-router-dom';

import './css/nomargin.css';
import './css/color.css';
import './css/link.css';

import HomePage from './pages/home';

function Router() {
	return <Switch>
		<Route exact path='/' component={HomePage}/>
	</Switch>;
}

export default Router;

