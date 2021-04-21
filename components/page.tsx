import { Component, ReactNode } from 'react';

export function CenteredPage(props: {
	width?: number;
	children?: ReactNode;
	className?: string;
}) {
	return <div
		className='CenteredPageOuter'
		style={{ maxWidth: props.width }}
	>
		<div className={'CenteredPageInner ' + props.className}>
			{props.children}
		</div>
	</div>;
}

export class PageTitle extends Component {
	render() {
		return <h1 className='pageTitle'>
			{this.props.children}
		</h1>;
	}
}
