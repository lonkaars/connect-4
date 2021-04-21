import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

import { userInfo } from '../api/api';
import Logo from '../components/logo';
import { AccountAvatar } from './account';
import { NotificationsArea } from './notificationsArea';
import { SocketContext } from './socketContext';

import ExtensionIcon from '@material-ui/icons/Extension';
import Home from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

export function NavBar() {
	var [loggedIn, setLoggedIn] = useState(false);
	var [gotData, setGotData] = useState(false);

	var [friendRequests, setFriendRequests] = useState<Array<userInfo>>(null);

	var [notificationsAreaVisible, setNotificationsAreaVisible] = useState(false);
	var [gotNotifications, setGotNotifications] = useState(false);

	var { io } = useContext(SocketContext);

	async function getNotifications() {
		var friendRequestsReq = await axios.request<{ requests: Array<userInfo>; }>({
			method: 'get',
			url: `/api/social/list/requests`,
		});
		setFriendRequests(friendRequestsReq.data.requests);

		setGotNotifications(friendRequestsReq.data.requests.length > 0);
	}

	useEffect(() => {
		(async () => {
			if (gotData) return;
			if (typeof window === 'undefined') return;

			var loggedIn = document.cookie.includes('token');
			setLoggedIn(loggedIn);

			if (loggedIn) {
				await getNotifications();
				io.on('incomingFriendRequest', getNotifications);
				io.on('changedRelation', getNotifications);
			}

			setGotData(true);
		})();
	}, []);

	return <div className='navbar bg-800 h100vh dispinbl t0 l0 posfix'>
		<div className='item'>
			<Logo />
		</div>
		<a href='/' className='item'>
			<Home />
		</a>
		<a href='/game' className='item'>
			<VideogameAssetIcon />
		</a>
		{false && <a href='/' className='item'>
			<ExtensionIcon />
		</a>}
		<a href='/search' className='item'>
			<SearchIcon />
		</a>

		<div className='bg-800 bottomArea'>
			{loggedIn && <a className='notifications item posrel'>
				<div
					className='iconWrapper'
					onClick={() => setNotificationsAreaVisible(!notificationsAreaVisible)}
				>
					<NotificationsIcon />
					{gotNotifications && <div className='notificationDot posabs' />}
				</div>
				<NotificationsArea
					visible={notificationsAreaVisible}
					friendRequests={friendRequests}
					rerender={getNotifications}
				/>
			</a>}
			<a href={loggedIn ? '/user' : '/login'} className='item'>
				{loggedIn
					? <AccountAvatar size={24} round />
					: <PersonIcon />}
			</a>
			{loggedIn && <a href='/settings' className='item'>
				<SettingsIcon />
			</a>}
		</div>
	</div>;
}
