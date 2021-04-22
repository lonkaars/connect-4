import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { userPreferences } from '../api/api';

function applyPreferences(preferences: userPreferences) {
	if (typeof preferences === 'undefined') return;
	if (typeof preferences.darkMode !== 'undefined') {
		document.getElementsByTagName('html')[0].classList[preferences.darkMode ? 'add' : 'remove']('dark');
	}
}

var PreferencesContext = createContext<
	{ preferences?: userPreferences; updatePreference?: (newPreference: userPreferences) => void; }
>({});

export function PreferencesContextWrapper(props: { children?: ReactNode; }) {
	var server = typeof window === 'undefined';
	var loggedIn = !server && document.cookie.includes('token');

	var [preferences, setPreferences] = useState<userPreferences>();

	var [dummy, setDummy] = useState(false); //FIXME: janky fix to cause rerender

	useEffect(() => {
		(async () => {
			if (!loggedIn) return;

			var local_prefs = window.localStorage.getItem('preferences');
			if (local_prefs) {
				var local_prefs_json = JSON.parse(local_prefs) as userPreferences;
				setPreferences(local_prefs_json);
				applyPreferences(local_prefs_json);
			}

			var preferencesReq = await axios.request<{ preferences: userPreferences; }>({
				method: 'get',
				url: `/api/user/preferences`,
				headers: { 'content-type': 'application/json' },
			});

			window.localStorage.setItem('preferences', JSON.stringify(preferencesReq.data.preferences));
			setPreferences(preferencesReq.data.preferences);
		})();
	}, []);

	applyPreferences(preferences);

	function updatePreference(newPreference: userPreferences) {
		var prefs: userPreferences = Object.assign(preferences, newPreference);
		setPreferences(prefs);
		axios.request({
			method: 'post',
			url: `/api/user/preferences`,
			headers: { 'content-type': 'application/json' },
			data: { 'newPreferences': prefs },
		});
		setDummy(!dummy);
	}

	return <PreferencesContext.Provider value={{ preferences, updatePreference }}>
		{props.children}
	</PreferencesContext.Provider>;
}

export default PreferencesContext;
