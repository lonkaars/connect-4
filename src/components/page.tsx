import { Component, CSSProperties } from 'react';

var CenteredPageStyle: CSSProperties = {
	maxWidth: 802,
	margin: "0 auto"
}

export class CenteredPage extends Component {
	render () {
		return <div className="CenteredPageOuter" style={CenteredPageStyle}>
		<div className="CenteredPageInner" style={{
			margin: "0 6px",
			lineHeight: 0
		}}> {this.props.children} </div>
		</div>;
	}
}

var PageTitleStyle: CSSProperties = {
	color: "var(--text-alt)",
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
