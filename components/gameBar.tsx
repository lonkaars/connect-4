import { ReactNode } from 'react';
import { Vierkant } from './ui';

import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

function GameBarModule(props: {
	children?: ReactNode;
	onclick?: () => void;
	className?: string;
}) {
	return <Vierkant
		className={'gameBarButton bg-700 pad-m round-t valigntop ' + props.className + ' '
			+ (props.onclick ? 'cpointer' : '')}
		onclick={props.onclick}
	>
		{props.children}
	</Vierkant>;
}

export function GameBar(props: {
	turn: boolean;
	player1: boolean;
	active: boolean;
	resignFunction: () => void;
}) {
	return <Vierkant className='gameBar bg-800 w100m2m pad-s'>
		<div>
			<div className='floatl dispinbl'>
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
			<div className='score winning dispnone subtile posabs abscenter'>
				<span>0-0</span>
			</div>
			<div className='buttons floatr dispinbl'>
				<GameBarModule>
					<SettingsRoundedIcon />
				</GameBarModule>
				<GameBarModule className='timer nosel'>
					<span>00:00</span>
				</GameBarModule>
				<GameBarModule onclick={props.resignFunction}>
					<ExitToAppRoundedIcon />
				</GameBarModule>
				<GameBarModule>
					<NavigateBeforeRoundedIcon />
				</GameBarModule>
				<GameBarModule>
					<NavigateNextRoundedIcon />
				</GameBarModule>
			</div>
		</div>
	</Vierkant>;
}
