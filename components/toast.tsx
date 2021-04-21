import { createContext, ReactNode, useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';

function ToastArea(props: {
	children?: ReactNode;
	rerender?: boolean;
}) {
	return <div
		id='ToastArea'
		className='posfix abscenterh'
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
}) {
	var [visible, setVisibility] = useState(true);

	setTimeout(() => setVisibility(false), 10e3);

	return visible && <div className={'round-t drop-1 toast ' + props.type}>
		{props.children
			|| <div
				className={'inner pad-m posrel '
					+ (props.description ? 'hasDescription' : '') + ' '
					+ (props.icon ? 'hasIcon' : '')}
			>
				<div className='icon posabs abscenterv'>
					{props.icon}
				</div>
				<div className='content nosel posabs abscenterv'>
					<h2>{props.text}</h2>
					<p>{props.description}</p>
				</div>
				<div
					className='closeIcon posabs abscenterv'
					onClick={() => setVisibility(false)}
				>
					<CloseIcon />
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
