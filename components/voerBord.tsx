export function VoerBord(props: {
	width: number;
	height: number;
	onMove: (move: number) => void;
}) {
	return <table style={{
		borderSpacing: 8,
		width: "100%"
	}}>
		<tbody>
			{
				[...Array(props.height).keys()].map((row) => (
					<tr>
						{[...Array(props.width).keys()].map((column) => (
							<td style={{
								position: "relative",
								width: "100%",
								padding: 0
							}}>
								<div style={{
									display: "block",
									marginTop: "100%"
								}}/>
								<div style={{
									position: "absolute",
									top: 0, left: 0, right: 0, bottom: 0,
									borderRadius: 6,
									border: "2px solid var(--background-alt)",
									opacity: .5,
									cursor: "pointer"
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
