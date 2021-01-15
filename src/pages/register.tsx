import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant, Input, Button } from '../components/ui';

export default function RegisterPage() {
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
						<Input label="gebruikersnaam" style={{ marginBottom: 12 }}></Input>
						<Input label="email" style={{ marginBottom: 12 }}></Input>
						<Input label="wachtwoord" type="password"></Input>
						<Button text="Registreren" style={{ marginTop: 24 }}></Button>
					</Vierkant>
				</div>
			</CenteredPage>
		</div>
	);
}

