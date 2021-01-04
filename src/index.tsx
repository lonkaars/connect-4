import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from "./routes";

ReactDOM.render(
	<BrowserRouter>
		<Router />
	</BrowserRouter>,
	document.getElementById('root')
);

