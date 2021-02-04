import { CSSProperties, ReactNode } from 'react';

import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant, Button } from '../components/ui';
import { AccountAvatar } from '../components/account';
import { CurrentGameSettings } from '../components/gameSettings';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

var SettingsSectionHeaderStyle: CSSProperties = {
	marginBottom: 24
}

function SettingsPageButton(props: {
	text: string;
	icon: ReactNode;
	onclick?: () => void;
}) {
	return <Button onclick={props.onclick} style={{
		display: "inline-block",
		verticalAlign: "top",
		padding: 8,
		float: "right"
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

var SettingsSectionStyle: CSSProperties = { width: "calc(100% - 12px)" };
var SettingsSubsectionStyle: CSSProperties = { marginTop: 24 };

export default function SettingsPage() {
	return (
		<div>
			<NavBar/>
			<CenteredPage width={802}>
				<PageTitle>Instellingen</PageTitle>
				<Vierkant style={SettingsSectionStyle}>
					<h2 style={SettingsSectionHeaderStyle}>Account</h2>
					<div style={SettingsSubsectionStyle}>
						<AccountAvatar size={100} dummy/>
						<SettingsPageButton text="Profielfoto veranderen" icon={<EditOutlinedIcon/>}/>
					</div>
					<div style={SettingsSubsectionStyle}>
						<SettingsPageButton text="Profielfoto veranderen" icon={<EditOutlinedIcon/>}/>
						<div style={{
							display: "block"
						}}>
							<b>Gebruikersnaam</b>
							<p>Gebruikersnaam</p>
						</div>
					</div>
				</Vierkant>
				<Vierkant style={SettingsSectionStyle}>
					<h2 style={SettingsSectionHeaderStyle}>Kleuren</h2>
				</Vierkant>
				<Vierkant style={SettingsSectionStyle}>
					<h2 style={SettingsSectionHeaderStyle}>Standaard spelregels</h2>
					<CurrentGameSettings/>
				</Vierkant>
			</CenteredPage>
		</div>
	);
}

