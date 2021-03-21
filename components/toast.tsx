import { CSSProperties, ReactNode, useState, createContext } from "react";

import CloseIcon from '@material-ui/icons/Close';

function ToastArea(props: {
	style?: CSSProperties
	children?: ReactNode
	rerender?: boolean;
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

function Toast(props: {
	text?: string
	icon?: ReactNode
	children?: ReactNode
	type?: "normal"|"confirmation"|"error"
	style?: CSSProperties
}) {
	var [visible, setVisibility] = useState(true);

	setTimeout(() => setVisibility(false), 10e3);

	return visible && <div style={{
		padding: 0,
		marginBottom: 12,
		borderRadius: 8,
		boxShadow: "0 8px 12px -4px #00000033",
		color:
			props.type === "confirmation" ? "var(--background)" : "var(--text)",
		backgroundColor:
			props.type === "normal" ? "var(--background)" :
			props.type === "confirmation" ? "var(--disk-b)" :
			props.type === "error" ? "var(--disk-a)" : "var(--background)",
		...props.style
	}}>
		{
			props.children ||
			<div style={{ lineHeight: 0 }}>
				<div style={{
					fontSize: 0,
					margin: 16,
					display: "inline-block",
					verticalAlign: "top",
					width: 32, height: 32
				}}>{props.icon}</div>
				<h2 style={{
					margin: "20px 0",
					display: "inline-block",
					width: "calc(100% - 128px)",
					verticalAlign: "top",
					fontSize: 20,
					userSelect: "none"
				}}>{props.text}</h2>
				<div style={{
					padding: 20,
					display: "inline-block",
					cursor: "pointer"
				}} onClick={() => setVisibility(false)}>
					<CloseIcon/>
				</div>
			</div>
		}
	</div>
}

export type toastType = (message: string, type: "confirmation"|"normal"|"error", icon?: ReactNode ) => void;
export var ToastContext = createContext<{ toast?: toastType }>({});
var toasts: Array<JSX.Element> = [];

export function ToastContextWrapper(props: { children?: ReactNode }) {
	var [dummyState, rerender] = useState(false);

	return <ToastContext.Provider value={{ toast: (message, type, icon? ) => {
		toasts.push(<Toast type={type} text={message} icon={icon}/>);
		rerender(!dummyState);
	} }}>
		{ props.children }
		<ToastArea rerender={dummyState}>
			{toasts}
		</ToastArea>
	</ToastContext.Provider>
}

