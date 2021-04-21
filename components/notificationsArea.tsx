import axios from 'axios';
import { ReactNode, useContext, useEffect, useState } from 'react';

import { gameInfo, userInfo } from '../api/api';
import { AccountAvatar } from './account';
import { ToastContext } from './toast';
import { Bubble, IconLabelButton, Vierkant } from './ui';

import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';

export function NotificationsArea(props: {
	visible?: boolean;
	friendRequests?: Array<userInfo>;
	gameInvites?: Array<gameInfo>;
	rerender: () => void;
}) {
	var { toast } = useContext(ToastContext);
	var [previousMessages, setPreviousMessages] = useState(0);
	var messages = (
		(props.friendRequests ? props.friendRequests.length : 0)
		+ (props.gameInvites ? props.gameInvites.length : 0)
	);

	useEffect(() => {
		if (messages > previousMessages) {
			toast({
				message: 'Je hebt nieuwe meldingen!',
				type: 'confirmation',
				icon: <NotificationsActiveOutlinedIcon />,
			});
		}

		setPreviousMessages(messages);
	});

	return props.visible && <Bubble className='notificationsArea bg-700 pad-l'>
		<h2 className='title'>Meldingen</h2>
		<div className='inner round-t'>
			{props.gameInvites?.map(game => <GameInvite hide={props.rerender} game={game} />)}
			{props.friendRequests?.map(user => <FriendRequest hide={props.rerender} user={user} />)}
			{messages == 0
				&& <div className='noMsgsWrapper posabs a0'>
					<h1 className='posabs abscenter subtile'>
						Geen meldingen
					</h1>
				</div>}
		</div>
	</Bubble>;
}

function Acceptable(props: {
	children?: ReactNode;
	onAccept?: () => void;
	onDeny?: () => void;
}) {
	return <Vierkant className='acceptable bg-800 round-t pad-m fullwidth'>
		<div className='posrel'>
			{props.children}
			<div className='sidebyside buttons'>
				<IconLabelButton
					className='accept'
					onclick={props.onAccept}
					icon={<DoneIcon />}
					text='Accepteren'
				/>
				<IconLabelButton
					className='deny'
					onclick={props.onDeny}
					icon={<CloseIcon />}
					text='Verwijderen'
				/>
			</div>
		</div>
	</Vierkant>;
}

function FriendRequest(props: {
	user: userInfo;
	hide: () => void;
}) {
	var [gone, setGone] = useState(false);

	var hide = () => {
		setGone(true);
		props.hide();
	};

	return !gone && <Acceptable
		onAccept={() => {
			axios.request({
				method: 'post',
				url: '/api/social/accept',
				headers: { 'content-type': 'application/json' },
				data: { 'id': props.user?.id },
			})
				.then(hide);
		}}
		onDeny={() => {
			axios.request({
				method: 'post',
				url: '/api/social/remove',
				headers: { 'content-type': 'application/json' },
				data: { 'id': props.user?.id },
			})
				.then(hide);
		}}
	>
		<a href={'/user?id=' + props.user.id}>
			<AccountAvatar size={48} id={props.user.id} />
			<div className='userInfo dispinbl valigntop'>
				<i className='dispbl'>Vriendschapsverzoek</i>
				<b>{props.user.username}</b>
			</div>
		</a>
	</Acceptable>;
}

function GameInvite(props: {
	game: gameInfo;
	hide: () => void;
}) {
	return <Acceptable>
		<a>
			<div className='userInfo dispinbl valigntop'>
				<i className='dispbl'>Partijuitnodiging</i>
				<p>
					<b>
						<a href={'/user?id=' + props.game.opponent?.id}>{props.game.opponent?.username}</a>
					</b>{" "}
					wil een potje 4 op een rij spelen!
				</p>
			</div>
		</a>
	</Acceptable>;
}
