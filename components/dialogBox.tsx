import { CSSProperties, ReactNode } from 'react';

import { Vierkant } from './ui';

import CancelIcon from '@material-ui/icons/Cancel';

export function DialogBox(props: {
	children: ReactNode;
	title: string;
	style?: CSSProperties;
	onclick?: () => void;
}) {
	return <Vierkant
		style={{
			position: 'fixed',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			boxShadow: '0 8px 32px -5px #0007',
			width: 392,
			...props.style,
		}}
	>
		<h2 style={{ marginBottom: 24 }}>{props.title}</h2>
		<span onClick={props.onclick}>
			<CancelIcon
				style={{
					position: 'absolute',
					top: 25,
					right: 25,
					color: 'var(--text)',
					opacity: .85,
					cursor: 'pointer',
				}}
			/>
		</span>
		{props.children}
	</Vierkant>;
}
