import { CSSProperties } from 'react';

import { NavBar } from '../components/navbar';
import { CenteredPage } from '../components/page';
import { VoerBord } from '../components/voerBord';
import { DialogBox } from '../components/dialogBox';
import { CurrentGameSettings } from '../components/gameSettings';
import { Button } from '../components/ui';

import WifiTetheringRoundedIcon from '@material-ui/icons/WifiTetheringRounded';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';

var InviteButtonStyle: CSSProperties = {
	backgroundColor: "var(--text)",
	height: 160,
	padding: 12
}

var InviteButtonIconStyle: CSSProperties = {
	fontSize: 100,
	position: "absolute",
	top: 12,
	left: "50%",
	transform: "translateX(-50%)"
}

var InviteButtonLabelStyle: CSSProperties = {
	position: "absolute",
	bottom: 12,
	left: "50%",
	transform: "translateX(-50%)",
	textAlign: "center",
	color: "var(--background)",
	width: 136,
	fontSize: 20
}

export default function GamePage() {
	return (
		<div>
			<NavBar/>
			<CenteredPage width={900}>
				<VoerBord width={7} height={6}/>
				<DialogBox title="Nieuw spel">
					<CurrentGameSettings/>
					<div style={{
						marginTop: 24,
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gridGap: 24
					}}>
						<Button style={InviteButtonStyle}>
							<WifiTetheringRoundedIcon style={{
								color: "var(--disk-b)",
								...InviteButtonIconStyle
							}}/>
							<h2 style={InviteButtonLabelStyle}>Willekeurige speler</h2>
						</Button>
						<Button style={InviteButtonStyle}>
							<LinkRoundedIcon style={{
								color: "var(--disk-a)",
								...InviteButtonIconStyle
							}}/>
							<h2 style={InviteButtonLabelStyle}>Uitnodigen via link</h2>
						</Button>
					</div>
				</DialogBox>
			</CenteredPage>
		</div>
	);
}

