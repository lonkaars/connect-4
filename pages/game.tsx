import { CSSProperties, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as cookies from 'react-cookies';
import { useRouter } from 'next/router';
import { SocketContext } from '../components/socketContext';
import { Socket } from 'socket.io-client';

import { NavBar } from '../components/navbar';
import { CenteredPage } from '../components/page';
import { VoerBord } from '../components/voerBord';
import { DialogBox } from '../components/dialogBox';
import { CurrentGameSettings } from '../components/gameSettings';
import { Button, SearchBar, IconLabelButton } from '../components/ui';
import { GameBar } from '../components/gameBar';

import WifiTetheringRoundedIcon from '@material-ui/icons/WifiTetheringRounded';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import RefreshIcon from '@material-ui/icons/Refresh';

function VoerGame(props: {
	gameID: string;
	active: boolean;
	player1: boolean;
	io: Socket;
}) {
	var width = 7;
	var height = 6;

	var [ioListeners, setIoListeners] = useState(false);
	var [turn, setTurn] = useState(true);
	// var [winPositions, setWinPositions] = useState<Array<Array<number>>>([]);
	var [outcome, setOutcome] = useState(-1);
	var board: Array<number> = [...Array(width * height)].map(() => 0);

	useEffect(() => {
		if (ioListeners) return;

		props.io.on("connect", () => console.log("connect"));
		props.io.on("disconnect", () => console.log("disconnect"));

		props.io.on("fieldUpdate", (data: { field: string }) => {
			board = data.field.split("").map(i => Number(i));
			for(let i = 0; i < data.field.length; i++)
				document.getElementById(`pos-${i}`).parentNode.children.item(1).classList.add(`state-${data.field[i]}`);
		});

		props.io.on("turnUpdate", (data: { player1: boolean }) => setTurn(data.player1));

		props.io.on("finish", (data: {
				winPositions: Array<Array<number>>
				boardFull: boolean
				winner: number
			}) => {
			// setWinPositions(data.winPositions);

			if (data.boardFull) setOutcome(0);
			if (data.winPositions.length > 0) setOutcome(board[data.winPositions[0][0]]);
		});

		props.io.on("resign", () => {
			alert("resign")
		});

		setIoListeners(true);
	}, []);

	return <div style={{
		position: "relative",
		top: "50%",
		transform: "translateY(-50%)",
		maxWidth: "100vh",
		margin: "0 auto"
	}}>
		<VoerBord
			width={width} height={height}
			onMove={move => {
				props.io.emit("newMove", {
					move: move % width + 1,
					token: cookies.load("token"),
					game_id: props.gameID
				});
			}}
			active={props.active && outcome == -1}
		/>
		<GameBar
			turn={turn}
			player1={props.player1}
			active={props.active}
			resignFunction={() => { props.io.emit("resign", { game_id: props.gameID }) }}
		/>
		<GameOutcomeDialog
			outcome={outcome}
			player={props.player1 ? 1 : 2}
			visible={outcome != -1}
		/>
	</div>
}

function GameOutcomeDialog(props: {
	outcome: number;
	player: number;
	visible: boolean;
}) {
	return <DialogBox
		title="Speluitkomst"
		style={{ display: props.visible ? "inline-block" : "none" }}
		onclick={() => {
			window.history.replaceState(null, null, "/");
			window.location.reload();
		}}>
		<div style={{
			width: "100%",
			textAlign: "center"
		}}>
			<h2 style={{
				color:
					props.outcome == 0 ? "var(--text)" :
					props.outcome == props.player ? "var(--disk-a-text)" :
					props.outcome != props.player ? "var(--disk-b-text)" :
					"var(--text)",
				opacity: props.outcome == 0 ? .75 : 1,
				marginTop: 8
			}}>{
				props.outcome == 0 ? "Gelijkspel" :
				props.outcome == props.player ? "Verloren" :
				props.outcome != props.player ? "Gewonnen" :
				"???"
			}</h2>
			{ false && <p style={{ marginTop: 24 }}>
					0 Gemiste winstzetten<br/>
					6 Optimale zetten<br/>
					0 Blunders
			</p> }
			{ false && <IconLabelButton text="Opnieuw spelen" icon={<RefreshIcon/>} style={{
				float: "none",
				marginTop: 24,
				padding: "12px 32px"
			}}/> }
		</div>
	</DialogBox>
}

var InviteButtonStyle: CSSProperties = {
	backgroundColor: "var(--page-background)",
	height: 160,
	padding: 12
}

var InviteButtonIconStyle: CSSProperties = {
	fontSize: 100,
	position: "absolute",
	top: 12,
	left: "50%",
	transform: "translateX(-50%)"
}

var InviteButtonLabelStyle: CSSProperties = {
	position: "absolute",
	bottom: 12,
	left: "50%",
	transform: "translateX(-50%)",
	textAlign: "center",
	color: "var(--text-alt)",
	width: 136,
	fontSize: 20,
	userSelect: "none"
}

export default function GamePage() {
	var [ioListeners, setIoListeners] = useState(false);
	var [gameID, setGameID] = useState("");
	var [player1, setPlayer1] = useState(true);
	var [active, setActive] = useState(false);
	var gameIDUrl = useRouter().query["id"] as string;

	var { io } = useContext(SocketContext);

	if (gameIDUrl && gameIDUrl != gameID) {
		// join game
		axios.request<{ id: string, player_1: boolean }>({
			method: "post",
			url: "/api/game/accept",
			headers: {"content-type": "application/json"},
			data: { id: gameIDUrl }
		})
		.then(() => {
			setActive(true);
			io.emit("registerGameListener", { game_id: gameIDUrl });
		})
		.catch(() => {});

		setGameID(gameIDUrl);
	}

	useEffect(() => {
		if (ioListeners) return;

		io.on("gameStart", () => setActive(true));

		setIoListeners(true);
	}, []);

	return <div>
		<NavBar/>
		<CenteredPage width={900} style={{ height: "100vh" }}>
			<VoerGame
				active={active}
				gameID={gameID}
				player1={player1}
				io={io}/>
			<DialogBox
				title="Nieuw spel"
				style={{ display: gameIDUrl || gameID ? "none" : "inline-block" }}
				onclick={() => { window.history.go(-1); }}>
				<CurrentGameSettings/>
				<div style={{
					marginTop: 24,
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gridGap: 24
				}}>
					<Button style={InviteButtonStyle} onclick={() => {
						axios.request<{ id: string, player_1: boolean, game_started: boolean }>({
							method: "post",
							url: "/api/game/random",
							headers: {"content-type": "application/json"},
							data: {}
						})
						.then(response => {
							setGameID(response.data.id);
							window.history.replaceState(null, null, "?id=" + response.data.id);
							setPlayer1(response.data.player_1);
							io.emit("registerGameListener", { game_id: response.data.id });
							if (response.data.game_started) setActive(true);
						})
						.catch(() => {});
					}}>
						<WifiTetheringRoundedIcon style={{
							color: "var(--disk-b)",
							...InviteButtonIconStyle
						}}/>
						<h2 style={InviteButtonLabelStyle}>Willekeurige speler</h2>
					</Button>
					<Button style={InviteButtonStyle}>
						<LinkRoundedIcon style={{
							color: "var(--disk-a)",
							...InviteButtonIconStyle
						}}/>
						<h2 style={InviteButtonLabelStyle}>Uitnodigen via link</h2>
					</Button>
				</div>
				<SearchBar label="Zoeken in vriendenlijst"/>
			</DialogBox>
		</CenteredPage>
	</div>
}

