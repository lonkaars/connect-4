import { Component, CSSProperties } from 'react';

var CenteredPageStyle: CSSProperties = {
	maxWidth: 783,
	margin: "0 auto"
}

export class CenteredPage extends Component {
	render () {
		return <div style={CenteredPageStyle}>
			<div style={{margin: "0 6px"}}> {this.props.children} </div>
		</div>;
	}
}

var PageTitleStyle: CSSProperties = {
	color: "var(--background)",
	marginLeft: 6,
	marginTop: 32,
	marginBottom: 64,
	fontSize: 25
}

export class PageTitle extends Component {
	render () {
		return <h1 style={PageTitleStyle}>{this.props.children}</h1>;
	}
}
