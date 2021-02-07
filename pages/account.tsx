import Icon from '@mdi/react';

import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant, IconLabelButton } from '../components/ui';
import { AccountAvatar } from '../components/account';

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { mdiAccountCancelOutline } from '@mdi/js';

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
							height: 27,
							backgroundColor: "#ff00ff",
							position: "absolute",
							left: 0, bottom: 0
						}}></div>
						<IconLabelButton icon={<PersonAddOutlinedIcon/>} text="Vriendschapsverzoek"/>
						<IconLabelButton icon={<Icon size={1} path={mdiAccountCancelOutline}/>} text="Blokkeren"/>
					</div>
				</Vierkant>
				<Vierkant fullwidth>
					<div style={{
						display: "grid",
						gridTemplateColumns: "repeat(5, 1fr)",
						gridGap: 12
					}}>
						<div> <span>gert</span> </div>
						<div> <span>gert</span> </div>
						<div> <span>gert</span> </div>
						<div> <span>gert</span> </div>
						<div> <span>gert</span> </div>
					</div>
				</Vierkant>
			</CenteredPage>
		</div>
	);
}

