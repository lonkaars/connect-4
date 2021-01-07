import { NavBar } from '../components/navbar';
import { CenteredPage } from '../components/page';
import { VoerBord } from '../components/voerBord';
import { DialogBox } from '../components/dialogBox';
import { CurrentGameSettings } from '../components/gameSettings';

export default function GamePage() {
	return (
		<div>
			<NavBar/>
			<CenteredPage width={900}>
				<VoerBord width={7} height={6}/>
				<DialogBox title="Nieuw spel">
					<CurrentGameSettings/>
				</DialogBox>
			</CenteredPage>
		</div>
	);
}

