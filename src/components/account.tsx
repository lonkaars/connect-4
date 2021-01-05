interface AccountAvatarProps {
	size: number;
	image: string;
}

export function AccountAvatar(props: AccountAvatarProps) {
	return <div style={{
		width: props.size,
		height: props.size,
		backgroundImage: props.image,
		backgroundSize: "cover",
		display: "inline-block"
	}}></div>;
}


