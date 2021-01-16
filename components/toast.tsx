import { CSSProperties, ReactNode, Component } from "react";

import CloseIcon from '@material-ui/icons/Close';

export function ToastArea(props: {
	style?: CSSProperties
	children?: ReactNode
}) {
	return <div id="ToastArea" style={{
		position: "fixed",
		whiteSpace: "nowrap",
		bottom: 12,
		left: "50%",
		transform: "translateX(-50%)",
		zIndex: 1,
		maxWidth: 600,
		width: "calc(100% - 48px - 48px)",
		margin: "0 24px",
		...props.style
	}}>{props.children}</div>
}

export class Toast extends Component<{
	text?: string
	icon?: ReactNode
	children?: ReactNode
	type?: "normal"|"confirmation"|"error"
	style?: CSSProperties
}> {
	state = { render: true }

	close = () => this.setState({ render: false })

	render () {
		if (!this.state.render) return null;
		return <div style={{
			padding: 0,
			marginBottom: 12,
			borderRadius: 8,
			color: "var(--text)",
			boxShadow: "0 8px 12px -4px #00000033",
			backgroundColor:
				this.props.type === "normal" ? "var(--background)" :
				this.props.type === "confirmation" ? "var(--disk-a)" :
				this.props.type === "error" ? "var(--disk-b)" : "var(--background)",
			...this.props.style
		}}>
		{
			this.props.children ?
			this.props.children :
			<div style={{ lineHeight: 0 }}>
				<div style={{
					fontSize: 0,
					margin: 16,
					display: "inline-block",
					verticalAlign: "top",
					width: 32, height: 32
				}}>{this.props.icon}</div>
				<h2 style={{
					margin: "20px 0",
					display: "inline-block",
					width: "calc(100% - 128px)",
					verticalAlign: "top",
					fontSize: 20
				}}>{this.props.text}</h2>
				<div style={{
					padding: 20,
					display: "inline-block",
					cursor: "pointer"
				}} onClick={this.close}>
					<CloseIcon style={{ fontSize: 24 }}/>
				</div>
			</div>
		}
		</div>
	}
}

