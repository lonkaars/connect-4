function Disc() {
	return <div className="disk" style={{
		position: "absolute",
		top: 0, left: 0, right: 0, bottom: 0,
		borderRadius: 999999,
		margin: 3
	}}/>
}

export function VoerBord(props: {
	width: number;
	height: number;
	onMove: (move: number) => void;
	active: boolean;
}) {
	return <table className="voerBord" style={{
		borderSpacing: 8,
		width: "100%"
	}}>
		<tbody>
			{
				[...Array(props.height).keys()].map((row) => (
					<tr key={`r-${row}`}>
						{[...Array(props.width).keys()].map((column) => (
							<td style={{
								position: "relative",
								width: "100%",
								padding: 0
							}} key={`c-${row}x${column}`}>
								<div style={{
									display: "block",
									marginTop: "100%"
								}}/>
								<Disc/>
								<div style={{
									position: "absolute",
									top: 0, left: 0, right: 0, bottom: 0,
									borderRadius: 6,
									border: "2px solid var(--background-alt)",
									opacity: .5,
									cursor: props.active ? "pointer" : "default"
								}} id={`pos-${(props.height - row - 1) * props.width + column}`} onClick={event => {
									props.onMove(Number((event.target as HTMLElement).id.split("-")[1]))
								}}/>
							</td>
						))}
					</tr>
				))
			}
		</tbody>
	</table>
}
