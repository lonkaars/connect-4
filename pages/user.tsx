import Icon from '@mdi/react';
import axios from 'axios';
import { ReactNode, useContext, useEffect, useState } from 'react';

import { userGames, userInfo } from '../api/api';
import { AccountAvatar } from '../components/account';
import { Footer } from '../components/footer';
import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import RecentGames from '../components/recentGames';
import { SocketContext } from '../components/socketContext';
import { ToastContext } from '../components/toast';
import { IconLabelButton, Vierkant } from '../components/ui';

import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import {
	mdiAccountCancelOutline,
	mdiAccountMinusOutline,
	mdiAccountRemoveOutline,
	mdiCheckboxBlankCircle,
	mdiClipboardTextOutline,
	mdiEarth,
	mdiEqual,
	mdiGamepadSquareOutline,
} from '@mdi/js';

function InfoModule(props: {
	label: string;
	icon: ReactNode;
}) {
	return <div className='infoModule posrel'>
		<div className='iconWrapper posabs'>
			{props.icon}
		</div>
		<div className='labelWrapper posabs h0 b0'>
			<span className='label posabs center fullwidth'>
				{props.label}
			</span>
		</div>
	</div>;
}

export default function AccountPage() {
	var server = typeof window === 'undefined';
	var loggedIn = !server && document.cookie.includes('token');
	var pageID = server ? '' : new URLSearchParams(window.location.search).get('id');

	if (!loggedIn && !pageID) !server && window.history.go(-1);
	var reqData = loggedIn && pageID ? { 'id': pageID } : undefined;

	var [user, setUser] = useState<userInfo>();
	var [gameInfo, setGameInfo] = useState<userGames>();
	var [editingStatus, setEditingStatus] = useState(false);
	var [relation, setRelation] = useState<userInfo['relation']>('none');
	var [ownPage, setOwnPage] = useState(loggedIn && !pageID);

	var { toast } = useContext(ToastContext);
	var { io } = useContext(SocketContext);

	async function getUserData(): Promise<userInfo> {
		var userReq = await axios.request<userInfo>({
			method: 'post',
			url: `/api/user/info`,
			headers: { 'content-type': 'application/json' },
			data: reqData,
		});
		setUser(userReq.data);
		return userReq.data;
	}

	async function getRelationTo(user: userInfo) {
		var user = await getUserData();
		setRelation(user.relation || 'none');
	}

	function setIOListeners(user: userInfo) {
		io.on('changedRelation', (data: { id: string; }) => {
			if (data.id != user.id) return;
			getRelationTo(user);
		});
		io.on('incomingFriendRequest', getRelationTo);
	}

	useEffect(() => {
		(async () => {
			var user = await getUserData();

			getRelationTo(user);
			setIOListeners(user);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			var userReq = await axios.request<userInfo>({
				method: 'post',
				url: `/api/user/info`,
				headers: { 'content-type': 'application/json' },
			});
			setOwnPage(ownPage || userReq.data.id == pageID);
		})();
	}, []);

	// Get recent games
	useEffect(() => {
		(async () => {
			var userGamesReq = await axios.request<userGames>({
				method: 'post',
				url: `/api/user/games`,
				headers: { 'content-type': 'application/json' },
				data: reqData,
			});
			setGameInfo(userGamesReq.data);
		})();
	}, []);

	return <div>
		<NavBar />
		<CenteredPage width={802}>
			<PageTitle>Profiel</PageTitle>
			<Vierkant className='accountHeader w100m2m pad-l'>
				<div className='inner posrel'>
					<AccountAvatar size={128} id={user?.id || ''} />
					<div className='userInfo dispinbl valigntop'>
						<h2 className='username'>{user?.username}</h2>
						<p
							id='status'
							className='status round-t'
							contentEditable={editingStatus ? 'true' : 'false'}
							suppressContentEditableWarning={true}
						>
							{user?.status}
						</p>
					</div>
					<div className='posabs b0 r0'>
						{loggedIn && <div>
							{ownPage
								? <div>
									<IconLabelButton
										icon={<SettingsOutlinedIcon />}
										href='/settings'
										text='Instellingen'
									/>
									{!editingStatus
										? <IconLabelButton
											icon={<EditOutlinedIcon />}
											text='Status bewerken'
											onclick={() => setEditingStatus(true)}
										/>
										: <IconLabelButton
											icon={<DoneOutlinedIcon />}
											text='Status opslaan'
											onclick={() => {
												setEditingStatus(false);
												axios.request({
													method: 'post',
													url: `/api/user/status`,
													headers: { 'content-type': 'application/json' },
													data: { 'status': document.getElementById('status').innerText },
												});
											}}
										/>}
								</div>
								: <div>
									{(() => {
										var icon = {
											'blocked': <Icon size={1} path={mdiAccountCancelOutline} />,
										}[relation] || <Icon size={1} path={mdiAccountCancelOutline} />;

										var text = {
											'blocked': 'Deblokkeren',
										}[relation] || 'Blokkeren';

										return <IconLabelButton
											icon={icon}
											text={text}
											onclick={() => {
												var nextRelation = {
													'blocked': {
														'endpoint': '/api/social/unblock',
														'action': `${user.username} gedeblokkeerd`,
														'relation': 'none',
														'icon': <Icon size={1} path={mdiAccountCancelOutline} />,
													},
												}[relation] || {
													'endpoint': '/api/social/block',
													'action': `${user.username} geblokkeerd`,
													'relation': 'blocked',
													'icon': <Icon size={1} path={mdiAccountCancelOutline} />,
												};

												axios.request({
													method: 'post',
													url: nextRelation.endpoint,
													headers: { 'content-type': 'application/json' },
													data: { 'id': user?.id },
												})
													.then(() => {
														toast({
															message: nextRelation.action,
															type: 'confirmation',
															icon: nextRelation.icon,
														});
														setRelation(nextRelation.relation);
													});
											}}
										/>;
									})()}
									{(() => {
										var icon = {
											'friends': <Icon size={1} path={mdiAccountMinusOutline} />,
											'outgoing': <Icon size={1} path={mdiAccountRemoveOutline} />,
											'incoming': <PersonAddOutlinedIcon />,
										}[relation] || <PersonAddOutlinedIcon />;

										var text = {
											'friends': 'Vriend verwijderen',
											'outgoing': 'Vriendschapsverzoek annuleren',
											'incoming': 'Vriendschapsverzoek accepteren',
										}[relation] || 'Vriendschapsverzoek sturen';

										return <IconLabelButton
											icon={icon}
											text={text}
											onclick={() => {
												var nextRelation = {
													'friends': {
														'endpoint': '/api/social/remove',
														'action': `${user.username} succesvol verwijderd als vriend`,
														'relation': 'none',
														'icon': <Icon size={1} path={mdiAccountMinusOutline} />,
													},
													'outgoing': {
														'endpoint': '/api/social/remove',
														'action':
															`Vriendschapsverzoek naar ${user.username} geannuleerd`,
														'relation': 'none',
														'icon': <Icon size={1} path={mdiAccountMinusOutline} />,
													},
													'incoming': {
														'endpoint': '/api/social/accept',
														'action':
															`Vriendschapsverzoek van ${user.username} geaccepteerd`,
														'relation': 'friends',
														'icon': <PersonAddOutlinedIcon />,
													},
												}[relation] || {
													'endpoint': '/api/social/request',
													'action': `Vriendschapsverzoek gestuurd naar ${user.username}`,
													'relation': 'outgoing',
													'icon': <PersonAddOutlinedIcon />,
												};

												axios.request({
													method: 'post',
													url: nextRelation.endpoint,
													headers: { 'content-type': 'application/json' },
													data: { 'id': user?.id },
												})
													.then(() => {
														toast({
															message: nextRelation.action,
															type: 'confirmation',
															icon: nextRelation.icon,
														});
														setRelation(nextRelation.relation);
													});
											}}
										/>;
									})()}
								</div>}
						</div>}
					</div>
				</div>
			</Vierkant>
			<Vierkant className='infosection pad-l w100m2m'>
				<div className='inner sidebyside'>
					<InfoModule
						icon={<Icon size={1} path={mdiCheckboxBlankCircle} className='outcome win' />}
						label='Online'
					/>
					<InfoModule
						icon={<AssignmentIndOutlinedIcon />}
						label={(() => {
							var memberSince = 'Lid sinds';

							var registered = new Date(user?.registered);
							memberSince += ' ' + registered.toLocaleString('nl-nl', { month: 'long', day: 'numeric' });

							var currentYear = new Date().getFullYear();
							var memberYear = registered.getFullYear();
							if (currentYear != memberYear) memberSince += ' ' + memberYear;

							return memberSince;
						})()}
					/>
					<InfoModule
						icon={<PeopleOutlineOutlinedIcon />}
						label={(() => {
							var label = user?.friends.toString() + ' ';
							label += user?.friends == 1 ? 'vriend' : 'vrienden';
							return label;
						})()}
					/>
					<InfoModule icon={<Icon size={1} path={mdiEarth} />} label='Nederland' />
				</div>
			</Vierkant>
			<Vierkant className='infosection pad-l w100m2m sidebyside'>
				<div className='inner sidebyside'>
					<InfoModule
						icon={<ArrowUpwardOutlinedIcon className='outcome win' />}
						label={gameInfo?.totals.win + ' keer gewonnen'}
					/>
					<InfoModule
						icon={<Icon size={1} path={mdiEqual} className='subtile' />}
						label={gameInfo?.totals.draw + ' keer gelijkspel'}
					/>
					<InfoModule
						icon={<ArrowDownwardOutlinedIcon className='outcome lose' />}
						label={gameInfo?.totals.lose + ' keer verloren'}
					/>
					<InfoModule
						icon={<Icon size={1} path={mdiClipboardTextOutline} />}
						label={'Score: ' + user?.rating}
					/>
					<InfoModule
						icon={<Icon size={1} path={mdiGamepadSquareOutline} />}
						label={(() => {
							var label = gameInfo?.totals.games.toString() + ' ';
							label += gameInfo?.totals.games == 1 ? 'potje' : 'potjes';
							return label;
						})()}
					/>
				</div>
			</Vierkant>
			<Vierkant className='pad-l'>
				<RecentGames games={gameInfo?.games} />
			</Vierkant>
		</CenteredPage>
		<Footer />
	</div>;
}
