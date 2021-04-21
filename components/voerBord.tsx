export function VoerBord(props: {
	width: number;
	height: number;
	onMove: (move: number) => void;
	active: boolean;
}) {
	return <table className={'voerBord fullwidth ' + (props.active ? 'active' : '')}>
		<tbody>
			{[...Array(props.height).keys()].map((row) => (
				<tr key={`r-${row}`}>
					{[...Array(props.width).keys()].map((column) => (
						<td
							className='posrel outer cell fullwidth'
							key={`c-${row}x${column}`}
						>
							<div className='dispbl square' />
							<div className='disk posabs a0' />
							<div
								className='posabs a0 round-t inner cell'
								id={`pos-${(props.height - row - 1) * props.width + column}`}
								onClick={event => {
									props.onMove(Number((event.target as HTMLElement).id.split('-')[1]));
								}}
							/>
						</td>
					))}
				</tr>
			))}
		</tbody>
	</table>;
}
