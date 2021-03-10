import Head from 'next/head';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { userPreferences } from '../api/api';

import '../styles/global.css';
import '../styles/dark.css';
import '../styles/disk.css';

function applyPreferences(preferences: userPreferences) {
	if(typeof preferences === "undefined") return;
	if(typeof preferences.darkMode !== "undefined")
		document.getElementsByTagName("html")[0].classList[preferences.darkMode ? "add" : "remove"]("dark");
}

export default function VierOpEenRijWebsite({ Component, pageProps }) {
	var [gotData, setGotData] = useState(false);
	var [preferences, setPreferences] = useState<userPreferences>();

	useEffect(() => {(async() => {
		if (gotData) return;
		if (typeof window === "undefined") return;
		if (!document.cookie.includes("token")) return;

		var local_prefs = window.localStorage.getItem("preferences");
		if (local_prefs) {
			var local_prefs_json = JSON.parse(local_prefs) as userPreferences;
			console.log(typeof local_prefs_json);
			setPreferences(local_prefs_json);
			applyPreferences(local_prefs_json);
		}

		var preferencesReq = await axios.request<{ preferences: userPreferences; }>({
			method: "get",
			url: `/api/user/preferences`,
			headers: {"content-type": "application/json"}
		});

		window.localStorage.setItem("preferences", JSON.stringify(preferencesReq.data.preferences));
		setPreferences(preferencesReq.data.preferences);

		setGotData(true);
	})()})

	useEffect(() => applyPreferences(preferences), [preferences]);

	return <div>
		<Head>
			<title>4 op een rij</title>
			<link rel="stylesheet" href="/font/stylesheet.css"/>
		</Head>
		<Component {...pageProps}/>
	</div>
}

