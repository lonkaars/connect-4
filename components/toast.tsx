import { createContext, CSSProperties, ReactNode, useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';

function ToastArea(props: {
	style?: CSSProperties;
	children?: ReactNode;
	rerender?: boolean;
}) {
	return <div
		id='ToastArea'
		style={{
			position: 'fixed',
			whiteSpace: 'nowrap',
			bottom: 12,
			left: '50%',
			transform: 'translateX(-50%)',
			zIndex: 1,
			maxWidth: 600,
			width: 'calc(100% - 48px - 48px)',
			margin: '0 24px',
			...props.style,
		}}
	>
		{props.children}
	</div>;
}

function Toast(props: {
	text?: string;
	description?: string;
	icon?: ReactNode;
	children?: ReactNode;
	type?: 'normal' | 'confirmation' | 'error';
	style?: CSSProperties;
}) {
	var [visible, setVisibility] = useState(true);

	setTimeout(() => setVisibility(false), 10e3);

	return visible && <div
		style={{
			padding: 0,
			marginBottom: 12,
			borderRadius: 6,
			boxShadow: '0 8px 12px -4px #00000033',
			color: props.type === 'confirmation' ? 'var(--background)' : 'var(--text)',
			backgroundColor: props.type === 'normal'
				? 'var(--background)'
				: props.type === 'confirmation'
				? 'var(--disk-b)'
				: props.type === 'error'
				? 'var(--disk-a)'
				: 'var(--background)',
			...props.style,
		}}
	>
		{props.children
			|| <div
				style={{
					lineHeight: 0,
					padding: 12,
					minHeight: props.description ? 36 : 24,
					position: 'relative',
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: 12,
						top: '50%',
						transform: 'translateY(-50%)',
					}}
				>
					{props.icon}
				</div>
				<div
					style={{
						userSelect: 'none',
						position: 'absolute',
						left: props.icon ? 48 : 12,
						top: '50%',
						transform: 'translateY(-50%)',
					}}
				>
					<h2 style={{ fontSize: 16 }}>{props.text}</h2>
					<p>{props.description}</p>
				</div>
				<div
					style={{
						cursor: 'pointer',
						position: 'absolute',
						right: 12,
						top: '50%',
						transform: 'translateY(-50%)',
					}}
					onClick={() => setVisibility(false)}
				>
					<CloseIcon style={{ fontSize: 24 }} />
				</div>
			</div>}
	</div>;
}

export type toastSettings = {
	message: string;
	description?: string;
	type: 'confirmation' | 'normal' | 'error';
	icon?: ReactNode;
};
export type toastType = (settings: toastSettings) => void;
export var ToastContext = createContext<{ toast?: toastType; }>({});
var toasts: Array<JSX.Element> = [];

export function ToastContextWrapper(props: { children?: ReactNode; }) {
	var [dummyState, rerender] = useState(false);

	return <ToastContext.Provider
		value={{
			toast: options => {
				toasts.push(
					<Toast
						type={options.type}
						text={options.message}
						description={options.description}
						icon={options.icon}
					/>,
				);
				rerender(!dummyState);
			},
		}}
	>
		{props.children}
		<ToastArea rerender={dummyState}>
			{toasts}
		</ToastArea>
	</ToastContext.Provider>;
}
