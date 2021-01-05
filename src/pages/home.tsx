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

var LeftAlignedTableColumn: CSSProperties = {
	textAlign: "left",
	paddingLeft: 16
}

var RightAlignedTableColumn: CSSProperties = {
	textAlign: "right",
	paddingRight: 16
}

export default function HomePage() {
	return (
		<div>
			<NavBar />
			<CenteredPage>
				<PageTitle>4 op een rij</PageTitle>
				<Vierkant href="/">
					<VideogameAssetIcon style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Nieuw spel</span>
					<div style={SquareSize}></div>
				</Vierkant>
				<Vierkant href="/">
					<ExtensionIcon style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Puzzels</span>
					<div style={SquareSize}></div>
				</Vierkant>
				<Vierkant href="/">
					<Icon path={mdiRobotExcited} style={GameModeIconStyle}/>
					<span style={GameModeTextStyle}>Tegen computer</span>
					<div style={SquareSize}></div>
				</Vierkant>
				<Vierkant href="/">
					<div style={{ position: "relative", width: 280, height: 90 }}>
						<div style={{
							position: "absolute",
							top: 0, left: 0,
							...SquareSize
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
								fontSize: 20,
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}>Gebruikersnaam</h2>
							<p style={{ marginTop: 6 }}>Score: 400</p>
							<p style={{ position: "absolute", bottom: 0, left: 0 }}>
								<span style={{ color: "var(--disk-b-text)" }}>0 W</span>
								<span style={{ margin: "0 3px" }}>/</span>
								<span style={{ color: "var(--disk-a-text)" }}>0 V</span>
								<span style={{ margin: "0 3px" }}>/</span>
								<span style={{ opacity: .75 }}>0 G</span>
							</p>
						</div>
					</div>
				</Vierkant>
				<Vierkant width="calc(100% - 12px)">
					<h2>Recente partijen</h2>
					<table width="100%" style={{ marginTop: "16px", textAlign: "center" }}>
						<tr>
							<th style={{ width: "50%" }}>Tegenstander</th>
							<th style={{ width: "20%" }}>Uitkomst</th>
							<th style={{ width: "15%" }}>Zetten</th>
							<th style={{ width: "15%" }}>Datum</th>
						</tr>
						<tr>
							<td style={LeftAlignedTableColumn}>Naam hier</td>
							<td style={{ color: "var(--disk-b-text)" }}>Gewonnen</td>
							<td>7</td>
							<td style={RightAlignedTableColumn}>Vandaag</td>
						</tr>
						<tr>
							<td style={LeftAlignedTableColumn}>Nog meer namen</td>
							<td style={{ opacity: .6 }}>Gelijkspel</td>
							<td>42</td>
							<td style={RightAlignedTableColumn}>Gisteren</td>
						</tr>
					</table>
				</Vierkant>
				<Vierkant width="calc(100% - 12px)">
					<h2>Nieuws ofzo</h2>
					<p style={{ margin: "6px 0" }}>Chess.com heeft heel veel troep waar niemand naar kijkt</p>
				</Vierkant>
			</CenteredPage>
		</div>
	);
}

