import { CSSProperties, useEffect, useState } from "react";

import { LogoDark } from "../components/logo";
import { AccountAvatar } from "./account";
import { userInfo } from "../api/api";
import { Bubble, Vierkant, Button } from './ui';

import Home from '@material-ui/icons/Home';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ExtensionIcon from '@material-ui/icons/Extension';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

function FriendRequestsBubble(props: {
	visible?: boolean;
}) {
	return props.visible && <Bubble style={{
		left: 48 + 12,
		top: 92,
		transform: "translateY(-100%)",
		textAlign: "left",
		width: 400,
		height: 450
	}} tuitjeStyle={{
		left: 12,
		bottom: 86,
		transform: "translate(-100%, 100%) rotate(90deg)"
	}}>
		<h2 style={{ marginBottom: 24 }}>Vriendschapsverzoeken</h2>
		<div style={{
			overflowY: "scroll",
			whiteSpace: "normal",
			height: 450 - 24 * 4,
			borderRadius: 6
		}}>
			<FriendRequest user={ {"id": "1398093580938", "username": "test", "status": "Lorum ipsum"} }/>
			<FriendRequest user={ {"id": "1398093580938", "username": "test", "status": "Lorum ipsum"} }/>
			<FriendRequest user={ {"id": "1398093580938", "username": "test", "status": "Lorum ipsum"} }/>
			<FriendRequest user={ {"id": "1398093580938", "username": "test", "status": "Lorum ipsum"} }/>
			<FriendRequest user={ {"id": "1398093580938", "username": "test", "status": "Lorum ipsum"} }/>
			<FriendRequest user={ {"id": "1398093580938", "username": "test", "status": "Lorum ipsum"} }/>
		</div>
	</Bubble>
}

var FriendRequestButtonStyle: CSSProperties = {
	display: "inline-block",
	padding: 12,
	borderRadius: 6,
	marginLeft: 6
};

function FriendRequest(props: {
	user: userInfo;
}) {
	return <Vierkant style={{
		borderRadius: 8,
		background: "var(--background-alt)",
		margin: 0,
		padding: 12,
		width: "100%",
		marginBottom: 12
	}}>
		<div style={{
			position: "relative"
		}}>
			<a href={"/user?id=" + props.user.id}>
				<AccountAvatar size={48} dummy/>
				<div style={{
					display: "inline-block",
					verticalAlign: "top",
					marginLeft: 6
				}}>
					<b>{props.user.username}</b>
					<p>{props.user.status}</p>
				</div>
			</a>
			<div style={{
				display: "inline-block",
				verticalAlign: "top",
				float: "right"
			}}>
				<Button style={FriendRequestButtonStyle}><DoneIcon/></Button>
				<Button style={FriendRequestButtonStyle}><CloseIcon/></Button>
			</div>
		</div>
	</Vierkant>
}


var NavBarItemStyle: CSSProperties = {
	margin: 12,
	marginBottom: 16,
	display: "block"
}

export function NavBar() {
	var [ loggedIn, setLoggedIn ] = useState(false);
	useEffect(() => setLoggedIn(document.cookie.includes("token")), []);

	var [ friendRequestDialogVisible, setFriendRequestDialogVisible ] = useState(false);

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
		zIndex: 1
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
				<div style={{ cursor: "pointer" }} onClick={() => setFriendRequestDialogVisible(!friendRequestDialogVisible)}>
					<GroupAddIcon/>
				</div>
				<div style={{
					backgroundColor: "var(--disk-a)",
					width: 8, height: 8,
					borderRadius: 4,
					position: "absolute",
					top: -2, right: -2
				}}/>
				<FriendRequestsBubble visible={friendRequestDialogVisible}/>
			</a> }
			<a href={loggedIn ? "/user" : "/login"} style={NavBarItemStyle}>
				{
					loggedIn ?
					<AccountAvatar size={24} dummy round/> :
					<PersonIcon/>
				}
			</a>
			{ loggedIn && <a href="/settings" style={NavBarItemStyle}><SettingsIcon/></a> }
		</div>
	</div>
}

