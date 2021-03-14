import { CSSProperties, useContext } from 'react';
import * as cookies from 'react-cookies';
import axios from 'axios';

import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant, IconLabelButton, CheckBox, ColorPicker } from '../components/ui';
import { AccountAvatar } from '../components/account';
import { CurrentGameSettings } from '../components/gameSettings';
import PreferencesContext from '../components/preferencesContext';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';

var SettingsSubsectionStyle: CSSProperties = {
	marginTop: 24,
	minHeight: 40
};

function uploadNewProfileImage() {
	if (!this.result) return;
	var result = this.result.split(";");
	var mimeType = result[0].substr(5);
	var data = result[1].substr(7);
	if (!["image/png", "image/jpeg"].includes(mimeType)) return;
	axios.request({
		method: "post",
		url: `/api/user/avatar`,
		headers: {"content-type": "image/png"},
		data: data
	})
	.then(() => window.location.reload()); //TODO: this is straight garbage
}

export default function SettingsPage() {
	var { preferences, updatePreference } = useContext(PreferencesContext);

	return (
		<div>
			<NavBar/>
			<CenteredPage width={802}>
				<PageTitle>Instellingen</PageTitle>
				<Vierkant fullwidth>
					<h2>Account</h2>
					<div style={SettingsSubsectionStyle}>
						<AccountAvatar size={100}/>
						<label htmlFor="pfUpload">
							<IconLabelButton text="Nieuwe profielfoto uploaden" icon={<PublishOutlinedIcon/>}/>
						</label>
						<input
							type="file"
							id="pfUpload"
							accept=".png,.jpg,.jpeg"
							style={{ display: "none" }}
							onChange={event => {
							var file = event.target.files[0];
							if (!file) return;

							var reader = new FileReader();
							reader.onload = uploadNewProfileImage;
							reader.readAsDataURL(file);
						}}/>
					</div>
					<div style={SettingsSubsectionStyle}>
						<IconLabelButton text="Bewerken" icon={<EditOutlinedIcon/>}/>
						<div style={{ display: "block" }}>
							<h3>Gebruikersnaam</h3>
							<p>Hier staat hij dan</p>
						</div>
					</div>
					<div style={SettingsSubsectionStyle}>
						<IconLabelButton text="Bewerken" icon={<EditOutlinedIcon/>}/>
						<IconLabelButton text="Onthullen" icon={<VisibilityOutlinedIcon/>}/>
						<div style={{ display: "block" }}>
							<h3>Email</h3>
							<p>******@example.com</p>
						</div>
					</div>
					<div style={SettingsSubsectionStyle}>
						<IconLabelButton text="Bewerken" icon={<EditOutlinedIcon/>}/>
						<div style={{ display: "block" }}>
							<h3>Wachtwoord</h3>
						</div>
					</div>
				</Vierkant>
				<Vierkant fullwidth>
					<h2>Kleuren</h2>
					<div style={SettingsSubsectionStyle}>
						<ColorPicker/>
						<ColorPicker/>
						<div style={{ display: "block" }}>
							<h3>Schijfjes</h3>
						</div>
					</div>
					<div style={SettingsSubsectionStyle}>
						<ColorPicker/>
						<div style={{ display: "block" }}>
							<h3>Achtergrond</h3>
						</div>
					</div>
					<div style={SettingsSubsectionStyle}>
						<div style={{ float: "right" }}>
							<CheckBox state={preferences?.darkMode} onclick={
								state => updatePreference({"darkMode": state})
							}/>
						</div>
						<h3>Donkere modus</h3>
					</div>
				</Vierkant>
				<Vierkant fullwidth>
					<h2>Standaard spelregels</h2>
					<div style={SettingsSubsectionStyle}>
						<CurrentGameSettings/>
					</div>
				</Vierkant>
				<Vierkant fullwidth>
					<h2>Uitloggen</h2>
					<div style={{
						width: "100%",
						textAlign: "center"
					}}>
						<IconLabelButton icon={<ExitToAppOutlinedIcon/>} text="Uitloggen" style={{
							float: "none",
							marginLeft: 0
						}} onclick={() => {
							cookies.remove("token")
							window.location.pathname = "/";
						}}/>
					</div>
				</Vierkant>
			</CenteredPage>
		</div>
	);
}

