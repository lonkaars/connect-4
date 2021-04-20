import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SearchIcon from '@material-ui/icons/Search';

export function Vierkant(props: {
	href?: string;
	width?: string;
	height?: string;
	children?: ReactNode;
	className?: string;
	id?: string;
	onclick?: () => void;
}) {
	return <a
		href={props.href}
		className={['round-l', 'vierkant', props.className].join(' ')}
		id={props.id}
		onClick={props.onclick}
	>
		{props.children}
	</a>;
}

export function Button(props: {
	text?: string;
	children?: ReactNode;
	href?: string;
	className?: string;
	onclick?: () => void;
	id?: string;
}) {
	return <a
		onClick={props.onclick}
		href={props.href}
		id={props.id}
		className={'button pad-s round-t ' + props.className}
	>
		{props.text
			? <span>
				{props.text}
			</span>
			: undefined}
		{props.children}
	</a>;
}

export function IconLabelButton(props: {
	text: string;
	icon: ReactNode;
	onclick?: () => void;
	href?: string;
	className?: string;
}) {
	return <Button
		onclick={props.onclick}
		href={props.href}
		className={'iconlabel dispinbl valigntop floatr' + ' ' + props.className}
	>
		<div className='dispinbl icon'>
			{props.icon}
		</div>
		<span className='dispinbl valigntop label'>
			{props.text}
		</span>
	</Button>;
}

export function Input(props: {
	label?: string;
	style?: CSSProperties;
	type?: string;
	id?: string;
	min?: number;
	max?: number;
	value?: string | number;
	dark?: boolean;
	autocomplete?: string;
	autofocus?: boolean;
	className?: string;
}) {
	return <input
		id={props.id}
		type={props.type || 'text'}
		min={props.min}
		max={props.max}
		placeholder={props.label}
		spellCheck={false}
		defaultValue={props.value ? String(props.value) : ''}
		className={'input' + ' ' + (props.dark ? 'dark' : 'light') + ' ' + props.className}
		autoComplete={props.autocomplete}
		autoFocus={props.autofocus}
	/>;
}

export function SearchBar(props: { label?: string; }) {
	return <div className='searchBar round-t fullwidth'>
		<Input
			label={props.label}
			className='pad-m bg-700'
		/>
		<Button className='dispinbl valigntop'>
			<SearchIcon className='icon' />
		</Button>
	</div>;
}

export function CheckBox(props: {
	state?: boolean;
	style?: CSSProperties;
	id?: string;
	onclick?: (state: boolean) => void;
}) {
	var [gotDefaultState, setGotDefaultState] = useState(false);
	var [on, setOn] = useState(props.state);

	useEffect(() => {
		if (gotDefaultState) return;
		setOn(props.state);
		if (typeof props.state !== 'undefined') setGotDefaultState(true);
	});

	var toggle = () => {
		setOn(!on);
		props.onclick && props.onclick(!on);
	};

	return <div
		onClick={toggle}
		id={props.id}
		className={on ? 'on' : 'off'}
		style={{
			...props.style,
			display: 'inline-block',
			cursor: 'pointer',
		}}
	>
		{on
			? <CheckBoxIcon />
			: <CheckBoxOutlineBlankIcon />}
	</div>;
}

export function ColorPicker() {
	var [dark, setDark] = useState(false);
	var [color, setColor] = useState('#012345');

	return <Button className='colorpicker dispinbl valigntop pad-s floatr'>
		<div>
			<EditOutlinedIcon />
			<div className='labelwrapper valigntop dispinbl center posrel'>
				<span className='label posabs'>
					{color}
				</span>
			</div>
		</div>
	</Button>;
}

export function Tuitje() {
	return <svg
		width='36'
		height='12'
		viewBox='0 0 36 12'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className='tuitje posabs'
	>
		<path
			d='M18 12C24 12 27 0 36 0L0 0C9 0 12 12 18 12Z'
			fill='var(--background)'
		/>
	</svg>;
}

export function Bubble(props: {
	children?: ReactNode;
}) {
	return <Vierkant className='bubble posabs center drop-2'>
		{props.children}
		<Tuitje />
	</Vierkant>;
}
