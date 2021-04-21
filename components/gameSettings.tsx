import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';

import { ruleset, userPreferences } from '../api/api';
import { DialogBox } from './dialogBox';
import { Button, CheckBox, Input, Vierkant } from './ui';

import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';

export function CurrentGameSettings() {
	var [editGameRulesDialogVisible, setEditGameRulesDialogVisible] = useState(false);
	var [ruleset, setRuleset] = useState<ruleset>({
		timelimit: {
			enabled: false,
			shared: false,
			minutes: 0,
			seconds: 0,
			addmove: 0,
		},
		ranked: false,
	});

	useEffect(() => {
		axios.request<{ preferences: userPreferences; }>({
			method: 'get',
			url: `/api/user/preferences`,
			headers: { 'content-type': 'application/json' },
		})
			.then(request => setRuleset(request.data.preferences.ruleset))
			.catch(() => {});
	}, []);

	var timelimit_str = ruleset.timelimit.enabled
		? `${ruleset.timelimit.minutes}m${ruleset.timelimit.seconds}s plus ${ruleset.timelimit.addmove}`
		: 'Geen tijdslimiet';
	var ranked_str = ruleset.ranked
		? 'Gerangschikt'
		: 'Niet gerangschikt';
	return <div className='editGameSettings posrel'>
		<p className='currentRules subtile nosel posabs l0'>
			{timelimit_str}
			<br />
			{ranked_str}
		</p>
		<Button
			className='posabs r0 pad-m'
			onclick={() => setEditGameRulesDialogVisible(true)}
		>
			<BuildOutlinedIcon className='icon' />
			<span className='posabs center nosel text'>
				Spelregels aanpassen
			</span>
		</Button>
		<EditGameSettings
			hideEditGameRules={() => setEditGameRulesDialogVisible(false)}
			setGameRules={setRuleset}
			ruleset={ruleset}
			visible={editGameRulesDialogVisible}
		/>
	</div>;
}

function GameSettingsSection(props: {
	children?: ReactNode;
	title: string;
	state: boolean;
	noMarginBottom?: boolean;
	id: string;
}) {
	return <Vierkant
		id={props.id}
		className='pad-m editableRulesSection'
	>
		<span className='valigntop nosel'>
			{props.title}
		</span>
		<div className='checkboxWrapper valigntop floatr'>
			<CheckBox
				state={props.state}
				id={props.id + '_enabled'}
			/>
		</div>
		<div>{props.children}</div>
	</Vierkant>;
}

function GameRule(props: {
	title: string;
	description: string;
}) {
	return <div className='gamerule pad-m round-t center bg-900'>
		<h1>{props.title}</h1>
		<p>{props.description}</p>
	</div>;
}

type editGameSettingsProps = {
	visible: boolean;
	ruleset: ruleset;
	hideEditGameRules: () => void;
	setGameRules: (newRules: ruleset) => void;
};

export function EditGameSettings(props: editGameSettingsProps) {
	return <DialogBox
		title='Spelregels aanpassen'
		hidden={!props.visible}
		onclick={props.hideEditGameRules}
		className='gameRuleEdit'
	>
		<div className='editableRules round-t'>
			<GameSettingsSection
				title='Tijdslimiet'
				state={props.ruleset.timelimit.enabled}
				id='timelimit'
			>
				<div className='sidebyside timeControls'>
					<Input
						id='timelimit_minutes'
						type='number'
						label='min'
						min={0}
						max={60}
						value={props.ruleset.timelimit.minutes}
						className='pad-m round-t'
					/>
					<Input
						id='timelimit_seconds'
						type='number'
						label='sec'
						min={0}
						max={60}
						value={props.ruleset.timelimit.seconds}
						className='pad-m round-t'
					/>
					<Input
						id='timelimit_addmove'
						type='number'
						label='plus'
						min={0}
						value={props.ruleset.timelimit.addmove}
						className='pad-m round-t'
					/>
				</div>
				<CheckBox id='timelimit_shared' state={props.ruleset.timelimit.shared} />
				<span className='valignsup'>
					Timer gebruiken voor bijde spelers
				</span>
			</GameSettingsSection>
			{false && <GameSettingsSection id='gamemodes' title='Regelset' state={false}>
				<div className='sidebyside'>
					<GameRule title='+2' description='Extra kolommen' />
					<GameRule title='+4' description='Extra kolommen' />
				</div>
				<GameRule title='Gravity' description='De zwaartekracht draait soms' />
				<GameRule title='Flashlight' description='Het veld wordt opgelicht door de vallende fiches' />
			</GameSettingsSection>}
			<GameSettingsSection
				title='Gerangschikt spel'
				state={props.ruleset.ranked}
				id='ranked'
				noMarginBottom
			/>
		</div>
		<Button
			className='save'
			onclick={() => {
				var rules: ruleset = {
					timelimit: {
						enabled: document.getElementById('timelimit_enabled').classList.contains('on'),
						minutes: Number((document.getElementById('timelimit_minutes') as HTMLInputElement).value),
						seconds: Number((document.getElementById('timelimit_seconds') as HTMLInputElement).value),
						addmove: Number((document.getElementById('timelimit_addmove') as HTMLInputElement).value),
						shared: document.getElementById('timelimit_shared').classList.contains('on'),
					},
					ranked: document.getElementById('ranked_enabled').classList.contains('on'),
				};
				props.setGameRules(rules);
				props.hideEditGameRules();
			}}
		>
			Instellingen opslaan
		</Button>
	</DialogBox>;
}
