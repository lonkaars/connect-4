import { ReactNode, Component } from 'react';
import axios from 'axios';

import { Button, Vierkant, CheckBox, Input } from './ui';
import { DialogBox } from './dialogBox';
import { ruleset, userPreferences } from '../api/api';

import BuildRoundedIcon from '@material-ui/icons/BuildRounded';


type CurrentGameSettingsStateType = {
	editGameRulesDialogVisible: boolean;
	ruleset: ruleset;
}

export class CurrentGameSettings extends Component {
	state: CurrentGameSettingsStateType = {
		editGameRulesDialogVisible: false,
		ruleset: {
			timelimit: {
				enabled: false,
				shared: false
			},
			ranked: false
		}
	}

	constructor(props: {}) {
		super(props);

		if (typeof window === "undefined") return; // return if run on server

		axios.request<userPreferences>({
			method: "get",
			url: `/api/user/preferences`,
			headers: {"content-type": "application/json"}
		})
		//FIXME: this assumes the request ruleset has all properties of a ruleset
		.then(request => this.setState({ ruleset: request.data.ruleset || this.state.ruleset }))
		.catch(() => {});
	}

	showEditGameRules = () => this.setState({ editGameRulesDialogVisible: true });
	hideEditGameRules = () => this.setState({ editGameRulesDialogVisible: false });
	setGameRules = (newRules: ruleset) => this.setState({ ruleset: newRules });

	render() {
		var timelimit_str = this.state.ruleset.timelimit.enabled ?
			`${this.state.ruleset.timelimit.minutes}m${this.state.ruleset.timelimit.seconds}s plus ${this.state.ruleset.timelimit.addmove}` :
			"Geen tijdslimiet"
		var ranked_str = this.state.ruleset.ranked ?
			"Gerangschikt" :
			"Niet gerangschikt"
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
				{timelimit_str}<br/>
				{ranked_str}
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
			<EditGameSettings parentState={this.state} hideEditGameRules={this.hideEditGameRules} setGameRules={this.setGameRules}/>
		</div>;
	}
}

function GameSettingsSection(props: {
	children?: ReactNode;
	title: string;
	state: boolean;
	noMarginBottom?: boolean;
	id: string;
}) {
	return <Vierkant id={props.id} style={{
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
	<CheckBox state={props.state} id={`${props.id}_enabled`} style={{
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
	parentState: CurrentGameSettingsStateType;
	hideEditGameRules: () => void;
	setGameRules: (newRules: ruleset) => void;
};

export class EditGameSettings extends Component<editGameSettingsProps> {
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
				<GameSettingsSection title="Tijdslimiet" state={this.props.parentState.ruleset.timelimit.enabled} id="timelimit">
					<div style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr 1fr",
						gridGap: 16,
						margin: "16px 0"
					}}>
						<Input id="timelimit_minutes" type="number" label="min" min={0} max={60} value={this.props.parentState.ruleset.timelimit.minutes}/>
						<Input id="timelimit_seconds" type="number" label="sec" min={0} max={60} value={this.props.parentState.ruleset.timelimit.seconds}/>
						<Input id="timelimit_addmove" type="number" label="plus" min={0} value={this.props.parentState.ruleset.timelimit.addmove}/>
					</div>
					<CheckBox id="timelimit_shared" state={this.props.parentState.ruleset.timelimit.shared}/>
					<span style={{
						verticalAlign: "super",
						marginLeft: 4
					}}>Timer gebruiken voor bijde spelers</span>
				</GameSettingsSection>
				<GameSettingsSection title="Gerangschikt spel" state={this.props.parentState.ruleset.ranked} id="ranked" noMarginBottom/>
			</div>
			<Button style={{
				textAlign: "center",
				marginTop: 24
			}} onclick={() => {
				var rules: ruleset = {
					timelimit: {
						enabled: document.getElementById("timelimit_enabled").classList.contains("on"),
						minutes: Number((document.getElementById("timelimit_minutes") as HTMLInputElement).value),
						seconds: Number((document.getElementById("timelimit_seconds") as HTMLInputElement).value),
						addmove: Number((document.getElementById("timelimit_addmove") as HTMLInputElement).value),
						shared: document.getElementById("timelimit_shared").classList.contains("on"),
					},
					ranked: document.getElementById("ranked_enabled").classList.contains("on")
				}
				this.props.setGameRules(rules);
				this.props.hideEditGameRules();
			}}>Instellingen opslaan</Button>
		</DialogBox>;
	}
}
