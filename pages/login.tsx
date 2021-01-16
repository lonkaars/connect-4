import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { NavBar } from '../components/navbar';
import { CenteredPage } from '../components/page';
import { Vierkant, Input, Button } from '../components/ui';

var ids = {
	email: uuidv4(),
	password: uuidv4()
}

function submitLogin() {
	var formData = {
		email: (document.getElementById(ids.email) as HTMLInputElement).value,
		password: (document.getElementById(ids.password) as HTMLInputElement).value
	}

	if ( !formData.email ||
		 !formData.password ) {
		alert("Vul alsjeblieft alle velden in!");
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
			alert("Verkeerde gebruikersnaam/wachtwoord combinatie!")
			return;
		}
		alert("Er is iets fout gegaan!");
	});
}

export default function LoginPage() {
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
						<Input id={ids.email} label="email of gebruikersnaam" style={{ marginBottom: 12 }}></Input>
						<Input id={ids.password} label="wachtwoord" type="password"></Input>
						<div style={{
							marginTop: 24,
							gridGap: 24,
							display: "grid",
							gridTemplateColumns: "1fr 1fr"
						}}>
							<Button href="/register" text="Registreren" style={{ backgroundColor: "var(--background-alt)"}}></Button>
							<Button text="Inloggen" onclick={submitLogin}></Button>
						</div>
					</Vierkant>
				</div>
			</CenteredPage>
		</div>
	);
}

