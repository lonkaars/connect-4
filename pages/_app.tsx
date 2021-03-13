import Head from 'next/head';
import { PreferencesContextWrapper } from '../components/preferencesContext';
import { ToastContextWrapper } from '../components/toast';

import '../styles/global.css';
import '../styles/dark.css';
import '../styles/disk.css';

export default function VierOpEenRijWebsite({ Component, pageProps }) {
	return <div>
		<Head>
			<title>4 op een rij</title>

			<link rel="stylesheet" href="/font/stylesheet.css"/>

			<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
			<link rel="icon" href="/favicon.png" type="image/png"/>

			<meta property="og:site_name" content="4 op een rij"/>
			<meta property="og:url" content="http://86.80.39.198:2080/"/>
			<meta property="og:title" content="Loek's epische vier op een rij website"/>
			<meta property="og:description" content="Kom vier op een rij spelen NU"/>
			<meta property="og:type" content="website"/>
			<meta name="og:image" itemProp="image" content="/favicon.png"/>
			<meta name="theme-color" content="#e16d82"/>
		</Head>
		<PreferencesContextWrapper>
			<ToastContextWrapper>
				<Component {...pageProps}/>
			</ToastContextWrapper>
		</PreferencesContextWrapper>
	</div>
}

