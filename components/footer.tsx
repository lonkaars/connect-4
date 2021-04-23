import { ReactNode } from 'react';
import * as cookie from 'react-cookies';
import Logo from '../components/logo';

import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ExtensionIcon from '@material-ui/icons/Extension';
import GitHubIcon from '@material-ui/icons/GitHub';
import Home from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

function PageLink(props: {
	icon: ReactNode;
	href: string;
	children: string;
}) {
	return <a href={props.href} className='pageLink'>
		{props.icon}
		<span>{props.children}</span>
	</a>;
}

export function Footer() {
	var loggedIn = !!cookie.load('token');

	return <div className='footer'>
		<div className='header'>
			<Logo />
			<h2>4 op een rij</h2>
		</div>
		<div className='content'>
			<div className='column'>
				<PageLink icon={<Home />} href='/' children='Home' />
				<PageLink icon={<VideogameAssetIcon />} href='/game' children='Spelen' />
				<PageLink icon={<ExtensionIcon />} href='/' children='Puzzels' />
				<PageLink icon={<SearchIcon />} href='/search' children='Zoeken' />
			</div>
			<div className='column'>
				<PageLink icon={<LockIcon />} href='/privacy' children='Privacy' />
				<PageLink icon={<GitHubIcon />} href='https://github.com/lonkaars/connect-4' children='Broncode' />
			</div>
			{loggedIn && <div className='column'>
				<PageLink icon={<SettingsIcon />} href='/settings' children='Instellingen' />
				<PageLink icon={<PersonIcon />} href='/user' children='Profiel' />
				<PageLink icon={<ExitToAppOutlinedIcon />} href='/logout' children='Uitloggen' />
			</div>}
		</div>
	</div>;
}
