import { ReactNode } from 'react';

import { Vierkant } from './ui';

import CancelIcon from '@material-ui/icons/Cancel';

export function DialogBox(props: {
	children: ReactNode;
	title: string;
	onclick?: () => void;
	hidden?: boolean;
	className?: string;
}) {
	return <Vierkant
		className={'dialogbox bg-800 drop-2 pad-l posfix abscenter ' + (props.hidden ? 'dispnone' : '') + ' '
			+ props.className}
	>
		<h2 className='title'>{props.title}</h2>
		<span onClick={props.onclick}>
			<CancelIcon className='posabs close icon subtile' />
		</span>
		{props.children}
	</Vierkant>;
}
