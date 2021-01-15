import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant, Input, Button } from '../components/ui';

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
						<Input label="email of gebruikersnaam" style={{ marginBottom: 12 }}></Input>
						<Input label="wachtwoord" type="password"></Input>
						<div style={{
							marginTop: 24,
							gridGap: 24,
							display: "grid",
							gridTemplateColumns: "1fr 1fr"
						}}>
						<Button text="Registreren" style={{ backgroundColor: "var(--background-alt)" }} onclick={() => window.location.pathname = "/register"}></Button>
							<Button text="Inloggen"></Button>
						</div>
					</Vierkant>
				</div>
			</CenteredPage>
		</div>
	);
}

