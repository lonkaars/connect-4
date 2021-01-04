import { Switch, Route } from 'react-router-dom';
import './css/nomargin.css';

import home from './pages/home';

function Router() {
	return (
		<Switch>
			<Route exact path='/' component={home}/>
		</Switch>
	);
}

export default Router;

