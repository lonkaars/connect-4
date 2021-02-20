import { CSSProperties, ReactNode } from 'react';
import { Vierkant } from './ui';

import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';

interface GameBarModuleProps {
	children?: ReactNode;
}

function GameBarModule(props: GameBarModuleProps) {
	return <Vierkant style={{
		backgroundColor: "var(--background-alt)",
		padding: 12,
		borderRadius: 6,
		margin: 0,
		verticalAlign: "top"
	}}>{props.children}</Vierkant>
}

var GameBarSpacer = () => <div style={{ width: 8, display: "inline-block" }}></div>;

var GameBarAlignStyle: CSSProperties = {
	display: "inline-block"
}

export function GameBar(props: {
	turn: boolean;
}) {
	return <Vierkant className="gameBar" style={{
		padding: 8,
		width: "calc(100% - 12px)"
	}}>
		<div style={{ gridAutoColumns: "auto" }}>
			<div style={{ ...GameBarAlignStyle, float: "left" }}>
				<div style={{
					width: 32, height: 32,
					margin: 8,
					backgroundColor: props.turn ? "var(--disk-b)" : "var(--disk-a)",
					borderRadius: 16,
					display: "inline-block"
				}}/>
				<h2 style={{
					fontSize: 20,
					margin: 12,
					verticalAlign: "top",
					display: "inline-block"
				}}>{ props.turn ? "Jouw beurt" : "Tegenstander" }</h2>
			</div>
			<div style={{
				...GameBarAlignStyle,
				position: "absolute",
				top: "50%", left: "50%",
				transform: "translate(-50%, -50%)"
			}}>
				<span style={{
					color: "var(--text)",
					fontSize: 20,
					opacity: .75 - .75
				}}>0-0</span>
			</div>
			<div style={{ ...GameBarAlignStyle, float: "right" }}>
				<GameBarModule>
					<SettingsRoundedIcon/>
				</GameBarModule>
				<GameBarSpacer/>
				<GameBarModule>
					<span style={{
						margin: "0 4px",
						fontSize: 20
					}}>00:00</span>
				</GameBarModule>
				<GameBarSpacer/>
				<GameBarModule>
					<ExitToAppRoundedIcon/>
				</GameBarModule>
				<GameBarSpacer/>
				<GameBarModule>
					<NavigateBeforeRoundedIcon/>
				</GameBarModule>
				<GameBarSpacer/>
				<GameBarModule>
					<NavigateNextRoundedIcon/>
				</GameBarModule>
			</div>
		</div>
	</Vierkant>;
}
