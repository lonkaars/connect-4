import { NavBar } from '../components/navbar';
import { CenteredPage } from '../components/page.tsx';

function HomePage() {
	return (
		<div>
			<NavBar />
			<CenteredPage>
				<div>Zalige content op deze pagina yo</div>
			</CenteredPage>
		</div>
	);
}

export default HomePage;
