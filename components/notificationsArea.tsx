import { CSSProperties, ReactNode, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { userInfo, gameInfo } from "../api/api";
import { AccountAvatar } from "./account";
import { Bubble, Vierkant, IconLabelButton } from './ui';
import { ToastContext } from './toast';

import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';

export function NotificationsArea(props: {
	visible?: boolean;
	friendRequests?: Array<userInfo>;
	gameInvites?: Array<gameInfo>;
	rerender: () => void;
}) {
	var { toast } = useContext(ToastContext);
	var [ previousMessages, setPreviousMessages ] = useState(0);
	var messages = (
		(props.friendRequests ? props.friendRequests.length : 0) +
		(props.gameInvites ? props.gameInvites.length : 0)
	)

	useEffect(() => {
		if(messages > previousMessages) {
			toast("Je hebt nieuwe meldingen!", "confirmation", <NotificationsActiveOutlinedIcon style={{ fontSize: 32 }}/>);
		}

		setPreviousMessages(messages);
	})

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
			{ props.gameInvites?.map(game => <GameInvite hide={props.rerender} game={game}/>) }
			{ props.friendRequests?.map(user => <FriendRequest hide={props.rerender} user={user}/>) }
			{
				messages == 0 &&
				<div style={{
					position: "absolute",
					left: 0,
					right: 0,
					bottom: 0,
					top: 0
				}}>
					<h1 style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						whiteSpace: "nowrap",
						transform: "translate(-50%, -50%)",
						opacity: .7
					}}>Geen meldingen</h1>
				</div>
			}
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
	hide: () => void;
}) {
	var [ gone, setGone ] = useState(false);

	var hide = () => {
		setGone(true);
		props.hide();
	}

	return !gone && <Acceptable onAccept={() => {
		axios.request({
			method: "post",
			url: "/api/social/accept",
			headers: {"content-type": "application/json"},
			data: { "id": props.user?.id }
		})
		.then(hide);
	}} onDeny={() => {
		axios.request({
			method: "post",
			url: "/api/social/remove",
			headers: {"content-type": "application/json"},
			data: { "id": props.user?.id }
		})
		.then(hide);
	}}>
		<a href={"/user?id=" + props.user.id}>
			<AccountAvatar size={48} id={props.user.id}/>
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
	hide: () => void;
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

