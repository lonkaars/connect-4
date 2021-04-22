import { useEffect, useState, CSSProperties } from 'react';
import axios from 'axios';

import { userPreferences } from '../api/api';
import { Button } from './ui';

type previewThemeColors = {
	bg: string;
	fg: string;
	a: string;
	b: string;
}

export type themeInfo = {
	name: string;
	url: string;
	dark: previewThemeColors;
	light: previewThemeColors;
}

export type themeJSON = themeInfo[];

export default function ThemePicker(props: { preferences?: userPreferences }) {
	var [ themes, setThemes ] = useState<themeJSON>([]);

	useEffect(() => {
		axios.request<themeJSON>({
			method: 'get',
			url: '/themes/themes.json',
		}).then(response => {
			setThemes(response.data);
		}).catch(err => {
			console.error(err)
		})
	}, []);

	return <>
		{themes.map(theme => <ThemeCard theme={theme} dark={props.preferences?.darkMode}/>)}
	</>;
}

export function ThemeCard(props: { theme: themeInfo; dark?: boolean }) {
	var mode = props.dark ? "dark" : "light";

	return <div className="dispinbl themeCardWrapper" style={{
		"--bg": props.theme[mode].bg,
		"--fg": props.theme[mode].fg,
		"--a": props.theme[mode].a,
		"--b": props.theme[mode].b,
	} as CSSProperties}>
	<Button className="themeCard dispinbl drop-1" onclick={() => {
		document.getElementById("theme").setAttribute("href", "/themes/" + props.theme.url)
	}}>
			<span className="name">{props.theme.name}</span>
				<div className="posabs r0 v0 disks">
					<div className="disk posabs a"/>
					<div className="disk posabs b"/>
				</div>
		</Button>
	</div>
}
