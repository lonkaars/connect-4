import axios from 'axios';
import reduce from 'image-blob-reduce';
import { useContext, useEffect, useState } from 'react';
import * as cookie from 'react-cookies';

import { userInfo } from '../api/api';
import { AccountAvatar } from '../components/account';
import { DialogBox } from '../components/dialogBox';
import { Footer } from '../components/footer';
import { CurrentGameSettings } from '../components/gameSettings';
import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import PreferencesContext from '../components/preferencesContext';
import ThemePicker from '../components/themes';
import { Button, CheckBox, ColorPicker, IconLabelButton, Input, Vierkant } from '../components/ui';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
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

function EditImportantThingDialog(props: {
	thing: 'username' | 'email';
	hidden?: boolean;
	setHidden?: () => void;
}) {
	var lang = {
		'username': {
			name: 'Gebruikersnaam',
			new: 'Nieuwe gebruikersnaam',
		},
		'email': {
			name: 'Email',
			new: 'Nieuw email-adres',
		},
	}[props.thing];
	var title = lang.name + ' aanpassen';
	return !props.hidden && <DialogBox title={title} onclick={props.setHidden}>
		<Input className='bg-900 pad-m fullwidth round-t' label={lang.new} id='newThing' autocomplete='off' />
		<div className='pad-s'></div>
		<Input
			className='bg-900 pad-m fullwidth round-t'
			label='Huidig wachtwoord'
			id='currentPassword'
			type='password'
			autocomplete='current-password'
		/>
		<div className='pad-m'></div>
		<Button
			text={title}
			onclick={() => {
				var data = {
					password: (document.getElementById('currentPassword') as HTMLInputElement).value,
				};
				data[props.thing] = (document.getElementById('newThing') as HTMLInputElement).value;
				axios.request({
					method: 'post',
					url: '/api/user/' + props.thing,
					headers: { 'content-type': 'application/json' },
					data,
				}).then(() => {
					window.location.reload();
				});
				props.setHidden();
			}}
		/>
	</DialogBox>;
}

export default function SettingsPage() {
	useEffect(() => {
		var loggedIn = !!cookie.load('token');
		if (!loggedIn) window.location.href = '/';
	}, []);

	var { preferences, updatePreference } = useContext(PreferencesContext);

	var [userInfo, setUserInfo] = useState<userInfo>();
	var [emailVisible, setEmailVisible] = useState(false);

	var [editUsernameDiagVisisble, setEditUsernameDiagVisisble] = useState(false);
	var [editEmailDiagVisisble, setEditEmailDiagVisisble] = useState(false);

	useEffect(() => {
		axios.request<userInfo>({
			url: `/api/user/info`,
		}).then(req => {
			setUserInfo(req.data);
		}).catch(err => {
			console.error(err);
		});
	}, []);

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
						<EditImportantThingDialog
							thing='username'
							hidden={!editUsernameDiagVisisble}
							setHidden={() => setEditUsernameDiagVisisble(false)}
						/>
						<IconLabelButton
							text='Bewerken'
							icon={<EditOutlinedIcon />}
							onclick={() => setEditUsernameDiagVisisble(true)}
						/>
						<div className='dispbl'>
							<h3>Gebruikersnaam</h3>
							<p>{userInfo?.username}</p>
						</div>
					</div>
					<div className='subsection'>
						<EditImportantThingDialog
							thing='email'
							hidden={!editEmailDiagVisisble}
							setHidden={() => setEditEmailDiagVisisble(false)}
						/>
						<IconLabelButton
							text='Bewerken'
							icon={<EditOutlinedIcon />}
							onclick={() => setEditEmailDiagVisisble(true)}
						/>
						{emailVisible
							? <IconLabelButton
								text='Verbergen'
								icon={<VisibilityOutlinedIcon />}
								onclick={() => setEmailVisible(!emailVisible)}
							/>
							: <IconLabelButton
								text='Onthullen'
								icon={<VisibilityOutlinedIcon />}
								onclick={() => setEmailVisible(!emailVisible)}
							/>}
						<div className='dispbl'>
							<h3>Email</h3>
							<p>
								{(() => {
									var email = userInfo?.email;
									if (email && !emailVisible) email = email.replace(/.+?(?=@)/, '************');
									return email;
								})()}
							</p>
						</div>
					</div>
					{false && <>
						<div className='subsection'>
							<IconLabelButton text='Bewerken' icon={<EditOutlinedIcon />} />
							<div className='dispbl'>
								<h3>Wachtwoord</h3>
							</div>
						</div>
					</>}
				</Vierkant>
				<Vierkant className='section colors w100m2m pad-l bg-800'>
					<h2>Kleuren</h2>
					{false && <div className='subsection'>
						<ColorPicker />
						<ColorPicker />
						<div className='dispbl'>
							<h3>Schijfjes</h3>
						</div>
					</div>}
					<div className='subsection'>
						<div className='floatr'>
							<CheckBox
								state={preferences?.darkMode}
								onclick={state => updatePreference({ 'darkMode': state })}
							/>
						</div>
						<h3>Donkere modus</h3>
					</div>
					<div className='subsection'>
						<h3>Thema's (WIP)</h3>
						<ThemePicker preferences={preferences} />
					</div>
				</Vierkant>
				<Vierkant className='section gamerules w100m2m pad-l bg-800'>
					<h2>Standaard spelregels</h2>
					<div className='subsection'>
						<CurrentGameSettings />
					</div>
				</Vierkant>
			</CenteredPage>
			<Footer />
		</div>
	);
}
