import { Component, CSSProperties, ReactNode } from "react";

import SearchIcon from '@material-ui/icons/Search';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

export function Vierkant(props: {
	href?: string;
	width?: string;
	height?: string;
	style?: CSSProperties;
	children?: ReactNode;
	className?: string; })
{
	return <a style={{
		padding: 24,
		backgroundColor: "var(--background)",
		borderRadius: 8,
		color: "var(--text)",
		margin: 6, // geen margin collapse = 12px marge
		display: "inline-block",
		position: "relative",
		boxSizing: "border-box",
		width: props.width ? props.width : undefined,
		height: props.height ? props.height : undefined,
		...props.style
	}} href={props.href} className={props.className}>{props.children}</a>
}

export function Button(props: {
	text?: string;
	children?: ReactNode;
	style?: CSSProperties;
	href?: string;
	onclick?: (() => void); })
{
	return <a onClick={props.onclick} href={props.href} style={{
		padding: props.text ? 8 : 16,
		textAlign: props.text ? "center" : "left",
		borderRadius: 8,
		backgroundColor: "var(--disk-a)",
		cursor: "pointer",
		position: "relative",
		textDecoration: "none",
		display: "block",
		...props.style
	}}>
	{ 
		props.text ?
			<span style={{
				fontWeight: 600,
				userSelect: "none"
			}}>{props.text}</span>
			: undefined
	}
	{ props.children }
	</a>;
}

export function Input(props: {
	label?: string,
	style?: CSSProperties,
	type?: string,
	id?: string
}) {
	return <input id={props.id} type={props.type || "text"} placeholder={props.label} spellCheck={false} style={{
		padding: 12,
		border: 0,
		width: "calc(100% - 24px)",
		fontSize: 14,
		backgroundColor: "var(--page-background)",
		color: "var(--text-alt)",
		borderRadius: 8,
		fontFamily: "Inter",
		...props.style
	}}/>
}

export function SearchBar(props: { label?: string }) {
	return <div style={{
		marginTop: 24,
		borderRadius: 8,
		overflow: "hidden",
		width: "100%"
	}}>
		<Input label={props.label} style={{
			width: "calc(100% - 24px - 41px)",
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0
		}}/>
		<div style={{
			width: 41,
			height: 41,
			backgroundColor: "var(--disk-a)",
			display: "inline-block",
			verticalAlign: "top",
			position: "relative"
		}}>
			<SearchIcon style={{
				fontSize: 24,
				position: "absolute",
				top: "50%", left: "50%",
				transform: "translate(-50%, -50%)"
			}}/>
		</div>
	</div>
}

export class CheckBox extends Component<{
	state?: boolean,
	style?: CSSProperties
}> {
	state = { on: this.props.state || false }
	public toggle = () => this.setState({ on: !this.state.on })

	render() {
		return <div onClick={this.toggle} style={{
			...this.props.style,
			display: "inline-block",
			cursor: "pointer"
		}}>
		{
			this.state.on ?
			<CheckBoxIcon style={{ fontSize: 24 }}/> :
			<CheckBoxOutlineBlankIcon style={{ fontSize: 24 }}/>
		}
		</div>;
	}
}



