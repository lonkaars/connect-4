import { CSSProperties } from 'react';

import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant } from '../components/ui';
/* import { AccountAvatar } from '../components/account'; */
import { CurrentGameSettings, EditGameSettings } from '../components/gameSettings';

var SettingsSectionHeaderStyle: CSSProperties = {
	marginBottom: 24
}

export default function SettingsPage() {
	return (
		<div>
			<NavBar/>
			<CenteredPage width={802}>
				<PageTitle>Instellingen</PageTitle>
				<Vierkant width="calc(100% - 12px)">
					<h2 style={SettingsSectionHeaderStyle}>Account</h2>
				</Vierkant>
				<Vierkant width="calc(100% - 12px)">
					<h2 style={SettingsSectionHeaderStyle}>Kleuren</h2>
				</Vierkant>
				<Vierkant width="calc(100% - 12px)">
					<h2 style={SettingsSectionHeaderStyle}>Standaard spelregels</h2>
					<CurrentGameSettings/>
				</Vierkant>
				<EditGameSettings/>
			</CenteredPage>
		</div>
	);
}

