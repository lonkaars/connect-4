import Icon from '@mdi/react';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import * as cookies from 'react-cookies';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../components/socketContext';

import { DialogBox } from '../components/dialogBox';
import { GameBar } from '../components/gameBar';
import { CurrentGameSettings } from '../components/gameSettings';
import { NavBar } from '../components/navbar';
import { CenteredPage } from '../components/page';
import { ToastContext, toastType } from '../components/toast';
import { Button, IconLabelButton, SearchBar } from '../components/ui';
import { VoerBord } from '../components/voerBord';

import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import RefreshIcon from '@material-ui/icons/Refresh';
import WifiTetheringRoundedIcon from '@material-ui/icons/WifiTetheringRounded';
import { mdiContentCopy } from '@mdi/js';

function VoerGame(props: {
	gameID: string;
	active: boolean;
	player1: boolean;
	io: Socket;
	toast: toastType;
}) {
	var width = 7;
	var height = 6;

	var [turn, setTurn] = useState(true);
	// var [winPositions, setWinPositions] = useState<Array<Array<number>>>([]);
	var [outcome, setOutcome] = useState(-1);
	var board: Array<number> = [...Array(width * height)].map(() => 0);

	useEffect(() => {
		props.io.on('connect', () => console.log('connect'));
		props.io.on('disconnect', () => console.log('disconnect'));

		props.io.on('fieldUpdate', (data: { field: string; }) => {
			board = data.field.split('').map(i => Number(i));
			for (let i = 0; i < data.field.length; i++) {
				document.getElementById(`pos-${i}`).parentNode.children.item(1).classList.add(`state-${data.field[i]}`);
			}
		});

		props.io.on('turnUpdate', (data: { player1: boolean; }) => setTurn(data.player1));

		props.io.on('finish', (data: {
			winPositions: Array<Array<number>>;
			boardFull: boolean;
			winner: number;
		}) => {
			// setWinPositions(data.winPositions);

			if (data.boardFull) setOutcome(0);
			if (data.winPositions.length > 0) setOutcome(board[data.winPositions[0][0]]);
		});

		props.io.on('resign', () => {
			props.toast({ message: 'Het potje is opgegeven', type: 'normal', icon: <FlagOutlinedIcon /> });
		});
	}, []);

	return <div
		className='posrel abscenterv'
		style={{
			maxWidth: '100vh',
			margin: '0 auto',
		}}
	>
		<VoerBord
			width={width}
			height={height}
			onMove={move => {
				props.io.emit('newMove', {
					move: move % width + 1,
					token: cookies.load('token'), // TODO: get token from request
					game_id: props.gameID,
				});
			}}
			active={props.active && outcome == -1}
		/>
		<GameBar
			turn={turn}
			player1={props.player1}
			active={props.active}
			resignFunction={() => {
				props.io.emit('resign', { game_id: props.gameID });
			}}
		/>
		<GameOutcomeDialog
			outcome={outcome}
			player={props.player1 ? 1 : 2}
			visible={outcome != -1}
		/>
	</div>;
}

function GameOutcomeDialog(props: {
	outcome: number;
	player: number;
	visible: boolean;
}) {
	return <DialogBox
		title='Speluitkomst'
		hidden={!props.visible}
		className='outcomeDialog'
		onclick={() => {
			window.history.replaceState(null, null, '/');
			window.location.reload();
		}}
	>
		<div className='inner fullwidth center'>
			<h2
				className={'outcome' + ' ' + (props.outcome == 0
					? 'draw'
					: props.outcome == props.player
					? 'lose'
					: props.outcome != props.player
					? 'win'
					: 'draw')}
			>
				{props.outcome == 0
					? 'Gelijkspel'
					: props.outcome == props.player
					? 'Verloren'
					: props.outcome != props.player
					? 'Gewonnen'
					: '???'}
			</h2>
			{false && <p className='analysis'>
				0 Gemiste winstzetten<br />
				6 Optimale zetten<br />
				0 Blunders
			</p>}
			{false && <IconLabelButton
				text='Opnieuw spelen'
				icon={<RefreshIcon />}
			/>}
		</div>
	</DialogBox>;
}

export default function GamePage() {
	var [gameID, setGameID] = useState('');
	var [player1, setPlayer1] = useState(true);
	var [active, setActive] = useState(false);
	var [gameIDUrl, setGameIDUrl] = useState('');

	var { io } = useContext(SocketContext);
	var { toast } = useContext(ToastContext);

	useEffect(() => {
		var gameIDUrl = new URLSearchParams(window.location.search).get('id') || '';
		setGameIDUrl(gameIDUrl);

		if (!gameIDUrl || gameIDUrl == gameID) return;

		axios.request<{ id: string; player_1: boolean; game_started: boolean; }>({
			method: 'post',
			url: '/api/game/accept',
			headers: { 'content-type': 'application/json' },
			data: { id: gameIDUrl },
		})
			.then(response => {
				setGameID(response.data.id);
				setPlayer1(response.data.player_1);
				io.emit('registerGameListener', { game_id: response.data.id });
				setActive(true);
			})
			.catch(err => {
				toast({ message: 'error', type: 'confirmation', description: err.toString() });
			});

		setGameID(gameIDUrl);
	}, []);

	useEffect(() => {
		io.on('gameStart', () => setActive(true));
	}, []);

	return <div>
		<NavBar />
		<CenteredPage width={900} className='h100vh'>
			<VoerGame
				active={active}
				gameID={gameID}
				player1={player1}
				io={io}
				toast={toast}
			/>
			<DialogBox
				title='Nieuw spel'
				className='newGameDialog'
				hidden={!!(gameIDUrl || gameID)}
				onclick={() => {
					window.history.go(-1);
				}}
			>
				<CurrentGameSettings />
				<div className='sidebyside gg-l'>
					<Button
						className='inviteButton random pad-m'
						onclick={() => {
							axios.request<{ id: string; player_1: boolean; game_started: boolean; }>({
								url: '/api/game/random',
							})
								.then(response => {
									setGameID(response.data.id);
									window.history.replaceState(null, null, '?id=' + response.data.id);
									setPlayer1(response.data.player_1);
									io.emit('registerGameListener', { game_id: response.data.id });
									if (response.data.game_started) setActive(true);
								})
								.catch(() => {});
						}}
					>
						<WifiTetheringRoundedIcon className='icon posabs abscenterh' />
						<h2 className='label center posabs abscenterh nosel'>Willekeurige speler</h2>
					</Button>
					<Button
						className='inviteButton link pad-m'
						onclick={() => {
							axios.request<{ id: string; }>({
								method: 'post',
								url: '/api/game/new',
								headers: { 'content-type': 'application/json' },
								data: {},
							})
								.then(response => {
									setGameID(response.data.id);
									window.history.replaceState(null, null, '?id=' + response.data.id);
									setPlayer1(true);
									io.emit('registerGameListener', { game_id: response.data.id });
									setActive(false);

									copy(window.location.href);
									toast({
										message: 'Link gekopiëerd naar klembord',
										type: 'confirmation',
										icon: <Icon size={1} path={mdiContentCopy} />,
									});
								})
								.catch(() => {});
						}}
					>
						<LinkRoundedIcon className='icon posabs abscenterh' />
						<h2 className='label center posabs abscenterh nosel'>Uitnodigen via link</h2>
					</Button>
				</div>
				<SearchBar label='Zoeken in vriendenlijst' />
			</DialogBox>
		</CenteredPage>
	</div>;
}
