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
		</Head>
		<PreferencesContextWrapper>
			<ToastContextWrapper>
				<Component {...pageProps}/>
			</ToastContextWrapper>
		</PreferencesContextWrapper>
	</div>
}

