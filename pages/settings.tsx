import axios from 'axios';
import reduce from 'image-blob-reduce';
import { useContext, useEffect } from 'react';

import { AccountAvatar } from '../components/account';
import { Footer } from '../components/footer';
import { CurrentGameSettings } from '../components/gameSettings';
import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import PreferencesContext from '../components/preferencesContext';
import { CheckBox, ColorPicker, IconLabelButton, Vierkant } from '../components/ui';
import ThemePicker from '../components/themes';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

async function uploadNewProfileImage() {
	if (!this.result) return;

	var result = this.result.split(';');
	var mimeType = result[0].substr(5);

	if (!['image/png', 'image/jpeg'].includes(mimeType)) return;

	var blob = await (await fetch(this.result)).blob();

	var image = await new reduce().toBlob(blob, { max: 256 });
	var reader = new FileReader();

	reader.readAsBinaryString(image);
	reader.onload = async () => {
		await axios.request({
			method: 'post',
			url: `/api/user/avatar`,
			headers: { 'content-type': 'image/png' },
			data: btoa(reader.result as string),
		});
		window.location.reload(); // TODO: this is straight garbage
	};
}

export default function SettingsPage() {
	var { preferences, updatePreference } = useContext(PreferencesContext);

	return (
		<div>
			<NavBar />
			<CenteredPage width={802}>
				<PageTitle>Instellingen</PageTitle>
				<Vierkant className='section account w100m2m pad-l bg-800'>
					<h2>Account</h2>
					<div className='subsection'>
						<AccountAvatar size={100} />
						<label htmlFor='pfUpload'>
							<IconLabelButton text='Nieuwe profielfoto uploaden' icon={<PublishOutlinedIcon />} />
						</label>
						<input
							type='file'
							id='pfUpload'
							accept='.png,.jpg,.jpeg'
							className='dispnone'
							onChange={event => {
								var file = event.target.files[0];
								if (!file) return;

								var reader = new FileReader();
								reader.onload = uploadNewProfileImage;
								reader.readAsDataURL(file);
							}}
						/>
					</div>
					<div className='subsection'>
						<IconLabelButton text='Bewerken' icon={<EditOutlinedIcon />} />
						<div className='dispbl'>
							<h3>Gebruikersnaam</h3>
							<p>Hier staat hij dan</p>
						</div>
					</div>
					<div className='subsection'>
						<IconLabelButton text='Bewerken' icon={<EditOutlinedIcon />} />
						<IconLabelButton text='Onthullen' icon={<VisibilityOutlinedIcon />} />
						<div className='dispbl'>
							<h3>Email</h3>
							<p>******@example.com</p>
						</div>
					</div>
					<div className='subsection'>
						<IconLabelButton text='Bewerken' icon={<EditOutlinedIcon />} />
						<div className='dispbl'>
							<h3>Wachtwoord</h3>
						</div>
					</div>
				</Vierkant>
				<Vierkant className='section colors w100m2m pad-l bg-800'>
					<h2>Kleuren</h2>
					<div className='subsection'>
						<ColorPicker />
						<ColorPicker />
						<div className='dispbl'>
							<h3>Schijfjes</h3>
						</div>
					</div>
					<div className='subsection'>
						<div className='floatr'>
							<CheckBox
								state={preferences?.darkMode}
								onclick={state => updatePreference({ 'darkMode': state })}
							/>
						</div>
						<h3>Donkere modus</h3>
					</div>
					<div className="subsection">
						<ThemePicker preferences={preferences}/>
					</div>
				</Vierkant>
				<Vierkant className='section gamerules w100m2m pad-l bg-800'>
					<h2>Standaard spelregels</h2>
					<div className='subsection'>
						<CurrentGameSettings />
					</div>
				</Vierkant>
				<Vierkant className='section logout w100m2m pad-l bg-800'>
					<h2>Uitloggen</h2>
					<div className='center'>
						<IconLabelButton
							className='dispinbl'
							icon={<ExitToAppOutlinedIcon />}
							text='Uitloggen'
							href='/logout'
						/>
					</div>
				</Vierkant>
			</CenteredPage>
			<Footer />
		</div>
	);
}
