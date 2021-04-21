import friendlyTime from 'friendly-time';

import { gameInfo } from '../api/api';

function GameOutcome(props: { game: gameInfo; }) {
	var gameStatus = (() => {
		return {
			'resign': () => 'Opgegeven',
			'wait_for_opponent': () => 'Aan het wachten op een tegenstander',
			'in_progress': () => 'Bezig',
			'finished': () => {
				return {
					'w': 'Gewonnen',
					'l': 'Verloren',
					'd': 'Gelijkspel',
				}[props.game.outcome];
			},
		}[props.game.status]();
	})();
	return <td>
		<span
			className={'outcome ' + {
				'w': 'win',
				'l': 'lose',
				'd': 'draw',
			}[props.game.outcome]}
		>
			{gameStatus}
		</span>
	</td>;
}

export default function RecentGames(props: { games?: Array<gameInfo>; }) {
	return <div className='recentGames'>
		<h2>Recente partijen</h2>
		{props.games?.length > 0
			? <table width='100%' className='recentGames center'>
				<tbody>
					<tr>
						<th style={{ width: '50%' }}>Tegenstander</th>
						<th style={{ width: '15%' }}>Uitkomst</th>
						<th style={{ width: '15%' }}>Zetten</th>
						<th style={{ width: '20%' }}>Datum</th>
					</tr>
					{props.games?.map(game =>
						<tr key={game.id}>
							<td className='leftAlignedColumn'>
								<a href={'/user?id=' + game.opponent?.id}>
									{game.opponent?.username}
								</a>
							</td>
							<GameOutcome game={game} />
							<td>{Math.max(0, game.moves.length - 1)}</td>
							<td className='rightAlignedColumn'>
								{(() => {
									var timeCreated = new Date(game.created);
									return friendlyTime(timeCreated);
								})()}
							</td>
						</tr>
					)}
				</tbody>
			</table>
			: <h1 className='nogames center subtile'>
				Deze gebruiker heeft nog geen partijen gespeeld
			</h1>}
	</div>;
}
