import { CSSProperties, Component } from 'react';

var LeftAlignedTableColumn: CSSProperties = {
	textAlign: "left",
	paddingLeft: 16
}

var RightAlignedTableColumn: CSSProperties = {
	textAlign: "right",
	paddingRight: 16
}

export default class RecentGames extends Component {
	constructor(props: {
		user?: string;
	}) {
		super(props);
	}

	render () {
		return <div>
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
		</div>
	}
}

