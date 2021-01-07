import { Component, CSSProperties, ReactNode } from 'react';

interface CenteredPageProps {
	width?: number;
	children?: ReactNode;
	style?: CSSProperties;
}

export function CenteredPage (props: CenteredPageProps) {
	return <div className="CenteredPageOuter" style={{
		maxWidth: props.width,
		margin: "0 auto"
	}}>
		<div className="CenteredPageInner" style={{
			margin: "0 6px",
			lineHeight: 0,
			...props.style
		}}>{props.children}</div>
	</div>;
}

export class PageTitle extends Component {
	render () {
		return <h1 style={{
			color: "var(--text-alt)",
			marginLeft: 6,
			marginTop: 32,
			marginBottom: 64,
			fontSize: 25
		}}>{this.props.children}</h1>;
	}
}
