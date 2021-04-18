import { ReactNode } from 'react';

import { Vierkant } from './ui';

import CancelIcon from '@material-ui/icons/Cancel';

export function DialogBox(props: {
	children: ReactNode;
	title: string;
	onclick?: () => void;
	hidden?: boolean;
}) {
	return <Vierkant className={'dialogbox drop-2 pad-l posfix abscenter ' + (props.hidden ? 'dispnone' : '')}>
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
