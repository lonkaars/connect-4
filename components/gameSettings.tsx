import { ReactNode, Component } from 'react';

import { Button, Vierkant, CheckBox, Input } from './ui';
import { DialogBox } from './dialogBox';

import BuildRoundedIcon from '@material-ui/icons/BuildRounded';

export class CurrentGameSettings extends Component {
	state: {
		editGameRulesDialogVisible: boolean;
	} = {
		editGameRulesDialogVisible: false
	}

	showEditGameRules = () => this.setState({ editGameRulesDialogVisible: true });
	hideEditGameRules = () => this.setState({ editGameRulesDialogVisible: false });

	render() {
		return <div style={{
			position: "relative",
			height: 80,
			overflow: "visible",
			zIndex: 1
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
			}} onclick={this.showEditGameRules}>
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
			<EditGameSettings parentState={this.state} hideEditGameRules={this.hideEditGameRules}/>
		</div>;
	}
}

function GameSettingsSection(props: {
	children?: ReactNode;
	title: string;
	state: boolean;
	noMarginBottom?: boolean;
}) {
	return <Vierkant style={{
		backgroundColor: "var(--background-alt)",
		width: "100%",
		padding: 16,
		margin: 0,
		marginBottom: props.noMarginBottom ? 0 : 24
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
	<div>{props.children}</div>
	</Vierkant>
}

/* function GameRule(props: { */
/* 	title: string; */
/* 	description: string; */
/* 	style?: CSSProperties; */
/* }) { */
/* 	return <div style={{ */
/* 		backgroundColor: "var(--page-background)", */
/* 		borderRadius: 8, */
/* 		padding: "16px 0", */
/* 		textAlign: "center", */
/* 		...props.style */
/* 	}}> */
/* 		<h1 style={{ color: "var(--disk-a)", fontSize: 42 }}>{props.title}</h1> */
/* 		<p style={{ color: "var(--text-alt)", maxWidth: 250, margin: "0 auto" }}>{props.description}</p> */
/* 	</div>; */
/* } */

/*
<GameSettingsSection title="Regelset" state={false}>
	<div style={{
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridGap: 16,
		margin: "16px 0"
	}}>
		<GameRule title="+2" description="Extra kolommen"/>
		<GameRule title="+4" description="Extra kolommen"/>
	</div>
	<GameRule style={{ marginBottom: 16 }} title="Gravity" description="De zwaartekracht draait soms"/>
	<GameRule title="Flashlight" description="Het veld wordt opgelicht door de vallende fiches"/>
</GameSettingsSection>
*/

type editGameSettingsProps = {
	parentState: { editGameRulesDialogVisible: boolean; };
	hideEditGameRules: () => void;
};

export class EditGameSettings extends Component<editGameSettingsProps> {
	constructor(props: editGameSettingsProps) {
		super(props);
	}

	render () {
		return <DialogBox title="Spelregels aanpassen" style={{
			margin: 0,
			display: this.props.parentState.editGameRulesDialogVisible ? "block" : "none"
		}} onclick={this.props.hideEditGameRules}>
			<div style={{
				marginTop: 24,
				maxHeight: 500,
				overflowY: "scroll",
				borderRadius: 8,
			}}>
				<GameSettingsSection title="Tijdslimiet" state={false}>
					<div style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
						gridGap: 16,
						margin: "16px 0"
					}}>
						<Input type="number" label="min" min={0} max={60}/>
						<Input type="number" label="sec" min={0} max={60}/>
						<Input type="number" label="plus" min={0}/>
					</div>
					<CheckBox state={false}/>
					<span style={{
						verticalAlign: "super",
						marginLeft: 4
					}}>Timer gebruiken voor bijde spelers</span>
				</GameSettingsSection>
				<GameSettingsSection title="Gerangschikt spel" state={true} noMarginBottom/>
			</div>
		</DialogBox>;
	}
}
