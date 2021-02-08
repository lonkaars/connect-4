import { CSSProperties, Component } from "react";
/* import axios from "axios"; */

import { LogoDark } from "../components/logo";

import Home from '@material-ui/icons/Home';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ExtensionIcon from '@material-ui/icons/Extension';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import {AccountAvatar} from "./account";

var NavBarItemStyle: CSSProperties = {
	margin: 12,
	marginBottom: 16,
	display: "block"
}

export class NavBar extends Component {
	state: {
		loggedIn: boolean
	} = {
		loggedIn: false
	}
	
	constructor(props: {}) {
		super(props);
	}

	render () {
		if (typeof window !== "undefined") { // hot garbage but werks :tada:
			var loggedIn = document.cookie.includes("token");
			if (this.state.loggedIn != loggedIn)
				this.setState({ loggedIn });
		}
		return <div className="navbar" style={{
			width: 48,
			height: "100%",

			lineHeight: 0,

			backgroundColor: "var(--background)",
			display: "inline-block",

			position: "fixed",
			top: 0,
			left: 0,

			overflow: "hidden",
			whiteSpace: "nowrap"
		}}>
			<div style={NavBarItemStyle}><LogoDark/></div>
			<a href="/" style={NavBarItemStyle}><Home/></a>
			<a href="/game" style={NavBarItemStyle}><VideogameAssetIcon/></a>
			<a href="/" style={NavBarItemStyle}><ExtensionIcon/></a>
			<a href="/search" style={NavBarItemStyle}><SearchIcon/></a>

			<div style={{
				position: "absolute",
				bottom: -4,
				left: 0,
				backgroundColor: "var(--background)"
			}}>
				<a href={this.state.loggedIn ? "/account" : "/login"} style={NavBarItemStyle}>
					{
						this.state.loggedIn ?
						<AccountAvatar size={24} dummy round/> :
						<PersonIcon/>
					}
				</a>
				<a href="/settings" style={NavBarItemStyle}><SettingsIcon/></a>
			</div>
		</div>
	}
}

