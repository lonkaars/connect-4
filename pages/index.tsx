import { CSSProperties, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { userInfo, userGameTotals, userGames } from '../api/api';
import { SocketContext } from '../components/socketContext';

import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant, Button } from '../components/ui';
import { AccountAvatar } from '../components/account';
import RecentGames from '../components/recentGames';

import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ExtensionIcon from '@material-ui/icons/Extension';

import Icon from '@mdi/react';
import { mdiRobotExcited } from '@mdi/js';

var GameModeIconStyle: CSSProperties = {
	fontSize: 64,
	width: 64,
	height: 64,
	display: "inline-block",
	position: "absolute",
	top: 24,
	left: "50%",
	transform: "translateX(-50%)"
}

var GameModeTextStyle: CSSProperties = {
	whiteSpace: "nowrap",
	display: "inline-block",
	position: "absolute",
	bottom: 24,
	left: "50%",
	transform: "translateX(-50%)",
	userSelect: "none",
	fontWeight: 500
}

var SquareSize: CSSProperties = {
	width: 90,
	height: 90
}

var LoginOrRegisterBoxStyle: CSSProperties = {
	verticalAlign: "top",
	height: `calc(${SquareSize.height}px + 24px * 2)`,
	width: "100%",
	maxWidth: `calc(100% - ${SquareSize.width}px - 12px * 2 - 24px * 2)`
}

var InnerLoginOrRegisterBoxStyle: CSSProperties = {
	position: "relative",
	width: "100%",
	height: "100%"
}

function LoginOrRegisterBox() {
	return <div style={{ ...InnerLoginOrRegisterBoxStyle, textAlign: "center" }}>
		<span style={{
			userSelect: "none",
			display: "inline-block",
			position: "absolute",
			fontSize: 14,
			left: 0, right: 0, top: 0,
			margin: "0 auto",
			minWidth: 240,
			maxWidth: 350
		}}>Log in of maak een account aan om je scores op te slaan en toegang te krijgen tot meer functies</span>
		<div style={{
			display: "grid",
			gridGap: 24,
			gridTemplateColumns: "1fr 1fr",
			position: "absolute",
			left: 0, right: 0, bottom: 0
		}}>
			<Button href="/register" text="Registreren" style={{ backgroundColor: "var(--background-alt)" }}/>
			<Button href="/login" text="Inloggen"/>
		</div>
	</div>
}

function AccountBox(props: {
	info: userInfo;
	sumGameInfo: userGameTotals;
}) {
	return <div style={InnerLoginOrRegisterBoxStyle}>
		<div style={{
			position: "absolute",
			top: 0, left: 0,
			...SquareSize
		}}>
			<AccountAvatar size={90}/>
		</div>
		<div style={{
			position: "absolute",
			top: 0, left: 102,
			width: "calc(100% - 90px - 12px)",
			height: "100%"
		}}>
			<h2 style={{
				maxWidth: 178,
				fontSize: 20,
				whiteSpace: "nowrap",
				overflow: "hidden",
				textOverflow: "ellipsis",
			}}>{props.info?.username}</h2>
			<p style={{ marginTop: 6 }}>Score: {props.info?.rating}</p>
			<p style={{ position: "absolute", bottom: 0, left: 0 }}>
				<span style={{ color: "var(--disk-b-text)" }}>{props.sumGameInfo?.win} W</span>
				<span style={{ margin: "0 3px" }}>/</span>
				<span style={{ color: "var(--disk-a-text)" }}>{props.sumGameInfo?.lose} V</span>
				<span style={{ margin: "0 3px" }}>/</span>
				<span style={{ opacity: .75 }}>{props.sumGameInfo?.draw} G</span>
			</p>
		</div>
	</div>
}

export default function HomePage() {
	var server = typeof window === "undefined";
	var loggedIn = !server && document.cookie.includes("token");

	var { io } = useContext(SocketContext);
	useEffect(() => {
		io.on("connect", () => { console.log("gert") });
	}, []);

	var [userInfo, setUserInfo] = useState<userInfo>();
	var [gameInfo, setGameInfo] = useState<userGames>();

	useEffect(() => {( async () => {
		if (!loggedIn) return;
		var userInfoReq = await axios.request<userInfo>({
			method: "get",
			url: `/api/user/info`,
			headers: {"content-type": "application/json"}
		});
		setUserInfo(userInfoReq.data);
	})()}, []);

	useEffect(() => {( async () => {
		if (!loggedIn) return;
		var userGamesReq = await axios.request<userGames>({
			method: "get",
			url: `/api/user/games`,
			headers: {"content-type": "application/json"}
		});
		setGameInfo(userGamesReq.data);
	})()}, []);

	return <div>
		<NavBar/>
		<CenteredPage width={802}>
			<PageTitle>4 op een rij</PageTitle>
			<div>
				<Vierkant href="/game">
					<VideogameAssetIcon style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Nieuw spel</span>
					<div style={SquareSize}></div>
				</Vierkant>
				{
					false &&
					<Vierkant href="/">
						<ExtensionIcon style={GameModeIconStyle}/>
						<span style={GameModeTextStyle}>Puzzels</span>
						<div style={SquareSize}></div>
					</Vierkant>
				}
				{
					false &&
					<Vierkant href="/">
						<Icon path={mdiRobotExcited} style={GameModeIconStyle}/>
						<span style={GameModeTextStyle}>Tegen computer</span>
						<div style={SquareSize}></div>
					</Vierkant>
				}
				<Vierkant style={LoginOrRegisterBoxStyle}>
					{
						loggedIn ?
						<AccountBox info={userInfo} sumGameInfo={gameInfo?.totals}/> :
						<LoginOrRegisterBox/>
					}
				</Vierkant>
			</div>
			{
				loggedIn &&
				<Vierkant fullwidth>
					<RecentGames games={gameInfo?.games}/>
				</Vierkant>
			}
			<Vierkant fullwidth>
				<h2>Nieuws ofzo</h2>
				<p style={{ margin: "6px 0" }}>Chess.com heeft heel veel troep waar niemand naar kijkt</p>
			</Vierkant>
		</CenteredPage>
	</div>
}

