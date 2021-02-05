import { CSSProperties, ReactNode } from 'react';

import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant, Button } from '../components/ui';
import { AccountAvatar } from '../components/account';
import { CurrentGameSettings } from '../components/gameSettings';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

var SettingsSectionStyle: CSSProperties = { width: "calc(100% - 12px)" };
var SettingsSubsectionStyle: CSSProperties = {
	marginTop: 24,
	minHeight: 40
};

function SettingsPageButton(props: {
	text: string;
	icon: ReactNode;
	onclick?: () => void;
}) {
	return <Button onclick={props.onclick} style={{
		display: "inline-block",
		verticalAlign: "top",
		padding: 8,
		float: "right",
		marginLeft: 12
	}}>
		{props.icon}
		<span style={{
			display: "inline-block",
			verticalAlign: "top",
			marginLeft: 8,
			marginTop: 3, marginBottom: 3
		}}>{props.text}</span>
	</Button>
}

export default function SettingsPage() {
	return (
		<div>
			<NavBar/>
			<CenteredPage width={802}>
				<PageTitle>Instellingen</PageTitle>
				<Vierkant style={SettingsSectionStyle}>
					<h2>Account</h2>
					<div style={SettingsSubsectionStyle}>
						<AccountAvatar size={100} dummy/>
						<SettingsPageButton text="Profielfoto veranderen" icon={<EditOutlinedIcon/>}/>
					</div>
					<div style={SettingsSubsectionStyle}>
						<SettingsPageButton text="Bewerken" icon={<EditOutlinedIcon/>}/>
						<div style={{ display: "block" }}>
							<b>Gebruikersnaam</b>
							<p>Hier staat hij dan</p>
						</div>
					</div>
					<div style={SettingsSubsectionStyle}>
						<SettingsPageButton text="Bewerken" icon={<EditOutlinedIcon/>}/>
						<SettingsPageButton text="Onthullen" icon={<VisibilityOutlinedIcon/>}/>
						<div style={{ display: "block" }}>
							<b>Email</b>
							<p>******@example.com</p>
						</div>
					</div>
					<div style={SettingsSubsectionStyle}>
						<SettingsPageButton text="Bewerken" icon={<EditOutlinedIcon/>}/>
						<div style={{ display: "block" }}>
							<b>Wachtwoord</b>
						</div>
					</div>
				</Vierkant>
				<Vierkant style={SettingsSectionStyle}>
					<h2>Kleuren</h2>
				</Vierkant>
				<Vierkant style={SettingsSectionStyle}>
					<h2>Standaard spelregels</h2>
					<div style={SettingsSubsectionStyle}>
						<CurrentGameSettings/>
					</div>
				</Vierkant>
			</CenteredPage>
		</div>
	);
}

