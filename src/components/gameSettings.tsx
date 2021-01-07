// interface CurrentGameSettingsProps {
// gameID: string;
// }

import { Button } from './ui';

import BuildRoundedIcon from '@material-ui/icons/BuildRounded';

export function CurrentGameSettings(/*props: CurrentGameSettingsProps*/) {
	return <div style={{
		position: "relative",
		height: 80
	}}>
		<p style={{
			opacity: .6,
			fontStyle: "italic",
			userSelect: "none",
			position: "absolute",
			top: "50%",
			left: 0,
			transform: "translateY(-50%)"
		}}>
			Geen tijdslimiet<br/>
			Standaardregels<br/>
			Gerangschikt
		</p>
		<Button style={{
			width: 150,
			position: "absolute",
			top: "50%",
			right: 0,
			transform: "translateY(-50%)"
		}}>
			<BuildRoundedIcon style={{ fontSize: 48 }}/>
			<span style={{
				fontWeight: 600,
				position: "absolute",
				right: 24,
				top: "50%",
				width: 85,
				verticalAlign: "middle",
				textAlign: "center",
				transform: "translateY(-50%)"
			}}>Spelregels aanpassen</span>
		</Button>
	</div>;

}
