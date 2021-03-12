import { CSSProperties } from 'react';
import friendlyTime from 'friendly-time';

import { gameInfo } from '../api/api';

var LeftAlignedTableColumn: CSSProperties = {
	textAlign: "left",
	paddingLeft: 16
}

var RightAlignedTableColumn: CSSProperties = {
	textAlign: "right",
	paddingRight: 16
}

function GameOutcome(props: { game: gameInfo }) {
	var gameStatus = (() => {
		return {
			"resign": () => "Opgegeven",
			"wait_for_opponent": () => "Aan het wachten op een tegenstander",
			"in_progress": () => "Bezig",
			"finished": () => {
				return {
					"w": "Gewonnen",
					"l": "Verloren",
					"d": "Gelijkspel"
				}[props.game.outcome]
			},
		}[props.game.status]();
	})();
	var outcome = props.game.outcome;
	return <td style={{
		color:
			outcome == "w" ? "var(--disk-b-text)" :
			outcome == "l" ? "var(--disk-a-text)" :
			"var(--text)",
		opacity: !["w", "l"].includes(outcome) ? 0.75 : 1.0
	}}>{gameStatus}</td>
}

export default function RecentGames(props: { games?: Array<gameInfo> }) {
	return <div>
		<h2>Recente partijen</h2>
		{
			props.games?.length > 0 ?
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
							 <td style={LeftAlignedTableColumn}>
								 <a href={"/user?id=" + game.opponent?.id} style={{
									 fontWeight: 500
								 }}>{game.opponent?.username}</a>
							 </td>
							<GameOutcome game={game}/>
							<td>{Math.max(0, game.moves.length -1)}</td>
							<td style={RightAlignedTableColumn}>{(() => {
								var timeCreated = new Date(game.created);
								return friendlyTime(timeCreated);
							})()}</td>
						</tr>)
					}
				</tbody>
			</table> :
			<h1 style={{
				textAlign: "center",
				opacity: .6,
				margin: "32px 64px"
			}}>Deze gebruiker heeft nog geen partijen gespeeld</h1>
		}
	</div>
}

