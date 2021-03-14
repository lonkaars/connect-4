import { CSSProperties, ReactNode, useState } from 'react';
import axios from 'axios';

import { userInfo } from "../api/api";
import { AccountAvatar } from "./account";
import { Bubble, Vierkant, IconLabelButton } from './ui';

import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

export function NotificationsArea(props: {
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
	var [ gone, setGone ] = useState(false);

	return !gone && <Acceptable onAccept={() => {
		axios.request({
			method: "post",
			url: "/api/social/accept",
			headers: {"content-type": "application/json"},
			data: { "id": props.user?.id }
		})
		.then(() => setGone(true));
	}} onDeny={() => {
		axios.request({
			method: "post",
			url: "/api/social/remove",
			headers: {"content-type": "application/json"},
			data: { "id": props.user?.id }
		})
		.then(() => setGone(true));
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

/* function GameInvite(props: { */
/* 	game: gameInfo; */
/* }) { */
/* 	return <Acceptable> */
/* 		<a> */
/* 			<div style={{ */
/* 				display: "inline-block", */
/* 				verticalAlign: "top", */
/* 			}}> */
/* 				<i style={{ display: "block" }}>Partijuitnodiging</i> */
/* 				<p><b><a href={"/user?id=" + props.game.opponent?.id}>{props.game.opponent?.username}</a></b> wil een potje 4 op een rij spelen!</p> */
/* 			</div> */
/* 		</a> */
/* 	</Acceptable> */
/* } */

