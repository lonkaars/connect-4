import '../styles/global.css';
import '../styles/dark.css';
import '../styles/disk.css';

import Head from "next/head";

export default function VierOpEenRijWebsite({ Component, pageProps }) {
	return <div>
		<Head>
			<title>4 op een rij</title>
			<link rel="stylesheet" href="/font/stylesheet.css"/>
		</Head>
		<Component {...pageProps}/>
	</div>
}

