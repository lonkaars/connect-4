import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant } from '../components/ui';

export default function AccountPage() {
	return (
		<div>
			<NavBar/>
			<CenteredPage width={802}>
				<PageTitle>Profiel</PageTitle>
				<Vierkant fullwidth>
					Gert
				</Vierkant>
			</CenteredPage>
		</div>
	);
}

