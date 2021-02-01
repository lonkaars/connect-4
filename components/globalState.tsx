import React from 'react';

type globalState = {
	gameSettings: {
		timeLimit: {
			on: boolean;
			time: Number;
			useForBoth: boolean;
		}
		rankedGame: boolean;
	}
}

export var GlobalStateContext = React.createContext();
