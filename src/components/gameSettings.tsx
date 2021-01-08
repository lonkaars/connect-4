import { ReactNode } from 'react';

import { Button, Vierkant, CheckBox, Input } from './ui';
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

function GameSettingsSection(props: {
	children?: ReactNode;
	title: string;
	state: boolean;
}) {
	return <Vierkant style={{
		backgroundColor: "var(--background-alt)",
		width: "calc(100% - 12px)",
		padding: 16
	}}>
	<span style={{
		verticalAlign: "top",
		fontSize: 14,
		fontWeight: 600
	}}>{props.title}</span>
	<CheckBox state={props.state} style={{
		verticalAlign: "top",
		float: "right",
		margin: -3
	}}/>
	<div style={{
		marginTop: 16
	}}>{props.children}</div>
	</Vierkant>
}

export function EditGameSettings() {
	return <DialogBox title="Spelregels aanpassen">
		<div style={{
			marginTop: 24,
			maxHeight: 500,
			overflowY: "scroll"
		}}>
			<GameSettingsSection title="Tijdslimiet" state={false}>
				<div style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
					gridGap: 16,
					marginBottom: 16
				}}>
					<Input type="number" label="min"/>
					<Input type="number" label="sec"/>
					<Input type="number" label="plus"/>
				</div>
				<CheckBox state={false}/>
				<span style={{
					verticalAlign: "super",
					marginLeft: 4
				}}>Timer gebruiken voor bijde spelers</span>
			</GameSettingsSection>
		</div>
	</DialogBox>;
}
