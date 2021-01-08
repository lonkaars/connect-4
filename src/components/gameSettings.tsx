// interface CurrentGameSettingsProps {
// gameID: string;
// }

import { Button } from './ui';

import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import {DialogBox} from './dialogBox';

export function CurrentGameSettings(/*props: CurrentGameSettingsProps*/) {
	return <div style={{
		position: "relative",
		height: 80
	}}>
		<p style={{
			opacity: .75,
			fontStyle: "italic",
			userSelect: "none",
			position: "absolute",
			top: "50%",
			left: 0,
			transform: "translateY(-50%)"
		}}>
			Geen tijdslimiet<br/>
			Standaardregels<br/>
			Gerangschikt
		</p>
		<Button style={{
			width: 150,
			position: "absolute",
			top: "50%",
			right: 0,
			transform: "translateY(-50%)"
		}}>
			<BuildRoundedIcon style={{ fontSize: 48 }}/>
			<span style={{
				fontWeight: 600,
				position: "absolute",
				right: 24,
				top: "50%",
				width: 85,
				verticalAlign: "middle",
				textAlign: "center",
				transform: "translateY(-50%)",
				userSelect: "none"
			}}>Spelregels aanpassen</span>
		</Button>
	</div>;

}

export function EditGameSettings() {
	return <DialogBox title="Spelregels aanpassen">
		<div style={{
			marginTop: 24,
			maxHeight: 500,
			overflowY: "scroll"
		}}>
			<span>Hier is een scrollende pagina in een dialoogvenster</span>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab qui, quod rerum temporibus dolorem repellendus eos pariatur velit doloribus necessitatibus dignissimos blanditiis mollitia alias expedita neque earum iure modi aspernatur.</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab qui, quod rerum temporibus dolorem repellendus eos pariatur velit doloribus necessitatibus dignissimos blanditiis mollitia alias expedita neque earum iure modi aspernatur.</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab qui, quod rerum temporibus dolorem repellendus eos pariatur velit doloribus necessitatibus dignissimos blanditiis mollitia alias expedita neque earum iure modi aspernatur.</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab qui, quod rerum temporibus dolorem repellendus eos pariatur velit doloribus necessitatibus dignissimos blanditiis mollitia alias expedita neque earum iure modi aspernatur.</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab qui, quod rerum temporibus dolorem repellendus eos pariatur velit doloribus necessitatibus dignissimos blanditiis mollitia alias expedita neque earum iure modi aspernatur.</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab qui, quod rerum temporibus dolorem repellendus eos pariatur velit doloribus necessitatibus dignissimos blanditiis mollitia alias expedita neque earum iure modi aspernatur.</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab qui, quod rerum temporibus dolorem repellendus eos pariatur velit doloribus necessitatibus dignissimos blanditiis mollitia alias expedita neque earum iure modi aspernatur.</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab qui, quod rerum temporibus dolorem repellendus eos pariatur velit doloribus necessitatibus dignissimos blanditiis mollitia alias expedita neque earum iure modi aspernatur.</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab qui, quod rerum temporibus dolorem repellendus eos pariatur velit doloribus necessitatibus dignissimos blanditiis mollitia alias expedita neque earum iure modi aspernatur.</p>
		</div>
	</DialogBox>;
}
