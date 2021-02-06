import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant } from '../components/ui';
import { AccountAvatar } from '../components/account';

export default function AccountPage() {
	return (
		<div>
			<NavBar/>
			<CenteredPage width={802}>
				<PageTitle>Profiel</PageTitle>
				<Vierkant fullwidth>
					<AccountAvatar size={128} dummy/>
					<div style={{
						display: "inline-block",
						verticalAlign: "top",
						marginLeft: 12,
						width: "calc(100% - 128px - 12px)"
					}}>
						<h2 style={{ fontSize: 32 }}>Gebruikersnaam</h2>
						<p style={{ marginTop: 6 }}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						</p>
					</div>
					<div style={{
						position: "absolute",
						backgroundColor: "var(--background)",
						height: "40px",
						bottom: 24, left: 24 + 12 + 128, right: 24
					}}>
						<div style={{
							width: 40,
							height: 30,
							backgroundColor: "#ff00ff",
							verticalAlign: "bottom"
						}}></div>
					</div>
				</Vierkant>
			</CenteredPage>
		</div>
	);
}

