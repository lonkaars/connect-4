import { CSSProperties, useEffect, useState, ReactNode } from "react";
import axios from "axios";

import { LogoDark } from "../components/logo";
import { AccountAvatar } from "./account";
import { userInfo, gameInfo } from "../api/api";
import { Bubble, Vierkant, IconLabelButton } from './ui';

import Home from '@material-ui/icons/Home';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ExtensionIcon from '@material-ui/icons/Extension';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

function NotificationsArea(props: {
	visible?: boolean;
	friendRequests?: Array<userInfo>;
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
		<h2 style={{ marginBottom: 24 }}>Meldingen</h2>
		<div style={{
			overflowY: "scroll",
			whiteSpace: "normal",
			height: 450 - 24 * 4,
			borderRadius: 6
		}}>
			{ /* here should be the game invites */ }
			{ props.friendRequests?.map(user => <FriendRequest user={user}/>) }
		</div>
	</Bubble>
}

var FriendRequestButtonStyle: CSSProperties = {
	borderRadius: 6,
	display: "inline-block",
	marginLeft: 0,
	textAlign: "center"
};

function Acceptable(props: {
	children?: ReactNode;
	onAccept?: () => void;
	onDeny?: () => void;
}) {
	return <Vierkant style={{
		borderRadius: 8,
		background: "var(--background-alt)",
		margin: 0,
		padding: 12,
		width: "100%",
		marginBottom: 12
	}}>
		<div style={{ position: "relative" }}>
			{props.children}
			<div style={{
				display: "grid",
				gridTemplateColumns: "1fr, 1fr",
				gridGap: 12,
				marginTop: 12,
				gridAutoFlow: "column",
			}}>
				<IconLabelButton
					onclick={props.onAccept}
					style={FriendRequestButtonStyle}
					icon={<DoneIcon/>}
					text="Accepteren"/>
				<IconLabelButton
					onclick={props.onDeny}
					style={FriendRequestButtonStyle}
					icon={<CloseIcon/>}
					text="Verwijderen"/>
			</div>
		</div>
	</Vierkant>
}

function FriendRequest(props: {
	user: userInfo;
}) {
	return <Acceptable>
		<a href={"/user?id=" + props.user.id}>
			<AccountAvatar size={48} dummy/>
			<div style={{
				display: "inline-block",
				verticalAlign: "top",
				marginLeft: 6
			}}>
				<i style={{ display: "block" }}>Vriendschapsverzoek</i>
				<b>{props.user.username}</b>
			</div>
		</a>
	</Acceptable>
}

function GameInvite(props: {
	game: gameInfo;
}) {
	return <Acceptable>
		<a>
			<div style={{
				display: "inline-block",
				verticalAlign: "top",
			}}>
				<i style={{ display: "block" }}>Partijuitnodiging</i>
				<p><b><a href={"/user?id=" + props.game.opponent?.id}>{props.game.opponent?.username}</a></b> wil een potje 4 op een rij spelen!</p>
			</div>
		</a>
	</Acceptable>
}

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
			setGotNotifications(true);
		}

		setGotData(true);
	})()});

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
					<AccountAvatar size={24} dummy round/> :
					<PersonIcon/>
				}
			</a>
			{ loggedIn && <a href="/settings" style={NavBarItemStyle}><SettingsIcon/></a> }
		</div>
	</div>
}

