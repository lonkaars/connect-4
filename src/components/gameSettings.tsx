import { ReactNode } from 'react';

import { Button, Vierkant, CheckBox } from './ui';
import { DialogBox } from './dialogBox';

import BuildRoundedIcon from '@material-ui/icons/BuildRounded';

export function CurrentGameSettings(/*props: CurrentGameSettingsProps*/) {
	return <div style={{
		position: "relative",
		height: 80
	}}>
		<p style={{
			opacity: .75,
			fontStyle: "italic",
			userSelect: "none",
			position: "absolute",
			top: "50%",
			left: 0,
			transform: "translateY(-50%)"
		}}>
			Geen tijdslimiet<br/>
			Standaardregels<br/>
			Gerangschikt
		</p>
		<Button style={{
			width: 150,
			position: "absolute",
			top: "50%",
			right: 0,
			transform: "translateY(-50%)"
		}}>
			<BuildRoundedIcon style={{ fontSize: 48 }}/>
			<span style={{
				fontWeight: 600,
				position: "absolute",
				right: 24,
				top: "50%",
				width: 85,
				verticalAlign: "middle",
				textAlign: "center",
				transform: "translateY(-50%)",
				userSelect: "none"
			}}>Spelregels aanpassen</span>
		</Button>
	</div>;
}

interface GameSettingsSectionProps {
	children?: ReactNode;
	title: string;
	state: boolean;
}

function GameSettingsSection(props: GameSettingsSectionProps) {
	return <Vierkant style={{
		backgroundColor: "var(--background-alt)",
		width: "calc(100% - 12px)"
	}}>
	<div>{props.children}</div>
	</Vierkant>
}

export function EditGameSettings() {
	return <DialogBox title="Spelregels aanpassen">
		<div style={{
			marginTop: 24,
			maxHeight: 500,
			overflowY: "scroll"
		}}>
			<CheckBox state={false}/>
			<GameSettingsSection title="Tijdslimiet" state={false}>
			</GameSettingsSection>
		</div>
	</DialogBox>;
}
