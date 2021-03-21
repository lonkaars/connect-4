import axios from 'axios';
import { validate as validateEmail } from 'email-validator';
import { FormEvent, useContext } from 'react';

import { NavBar } from '../components/navbar';
import { CenteredPage } from '../components/page';
import { Vierkant, Input, Button } from '../components/ui';
import { ToastContext, toastType } from '../components/toast';

import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

function submitRegister(event?: FormEvent<HTMLFormElement>, toast?: toastType) {
	event?.preventDefault();

	var formData = {
		username: (document.getElementById("username") as HTMLInputElement).value,
		email: (document.getElementById("email") as HTMLInputElement).value,
		password: (document.getElementById("password") as HTMLInputElement).value
	}

	if ( !formData.username ||
	   	 !formData.email ||
		 !formData.password ) {
		toast("Vul alsjeblieft alle velden in!", "error", <ReportProblemOutlinedIcon style={{ fontSize: 32 }}/>);
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

	if ( formData.username.length < 3 || formData.username.length > 35 ) {
		toast("Je gebruikersnaam moet tussen de 3 en 35 letters zijn!", "error", <ReportProblemOutlinedIcon style={{ fontSize: 32 }}/>);
		return;
	}

	if ( !validateEmail(formData.email) ) {
		toast("Vul alsjeblieft een geldig email-adres in!", "error", <ReportProblemOutlinedIcon style={{ fontSize: 32 }}/>);
		return;
	}

	//TODO: wachtwoord max 72 tekens ivm bcrypt
	if ( !formData.password.match(passwordRegex) ) {
		toast("Je wachtwoord moet een hoofdletter, kleine letter en een getal bevatten!", "error", <ReportProblemOutlinedIcon style={{ fontSize: 32 }}/>);
		return;
	}
	
	axios({
		method: "post",
		url: `${window.location.origin}/api/auth/signup`,
		headers: {"content-type": "application/json"},
		data: formData
	})
	.then(() => {
		//TODO: email verificatie
		// redirect naar home, automatische login
		window.location.pathname = "/";
	})
	.catch(error => {
		toast("Er is iets fout gegaan", "error", <ErrorOutlineIcon style={{ fontSize: 32 }}/>);
		console.log(error);
	});
}

export default function RegisterPage() {
	var { toast } = useContext(ToastContext);

	return (
		<div>
			<NavBar/>
			<CenteredPage width={500} style={{ height: "100vh" }}>
				<div style={{
					position: "relative",
					top: "50%",
					transform: "translateY(-50%)",
					margin: "0 auto",
					textAlign: "center"
				}}>
					<Vierkant>
						<form onSubmit={(e) => submitRegister(e, toast)}>
							<Input autofocus autocomplete="username" id="username" label="gebruikersnaam" style={{ marginBottom: 12 }}></Input>
							<Input autocomplete="email" id="email" label="email" style={{ marginBottom: 12 }}></Input>
							<Input autocomplete="new-password" id="password" label="wachtwoord" type="password"></Input>
							<Button text="Registreren" style={{ marginTop: 24 }} onclick={() => submitRegister(null, toast)}></Button>
							<input type="submit" style={{ display: "none" }}/>
						</form>
					</Vierkant>
				</div>
			</CenteredPage>
		</div>
	);
}

