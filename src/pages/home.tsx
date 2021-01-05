import {CSSProperties} from 'react';

import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant } from '../components/vierkant';

import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import ExtensionIcon from '@material-ui/icons/Extension';

var GameModeIconStyle: CSSProperties = {
	fontSize: 64,
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
	transform: "translateX(-50%)"
}

var SquareSize: CSSProperties = {
	width: 100,
	height: 100
}

function HomePage() {
	return (
		<div>
			<NavBar />
			<CenteredPage>
				<PageTitle>4 op een rij</PageTitle>
				<Vierkant>
					<VideogameAssetIcon style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Nieuw spel</span>
					<div style={SquareSize}></div>
				</Vierkant>
				<Vierkant>
					<ExtensionIcon style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Puzzels</span>
					<div style={SquareSize}></div>
				</Vierkant>
				<Vierkant>
					<VideogameAssetIcon style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Tegen computer</span>
					<div style={SquareSize}></div>
				</Vierkant>
			</CenteredPage>
		</div>
	);
}

export default HomePage;
