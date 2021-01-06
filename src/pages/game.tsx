import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { VoerBord } from '../components/voerBord';

export default function GamePage() {
	return (
		<div>
			<NavBar/>
			<CenteredPage width={900}>
				<PageTitle>Niew spel starten</PageTitle>
				<VoerBord width={7} height={6}/>
			</CenteredPage>
		</div>
	);
}

