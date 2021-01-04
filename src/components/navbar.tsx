import "../css/navbar.css";

import { LogoDark } from "../components/logo";

import Home from '@material-ui/icons/Home';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ExtensionIcon from '@material-ui/icons/Extension';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';


function NavBar() {
	return (
		<div className="navbar">
			<LogoDark/>
			<a href="/"><Home/></a>
			<a href="/"><VideogameAssetIcon/></a>
			<a href="/"><ExtensionIcon/></a>
			<a href="/"><SearchIcon/></a>

			<div className="settings">
				<a href="/"><SettingsIcon/></a>
			</div>
		</div>
	);
}

export default NavBar;
