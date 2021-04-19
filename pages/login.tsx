import axios from 'axios';
import { FormEvent, useContext } from 'react';

import { NavBar } from '../components/navbar';
import { CenteredPage } from '../components/page';
import { ToastContext, toastType } from '../components/toast';
import { Button, Input, Vierkant } from '../components/ui';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

function submitLogin(event?: FormEvent<HTMLFormElement>, toast?: toastType) {
	event?.preventDefault();

	var formData = {
		email: (document.getElementById('email') as HTMLInputElement).value,
		password: (document.getElementById('password') as HTMLInputElement).value,
	};

	if (
		!formData.email
		|| !formData.password
	) {
		toast({ message: 'Vul alsjeblieft alle velden in!', type: 'error', icon: <ReportProblemOutlinedIcon /> });
		return;
	}

	axios({
		method: 'post',
		url: `${window.location.origin}/api/auth/login`,
		headers: { 'content-type': 'application/json' },
		data: formData,
	})
		.then(() => window.location.pathname = '/')
		.catch(error => {
			if (error.response.status === 401) {
				toast({ message: 'Verkeerde gebruikersnaam of wachtwoord!', type: 'error', icon: <VpnKeyIcon /> });
				return;
			}
			toast({ message: 'Er is iets fout gegaan', type: 'error', icon: <ErrorOutlineIcon /> });
		});
}

export default function LoginPage() {
	var { toast } = useContext(ToastContext);

	return (
		<div>
			<NavBar />
			<CenteredPage width={500} style={{ height: '100vh' }}>
				<div className='posrel center centeredForm'>
					<Vierkant className='pad-l'>
						<form onSubmit={(e) => submitLogin(e, toast)}>
							<Input
								autofocus
								autocomplete='username'
								id='email'
								label='email of gebruikersnaam'
								className='pad-m fullwidth bg-900 round-t'
							/>
							<Input
								autocomplete='current-password'
								id='password'
								label='wachtwoord'
								type='password'
								className='pad-m fullwidth bg-900 round-t'
							/>
							<div className='sidebyside'>
								<Button
									href='/register'
									text='Registreren'
									className='register bg-700 fg-100'
								/>
								<Button text='Inloggen' className='login' onclick={() => submitLogin(null, toast)} />
							</div>
							<input type='submit' className='dispnone' />
						</form>
					</Vierkant>
				</div>
			</CenteredPage>
		</div>
	);
}
