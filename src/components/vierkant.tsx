import { Component, CSSProperties } from "react";

var VierkantStyle: CSSProperties = {
	padding: 24,
	backgroundColor: "var(--background)",
	borderRadius: 8,
	color: "var(--text)",
	margin: 6, // geen margin collapse = 12px marge
	display: "inline-block",
	position: "relative"
}

export class Vierkant extends Component {
	render () {
		return <div style={VierkantStyle}>
			{this.props.children}
		</div>
	}
}

