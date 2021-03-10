import { CSSProperties } from 'react';
import friendlyTime from 'friendly-time';

import { gameInfo, outcome } from '../api/api';

var LeftAlignedTableColumn: CSSProperties = {
	textAlign: "left",
	paddingLeft: 16
}

var RightAlignedTableColumn: CSSProperties = {
	textAlign: "right",
	paddingRight: 16
}

function GameOutcome(props: { outcome: outcome }) {
	return <td style={{
		color: {
			"w": "var(--disk-b-text)",
			"l": "var(--disk-a-text)",
			"d": "var(--text)"
		}[props.outcome],
		opacity: props.outcome == "d" ? 0.75 : 1.0
	}}>{
		{
			"w": "Gewonnen",
			"l": "Verloren",
			"d": "Gelijkspel"
		}[props.outcome]
	}</td>
}

export default function RecentGames(props: { games?: Array<gameInfo> }) {
	return <div>
		<h2>Recente partijen</h2>
		<table width="100%" style={{ marginTop: "16px", textAlign: "center" }}>
			<tbody>
				<tr>
					<th style={{ width: "50%" }}>Tegenstander</th>
					<th style={{ width: "15%" }}>Uitkomst</th>
					<th style={{ width: "15%" }}>Zetten</th>
					<th style={{ width: "20%" }}>Datum</th>
				</tr>
				{
					props.games?.map(game => <tr>
						<td style={LeftAlignedTableColumn}>{game.opponent}</td>
						<GameOutcome outcome={game.outcome}/>
						<td>{game.moves.length -1}</td>
						<td style={RightAlignedTableColumn}>{(() => {
							var timeCreated = new Date(game.created);
							return friendlyTime(timeCreated);
						})()}</td>
					</tr>)
				}
			</tbody>
		</table>
	</div>
}

