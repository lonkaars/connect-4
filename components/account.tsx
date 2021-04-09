var dummy =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2P4z/j/PwAHAQL/gXZXNQAAAABJRU5ErkJggg==';

export function AccountAvatar(props: {
	size: number;
	dummy?: boolean;
	fallbackFill?: string;
	round?: boolean;

	id?: string;
}) {
	var image = '';
	image += '/api/user/avatar';
	if (typeof props.id === 'string') {
		if (!props.id) image = '';
		else image += `?id=${props.id}`;
	}

	if (props.dummy) image = dummy;

	return <div
		style={{
			width: props.size,
			height: props.size,
			backgroundColor: props.fallbackFill || 'var(--background)',
			backgroundImage: `url(${image})`,
			backgroundSize: 'cover',
			display: 'inline-block',
			borderRadius: props.size / 2 * Number(props.round || 0),
		}}
	/>;
}
