import { useEffect } from 'react';
import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { IconLabelButton, Vierkant } from '../components/ui';

import * as cookie from 'react-cookies';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';

function logout() {
	cookie.remove('token');
	window.location.href = '/';
}

export default function MaintenancePage() {
	useEffect(() => {
		setTimeout(logout, 3e3);
	}, []);

	return <div>
		<NavBar />
		<CenteredPage width={802}>
			<PageTitle>Uitloggen</PageTitle>
			<Vierkant className='w100m2m pad-l bg-800 center logout'>
				<p>Je wordt over enkele seconden automatisch uitgelogd...</p>
				<div className='posrel fullwidth pad-m'>
					<div className='sidebyside dispinbl posabs abscenterh'>
						<IconLabelButton
							className='floatn'
							onclick={logout}
							text='Nu uitloggen'
							icon={<ExitToAppIcon />}
						/>
						<IconLabelButton
							className='floatn'
							href='/'
							text='Terug naar homepagina'
							icon={<HomeIcon />}
						/>
					</div>
				</div>
				<div className='pad-s'></div>
				<div className='pad-s'></div>
			</Vierkant>
		</CenteredPage>
	</div>;
}
