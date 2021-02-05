import { Component } from "react";

interface AccountAvatarProps {
	size: number;
	image?: string;
	dummy?: boolean;
	fallbackFill?: string;
	round?: boolean;
}

export class AccountAvatar extends Component<AccountAvatarProps> {
	render() {
		var image = this.props.dummy ?
			"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2P4z/j/PwAHAQL/gXZXNQAAAABJRU5ErkJggg==)" :
			this.props.image;
		return <div style={{
			width: this.props.size,
			height: this.props.size,
			backgroundImage: image,
			backgroundSize: "cover",
			display: "inline-block",
			borderRadius: this.props.size / 2 * Number(this.props.round || 0)
		}}/>;
	}
}


