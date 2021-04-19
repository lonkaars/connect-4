import axios from 'axios';
import { validate as validateEmail } from 'email-validator';
import { FormEvent, useContext } from 'react';

import { NavBar } from '../components/navbar';
import { CenteredPage } from '../components/page';
import { ToastContext, toastType } from '../components/toast';
import { Button, Input, Vierkant } from '../components/ui';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

function submitRegister(event?: FormEvent<HTMLFormElement>, toast?: toastType) {
	event?.preventDefault();

	var formData = {
		username: (document.getElementById('username') as HTMLInputElement).value,
		email: (document.getElementById('email') as HTMLInputElement).value,
		password: (document.getElementById('password') as HTMLInputElement).value,
	};

	if (
		!formData.username
		|| !formData.email
		|| !formData.password
	) {
		toast({ message: 'Vul alsjeblieft alle velden in!', type: 'error', icon: <ReportProblemOutlinedIcon /> });
		return;
	}

	var passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
	/*
	 * ^ 				Begin string
	 * (?=.*[A-Z]) 		Minimaal één hoofdletter
	 * (?=.*[a-z]) 		Minimaal één kleine letter
	 * (?=.*[0-9]) 		Minimaal één getal
	 * .{8,} 			Minimaal acht tekens in lengte
	 * $ 				Ende string
	 * https://stackoverflow.com/questions/5142103/regex-to-validate-password-strength
	 */

	if (formData.username.length < 3 || formData.username.length > 35) {
		toast({
			message: 'Ongeldige gebruikersnaam',
			description: 'Je gebruikersnaam moet tussen de 3 en 35 letters zijn',
			type: 'error',
			icon: <ReportProblemOutlinedIcon />,
		});
		return;
	}

	if (!validateEmail(formData.email)) {
		toast({ message: 'Ongeldig email-adres', type: 'error', icon: <ReportProblemOutlinedIcon /> });
		return;
	}

	// TODO: wachtwoord max 72 tekens ivm bcrypt
	if (!formData.password.match(passwordRegex)) {
		toast({
			message: 'Ongeldig wachtwoord',
			description: 'Je wachtwoord moet een hoofdletter, kleine letter en een getal bevatten',
			type: 'error',
			icon: <ReportProblemOutlinedIcon />,
		});
		return;
	}

	axios({
		method: 'post',
		url: `${window.location.origin}/api/auth/signup`,
		headers: { 'content-type': 'application/json' },
		data: formData,
	})
		.then(() => {
			// TODO: email verificatie
			// redirect naar home, automatische login
			window.location.pathname = '/';
		})
		.catch(error => {
			toast({ message: 'Er is iets fout gegaan', type: 'error', icon: <ErrorOutlineIcon /> });
			console.log(error);
		});
}

export default function RegisterPage() {
	var { toast } = useContext(ToastContext);

	return (
		<div>
			<NavBar />
			<CenteredPage width={500} style={{ height: '100vh' }}>
				<div className='posrel center centeredForm'>
					<Vierkant className='pad-l'>
						<form onSubmit={(e) => submitRegister(e, toast)}>
							<Input
								autofocus
								autocomplete='username'
								id='username'
								label='gebruikersnaam'
								className='pad-m fullwidth bg-900 round-t'
							/>
							<Input
								autocomplete='email'
								id='email'
								label='email'
								className='pad-m fullwidth bg-900 round-t'
							/>
							<Input
								autocomplete='new-password'
								id='password'
								label='wachtwoord'
								type='password'
								className='pad-m fullwidth bg-900 round-t'
							/>
							<Button
								text='Registreren'
								onclick={() => submitRegister(null, toast)}
							/>
							<input type='submit' className='dispnone' />
						</form>
					</Vierkant>
				</div>
			</CenteredPage>
		</div>
	);
}
