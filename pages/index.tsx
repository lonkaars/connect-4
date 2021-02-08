import { CSSProperties, Component } from 'react';
import axios from 'axios';
import { userInfo } from '../api/api';

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

export default class HomePage extends Component {
	state: {
		info: userInfo,
		loggedIn: boolean
	} = {
		info: {},
		loggedIn: false
	}

	constructor(props: {}) {
		super(props);

		if (typeof window === "undefined") return; // return if run on server
		this.state.loggedIn = document.cookie.includes("token");

		if (this.state.loggedIn == false) return; // don't request user info if not logged in
		axios.request<userInfo>({
			method: "get",
			url: `/api/user/info`,
			headers: {"content-type": "application/json"}
		})
		.then(request => this.setState({ info: request.data }))
		.catch(() => {});
	}

	render () {
		return <div>
			<NavBar/>
			<CenteredPage width={802}>
				<PageTitle>4 op een rij</PageTitle>
				<Vierkant href="/game">
					<VideogameAssetIcon style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Nieuw spel</span>
					<div style={SquareSize}></div>
				</Vierkant>
				<Vierkant href="/">
					<ExtensionIcon style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Puzzels</span>
					<div style={SquareSize}></div>
				</Vierkant>
				<Vierkant href="/">
					<Icon path={mdiRobotExcited} style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Tegen computer</span>
					<div style={SquareSize}></div>
				</Vierkant>
				<Vierkant href={ this.state.loggedIn ? "/account" : undefined } style={{ verticalAlign: "top" }}>
					<div style={{
						position: "relative",
						width: 280,
						height: 90,
						textAlign: "center",
						display: this.state.loggedIn ? "none" : "inline-block"
					}}>
						<span style={{
							userSelect: "none",
							display: "inline-block",
							position: "absolute",
							fontSize: 14,
							left: 0, right: 0, top: 0
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
					<div style={{
						position: "relative",
						width: 280,
						height: 90,
						display: this.state.loggedIn ? "inline-block" : "none"
					}}>
						<div style={{
							position: "absolute",
							top: 0, left: 0,
							...SquareSize
						}}>
							<AccountAvatar size={90} dummy/>
						</div>
						<div style={{
							position: "absolute",
							top: 0, left: 102,
							width: 178, height: 90
						}}>
							<h2 style={{
								maxWidth: 178,
								fontSize: 20,
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}>{this.state.info.username}</h2>
							<p style={{ marginTop: 6 }}>Score: 400</p>
							<p style={{ position: "absolute", bottom: 0, left: 0 }}>
								<span style={{ color: "var(--disk-b-text)" }}>0 W</span>
								<span style={{ margin: "0 3px" }}>/</span>
								<span style={{ color: "var(--disk-a-text)" }}>0 V</span>
								<span style={{ margin: "0 3px" }}>/</span>
								<span style={{ opacity: .75 }}>0 G</span>
							</p>
						</div>
					</div>
				</Vierkant>
				<Vierkant fullwidth style={{ display: this.state.loggedIn ? "block" : "none" }}>
					<RecentGames/>
				</Vierkant>
				<Vierkant fullwidth>
					<h2>Nieuws ofzo</h2>
					<p style={{ margin: "6px 0" }}>Chess.com heeft heel veel troep waar niemand naar kijkt</p>
				</Vierkant>
			</CenteredPage>
		</div>
	}
}

