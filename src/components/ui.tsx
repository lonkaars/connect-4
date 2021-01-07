import { CSSProperties, ReactNode } from "react";

interface VierkantProps {
	href?: string;
	width?: string;
	height?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

export function Vierkant(props: VierkantProps) {
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
	}} href={props.href}>{props.children}</a>
}

interface ButtonProps {
	text?: string;
	children?: ReactNode;
	style?: CSSProperties;
	onclick?: (() => void);
}

export function Button(props: ButtonProps) {
	return <div onClick={props.onclick} style={{
		padding: props.text ? 8 : 16,
		textAlign: props.text ? "center" : "left",
		borderRadius: 8,
		backgroundColor: "var(--disk-a)",
		cursor: "pointer",
		position: "relative",
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
	</div>;
}

