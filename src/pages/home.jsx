import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant, VierkantWrapper } from '../components/vierkant';

function HomePage() {
	return (
		<div>
			<NavBar />
			<CenteredPage>
				<PageTitle>4 op een rij</PageTitle>
				<Vierkant>Gert</Vierkant>
				<Vierkant>Gert2</Vierkant>
				<Vierkant>Gert3</Vierkant>
				<Vierkant>Gert4</Vierkant>
				<Vierkant>Gert5</Vierkant>
				<Vierkant>Gert6</Vierkant>
				<Vierkant>Gert7</Vierkant>
				<Vierkant>Gert8</Vierkant>
				<Vierkant>Gert9</Vierkant>
				<Vierkant>Gert10</Vierkant>
				<Vierkant>Gert11</Vierkant>
			</CenteredPage>
		</div>
	);
}

export default HomePage;
