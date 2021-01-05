import { Component, CSSProperties } from 'react';

var CenteredPageStyle: CSSProperties = {
	maxWidth: 783,
	margin: "0 auto"
}

export class CenteredPage extends Component {
	render () {
		return <div style={CenteredPageStyle}>
			{this.props.children}
		</div>
	}
}
