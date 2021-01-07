import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant } from '../components/ui';
/* import { AccountAvatar } from '../components/account'; */

export default function SettingsPage() {
	return (
		<div>
			<NavBar/>
			<CenteredPage width={802}>
				<PageTitle>Instellingen</PageTitle>
				<Vierkant width="calc(100% - 12px)">
					<h2>Account</h2>
				</Vierkant>
				<Vierkant width="calc(100% - 12px)">
					<h2>Kleuren</h2>
				</Vierkant>
				<Vierkant width="calc(100% - 12px)">
					<h2>Standaard spelregels</h2>
				</Vierkant>
			</CenteredPage>
		</div>
	);
}

