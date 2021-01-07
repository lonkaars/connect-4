interface VoerBordProps {
	width: number;
	height: number;
}

export function VoerBord(props: VoerBordProps) {
	return <table style={{
		borderSpacing: 8,
		width: "100%"
	}}>
		<tbody>
			{
				[...Array(props.height)].map(() => (
					<tr>
						{[...Array(props.width)].map(() => (
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
									opacity: .5
								}}/>
							</td>
						))}
					</tr>
				))
			}
		</tbody>
	</table>
}
