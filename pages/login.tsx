import axios from 'axios';
import { FormEvent, useContext } from 'react';

import { NavBar } from '../components/navbar';
import { CenteredPage } from '../components/page';
import { Vierkant, Input, Button } from '../components/ui';
import { ToastContext, toastType } from '../components/toast';

import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

function submitLogin(event?: FormEvent<HTMLFormElement>, toast?: toastType) {
	event?.preventDefault();

	var formData = {
		email: (document.getElementById("email") as HTMLInputElement).value,
		password: (document.getElementById("password") as HTMLInputElement).value
	}

	if ( !formData.email ||
		 !formData.password ) {
		toast({ message: "Vul alsjeblieft alle velden in!",
			  type: "error",
			  icon: <ReportProblemOutlinedIcon/>});
		return;
	}

	axios({
		method: "post",
		url: `${window.location.origin}/api/auth/login`,
		headers: {"content-type": "application/json"},
		data: formData
	})
	.then(() => window.location.pathname = "/")
	.catch(error => {
		if (error.response.status === 401) {
			toast({ message: "Verkeerde gebruikersnaam of wachtwoord!",
				  type: "error",
				  icon: <VpnKeyIcon/>});
			return;
		}
		toast({ message: "Er is iets fout gegaan",
			  type: "error",
			  icon: <ErrorOutlineIcon/>});
	});
}

export default function LoginPage() {
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
						<form onSubmit={(e) => submitLogin(e, toast)}>
							<Input autofocus autocomplete="username" id="email" label="email of gebruikersnaam" style={{ marginBottom: 12 }}></Input>
							<Input autocomplete="current-password" id="password" label="wachtwoord" type="password"></Input>
							<div style={{
								marginTop: 24,
								gridGap: 24,
								display: "grid",
								gridTemplateColumns: "1fr 1fr"
							}}>
								<Button href="/register" text="Registreren" style={{ backgroundColor: "var(--background-alt)"}}></Button>
								<Button text="Inloggen" onclick={() => submitLogin(null, toast)}></Button>
							</div>
							<input type="submit" style={{ display: "none" }}/>
						</form>
					</Vierkant>
				</div>
			</CenteredPage>
		</div>
	);
}

