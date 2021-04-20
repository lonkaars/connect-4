import { CSSProperties, ReactNode } from 'react';
import { Bubble, Vierkant } from './ui';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

function GameBarModule(props: {
	children?: ReactNode;
	onclick?: () => void;
}) {
	return <Vierkant
		className={'gameBarButton bg-700 pad-m round-t valigntop ' + (props.onclick ? 'cpointer' : '')}
		onclick={props.onclick}
	>
		{props.children}
	</Vierkant>;
}

var GameBarSpacer = () => <div style={{ width: 8, display: 'inline-block' }}></div>;

var GameBarAlignStyle: CSSProperties = {
	display: 'inline-block',
};

export function GameBar(props: {
	turn: boolean;
	player1: boolean;
	active: boolean;
	resignFunction: () => void;
}) {
	return <Vierkant className='gameBar bg-800 w100m2m pad-s'>
		<div>
			<div style={{ ...GameBarAlignStyle, float: 'left' }}>
				{props.active && <div
					className={'move dispinbl ' + (props.turn ? 'move-a' : 'move-b')}
				/>}
				<h2 className='pad-m valigntop dispinbl'>
					{!props.active
						? 'Wachten op tegenstander...'
						: props.turn == props.player1
						? 'Jouw beurt'
						: 'Tegenstander'}
				</h2>
			</div>
			<div
				style={{
					...GameBarAlignStyle,
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<span
					style={{
						color: 'var(--text)',
						fontSize: 20,
						opacity: .75 - .75,
					}}
				>
					0-0
				</span>
			</div>
			<div style={{ ...GameBarAlignStyle, float: 'right' }}>
				<GameBarModule>
					<SettingsRoundedIcon />
				</GameBarModule>
				<GameBarSpacer />
				<GameBarModule>
					<span
						style={{
							margin: '0 4px',
							fontSize: 20,
						}}
					>
						00:00
					</span>
				</GameBarModule>
				<GameBarSpacer />
				<GameBarModule onclick={props.resignFunction}>
					<ExitToAppRoundedIcon />
				</GameBarModule>
				<GameBarSpacer />
				<GameBarModule>
					<NavigateBeforeRoundedIcon />
				</GameBarModule>
				<GameBarSpacer />
				<GameBarModule>
					<NavigateNextRoundedIcon />
				</GameBarModule>
			</div>
		</div>
	</Vierkant>;
}
