export interface userInfo {
	avatar?: string|null,
	coutry?: string|null,
	id?: string,
	registered?: number,
	type?: string,
	username?: string,
};

export type ruleset = {
	timelimit: {
		enabled: boolean;
		minutes?: number;
		seconds?: number;
		addmove?: number;
		shared: boolean;
	},
	ranked: boolean;
}

export type userColors = {
	diskA: string;
	diskB: string;
	background: string;
}

export interface userPreferences {
	darkMode?: boolean;
	ruleset?: ruleset;
	userColors?: userColors;
}

