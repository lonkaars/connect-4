import { CSSProperties } from 'react';

import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant } from '../components/vierkant';
import { AccountAvatar } from '../components/account';

import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ExtensionIcon from '@material-ui/icons/Extension';

import Icon from '@mdi/react';
import { mdiRobotExcited } from '@mdi/js';

var GameModeIconStyle: CSSProperties = {
	fontSize: 64,
	width: 64,
	height: 64,
	display: "inline-block",
	position: "absolute",
	top: 24,
	left: "50%",
	transform: "translateX(-50%)"
}

var GameModeTextStyle: CSSProperties = {
	whiteSpace: "nowrap",
	display: "inline-block",
	position: "absolute",
	bottom: 24,
	left: "50%",
	transform: "translateX(-50%)",
	userSelect: "none",
	fontWeight: 500
}

var SquareSize: CSSProperties = {
	width: 90,
	height: 90
}

function HomePage() {
	return (
		<div>
			<NavBar />
			<CenteredPage>
				<PageTitle>4 op een rij</PageTitle>
				<a href="/"><Vierkant>
					<VideogameAssetIcon style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Nieuw spel</span>
					<div style={SquareSize}></div>
				</Vierkant></a>
				<a href="/"><Vierkant>
					<ExtensionIcon style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Puzzels</span>
					<div style={SquareSize}></div>
				</Vierkant></a>
				<a href="/"><Vierkant>
					<Icon path={mdiRobotExcited} style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Tegen computer</span>
					<div style={SquareSize}></div>
				</Vierkant></a>
				<a href="/" style={{ verticalAlign: "top" }}><Vierkant>
					<div style={{ position: "relative", width: 280, height: 90 }}>
						<div style={{
							position: "absolute",
							top: 0, left: 0,
							width: 90, height: 90
						}}>
							<AccountAvatar size={90} image="url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblogs.agu.org%2Fwildwildscience%2Ffiles%2F2017%2F09%2FCapture-1.png&f=1&nofb=1)"/>
						</div>
						<div style={{
							position: "absolute",
							top: 0, left: 102,
							width: 178, height: 90
						}}>
							<h2 style={{
								maxWidth: 178,
								margin: 0,
								fontSize: 20,
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}>Gebruikersnaam</h2>
							<p>Score: 400</p>
							<p style={{ position: "absolute", bottom: 0, left: 0, margin: 0 }}>
								<span style={{ color: "var(--disk-b-text)" }}>N W</span>
								<span style={{ margin: "0 3px" }}>/</span>
								<span style={{ color: "var(--disk-a-text)" }}>N V</span>
								<span style={{ margin: "0 3px" }}>/</span>
								<span style={{ opacity: .75 }}>N G</span>
							</p>
						</div>
					</div>
				</Vierkant></a>
			</CenteredPage>
		</div>
	);
}

export default HomePage;
