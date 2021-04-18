import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { userGames, userGameTotals, userInfo } from '../api/api';
import { Footer } from '../components/footer';
import { SocketContext } from '../components/socketContext';

import { AccountAvatar } from '../components/account';
import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import RecentGames from '../components/recentGames';
import { Button, Vierkant } from '../components/ui';

import ExtensionIcon from '@material-ui/icons/Extension';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

import { mdiRobotExcited } from '@mdi/js';
import Icon from '@mdi/react';

function LoginOrRegisterBox() {
	return <div className='inner'>
		<span className='registerMessage posabs h0 t0'>
			Log in of maak een account aan om toegang tot meer functies te krijgen
		</span>
		<div className='sidebyside posabs h0 b0'>
			<Button href='/register' text='Registreren' className='register' />
			<Button href='/login' text='Inloggen' className='login' />
		</div>
	</div>;
}

function AccountBox(props: {
	info: userInfo;
	sumGameInfo: userGameTotals;
}) {
	return <div className='inner profile'>
		<div className='picture posabs l0 t0'>
			<AccountAvatar size={90} />
		</div>
		<div className='info posabs t0'>
			<h2 className='username truncate'>{props.info?.username}</h2>
			<p className='score'>Score: {props.info?.rating}</p>
			<p className='games posabs b0 l0'>
				<span className='outcome win'>{props.sumGameInfo?.win} W</span>
				<span className='divider'>/</span>
				<span className='outcome lose'>{props.sumGameInfo?.lose} V</span>
				<span className='divider'>/</span>
				<span className='outcome draw'>{props.sumGameInfo?.draw} G</span>
			</p>
		</div>
	</div>;
}

export default function HomePage() {
	var server = typeof window === 'undefined';
	var loggedIn = !server && document.cookie.includes('token');

	var { io } = useContext(SocketContext);
	useEffect(() => {
		io.on('connect', () => {
			console.log('gert');
		});
	}, []);

	var [userInfo, setUserInfo] = useState<userInfo>();
	var [gameInfo, setGameInfo] = useState<userGames>();

	useEffect(() => {
		(async () => {
			if (!loggedIn) return;
			var userInfoReq = await axios.request<userInfo>({
				method: 'get',
				url: `/api/user/info`,
				headers: { 'content-type': 'application/json' },
			});
			setUserInfo(userInfoReq.data);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (!loggedIn) return;
			var userGamesReq = await axios.request<userGames>({
				method: 'get',
				url: `/api/user/games`,
				headers: { 'content-type': 'application/json' },
			});
			setGameInfo(userGamesReq.data);
		})();
	}, []);

	return <div>
		<NavBar />
		<CenteredPage width={802}>
			<PageTitle>4 op een rij</PageTitle>
			<div className='topbar'>
				<Vierkant className='gamemode' href='/game'>
					<VideogameAssetIcon className='icon' />
					<span className='text'>Nieuw spel</span>
				</Vierkant>
				{false
					&& <Vierkant className='gamemode' href='/'>
						<ExtensionIcon className='icon' />
						<span className='text'>Puzzels</span>
					</Vierkant>}
				{false
					&& <Vierkant className='gamemode' href='/'>
						<Icon path={mdiRobotExcited} className='icon' />
						<span className='text'>Tegen computer</span>
					</Vierkant>}
				<Vierkant className='loginOrRegisterBox pad-l'>
					{loggedIn
						? <AccountBox info={userInfo} sumGameInfo={gameInfo?.totals} />
						: <LoginOrRegisterBox />}
				</Vierkant>
			</div>
			{loggedIn
				&& <Vierkant className="fullwidth pad-l">
					<RecentGames games={gameInfo?.games} />
				</Vierkant>}
			<Vierkant className="fullwidth pad-l">
				<h2>Nieuws ofzo</h2>
				<p style={{ margin: '6px 0' }}>Chess.com heeft heel veel troep waar niemand naar kijkt</p>
			</Vierkant>
		</CenteredPage>
		<Footer />
	</div>;
}
