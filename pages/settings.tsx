import { CSSProperties } from 'react';

import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant, IconLabelButton, CheckBox } from '../components/ui';
import { AccountAvatar } from '../components/account';
import { CurrentGameSettings } from '../components/gameSettings';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

var SettingsSubsectionStyle: CSSProperties = {
	marginTop: 24,
	minHeight: 40
};

export default function SettingsPage() {
	return (
		<div>
			<NavBar/>
			<CenteredPage width={802}>
				<PageTitle>Instellingen</PageTitle>
				<Vierkant fullwidth>
					<h2>Account</h2>
					<div style={SettingsSubsectionStyle}>
						<AccountAvatar size={100} dummy/>
						<IconLabelButton text="Profielfoto veranderen" icon={<EditOutlinedIcon/>}/>
					</div>
					<div style={SettingsSubsectionStyle}>
						<IconLabelButton text="Bewerken" icon={<EditOutlinedIcon/>}/>
						<div style={{ display: "block" }}>
							<h3>Gebruikersnaam</h3>
							<p>Hier staat hij dan</p>
						</div>
					</div>
					<div style={SettingsSubsectionStyle}>
						<IconLabelButton text="Bewerken" icon={<EditOutlinedIcon/>}/>
						<IconLabelButton text="Onthullen" icon={<VisibilityOutlinedIcon/>}/>
						<div style={{ display: "block" }}>
							<h3>Email</h3>
							<p>******@example.com</p>
						</div>
					</div>
					<div style={SettingsSubsectionStyle}>
						<IconLabelButton text="Bewerken" icon={<EditOutlinedIcon/>}/>
						<div style={{ display: "block" }}>
							<h3>Wachtwoord</h3>
						</div>
					</div>
				</Vierkant>
				<Vierkant fullwidth>
					<h2>Kleuren</h2>
					<div style={SettingsSubsectionStyle}>
						<h3>Schijfjes</h3>
					</div>
					<div style={SettingsSubsectionStyle}>
						<h3>Achtergrond</h3>
					</div>
					<div style={SettingsSubsectionStyle}>
						<div style={{ float: "right" }}>
							<CheckBox/>
						</div>
						<h3>Donkere modus</h3>
					</div>
				</Vierkant>
				<Vierkant fullwidth>
					<h2>Standaard spelregels</h2>
					<div style={SettingsSubsectionStyle}>
						<CurrentGameSettings/>
					</div>
				</Vierkant>
			</CenteredPage>
		</div>
	);
}

