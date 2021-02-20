import { CSSProperties, Component } from 'react';
import { io as socket, Socket } from 'socket.io-client';
import axios from 'axios';
import { userInfo } from '../api/api';
import * as cookies from 'react-cookies';

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

interface VoerGameProps {

}

class VoerGame extends Component<VoerGameProps> {
	constructor(props: VoerGameProps) {
		super(props);

		if (typeof document === "undefined") return;
		this.io = socket();

		this.io.on("connect", () => console.log("connect"));
		this.io.on("disconnect", () => console.log("disconnect"));

		this.io.on("fieldUpdate", (data: { field: string }) => {
			this.setState({ board: data.field.split("").map(i => Number(i)) });
			for(let i = 0; i < data.field.length; i++)
				document.getElementById(`pos-${i}`).parentNode.children.item(1).classList.add(`state-${data.field[i]}`);
		});

		this.io.on("turnUpdate", (data: { player1: boolean }) => this.setState({ turn: data.player1 }));

		this.io.on("finish", (data: {
			winPositions: Array<Array<number>>
			boardFull: boolean }) => {

			this.setState({ winPositions: data.winPositions });

			var outcome = -1;
			if (data.winPositions.length > 0) outcome = this.state.board[data.winPositions[0][0]];
			if (data.boardFull) outcome = 0;
			this.setState({ outcome });
		});
	}

	io: Socket;

	width = 7;
	height = 6;

	state: {
		userID: string;
		turn: boolean;
		winPositions: Array<Array<number>>;
		outcome: number;
		board: Array<number>;
	} = {
		userID: "",
		turn: true,
		winPositions: [],
		outcome: -1,
		board: [],
	};

	board = [...Array(this.width * this.height)].map(() => 0);
	userID = "";

	move(column: number) {
		if(this.state.userID == "") {
			axios.request<userInfo>({
				method: "get",
				url: `/api/user/info`,
				headers: {"content-type": "application/json"}
			})
			.then(request => this.setState({ userID: request.data.id }))
			.catch(() => {});
		}
		this.io.emit("newMove", {
			move: column,
			token: cookies.load("token"),
			gameID: "fortnite"
		});
	}

	render() {
		return <div style={{
			position: "relative",
			top: "50%",
			transform: "translateY(-50%)",
			maxWidth: "100vh",
			margin: "0 auto"
		}}>
			<VoerBord width={this.width} height={this.height} onMove={m => this.move(m % this.width + 1)}/>
			<GameBar turn={this.state.turn}/>
			<GameOutcomeDialog outcome={this.state.outcome} visible={this.state.outcome != -1}/>
		</div>
	}
}

function GameOutcomeDialog(props: {
	outcome: number;
	visible: boolean;
}) {
	return <DialogBox title="Speluitkomst" style={{ display: props.visible ? "inline-block" : "none" }}>
		<div style={{
			width: "100%",
			textAlign: "center"
		}}>
			<h2 style={{
				color:
					props.outcome == 0 ? "var(--text)" :
					props.outcome == 1 ? "var(--disk-a-text)" :
					props.outcome == 2 ? "var(--disk-b-text)" :
					"var(--text)",
				opacity: props.outcome == 0 ? .75 : 1,
				marginTop: 8
			}}>{
				props.outcome == 0 ? "Gelijkspel" :
				props.outcome == 1 ? "Verloren" :
				props.outcome == 2 ? "Gewonnen" :
				"???"
			}</h2>
			{ false && <p style={{ marginTop: 24 }}>
					0 Gemiste winstzetten<br/>
					6 Optimale zetten<br/>
					0 Blunders
			</p> }
			<IconLabelButton text="Opnieuw spelen" icon={<RefreshIcon/>} style={{
				float: "none",
				marginTop: 24,
				padding: "12px 32px"
			}}/>
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
	return (
		<div>
			<NavBar/>
			<CenteredPage width={900} style={{ height: "100vh" }}>
				<VoerGame/>
				{false && <DialogBox title="Nieuw spel">
					<CurrentGameSettings/>
					<div style={{
						marginTop: 24,
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gridGap: 24
					}}>
						<Button style={InviteButtonStyle}>
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
				</DialogBox>}
			</CenteredPage>
		</div>
	);
}

