import { CSSProperties, useEffect, useState } from "react";
import axios from "axios";

import { LogoDark } from "../components/logo";
import { AccountAvatar } from "./account";
import { userInfo } from "../api/api";
import { NotificationsArea } from "./notificationsArea";

import Home from '@material-ui/icons/Home';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ExtensionIcon from '@material-ui/icons/Extension';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';

var NavBarItemStyle: CSSProperties = {
	margin: 12,
	marginBottom: 16,
	display: "block"
}

export function NavBar() {
	var [ loggedIn, setLoggedIn ] = useState(false);
	var [ gotData, setGotData ] = useState(false);

	var [ friendRequests, setFriendRequests ] = useState<Array<userInfo>>(null);

	var [ notificationsAreaVisible, setNotificationsAreaVisible ] = useState(false);
	var [ gotNotifications, setGotNotifications ] = useState(false);

	useEffect(() => {(async () => {
		if (gotData) return;
		if (typeof window === "undefined") return;

		var loggedIn = document.cookie.includes("token");
		setLoggedIn(loggedIn);

		if (loggedIn) {
			var friendRequestsReq = await axios.request<{ requests: Array<userInfo> }>({
				method: "get",
				url: `/api/social/list/requests`
			});
			setFriendRequests(friendRequestsReq.data.requests);
			setGotNotifications(gotNotifications || friendRequestsReq.data.requests.length > 0);
		}

		setGotData(true);
	})()}, []);

	return <div className="navbar" style={{
		width: 48,
		height: "100%",

		lineHeight: 0,

		backgroundColor: "var(--background)",
		display: "inline-block",

		position: "fixed",
		top: 0,
		left: 0,

		overflow: "visible",
		whiteSpace: "nowrap",
		zIndex: 2
	}}>
		<div style={NavBarItemStyle}><LogoDark/></div>
		<a href="/" style={NavBarItemStyle}><Home/></a>
		<a href="/game" style={NavBarItemStyle}><VideogameAssetIcon/></a>
		{ false && <a href="/" style={NavBarItemStyle}><ExtensionIcon/></a> }
		<a href="/search" style={NavBarItemStyle}><SearchIcon/></a>

		<div style={{
			position: "absolute",
			bottom: -4,
			left: 0,
			backgroundColor: "var(--background)"
		}}>
			{ loggedIn && <a style={{
				overflow: "visible",
				position: "relative",
				...NavBarItemStyle
			}}>
				<div style={{ cursor: "pointer" }} onClick={() => setNotificationsAreaVisible(!notificationsAreaVisible)}>
					<NotificationsIcon/>
					{ gotNotifications && <div style={{
						backgroundColor: "var(--disk-a)",
						width: 8, height: 8,
						borderRadius: 4,
						position: "absolute",
						top: 2, right: 2
					}}/> }
				</div>
				<NotificationsArea
					visible={notificationsAreaVisible}
					friendRequests={friendRequests}/>
			</a> }
			<a href={loggedIn ? "/user" : "/login"} style={NavBarItemStyle}>
				{
					loggedIn ?
					<AccountAvatar size={24} round/> :
					<PersonIcon/>
				}
			</a>
			{ loggedIn && <a href="/settings" style={NavBarItemStyle}><SettingsIcon/></a> }
		</div>
	</div>
}

