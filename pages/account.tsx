import { ReactNode, Children } from 'react';
import Icon from '@mdi/react';

import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant, IconLabelButton } from '../components/ui';
import { AccountAvatar } from '../components/account';

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import {
	mdiAccountCancelOutline,
	mdiEqual,
	mdiCheckboxBlankCircle,
	mdiClipboardTextOutline,
	mdiGamepadSquareOutline,
	mdiEarth } from '@mdi/js';

function InfoModule(props: {
	label: string;
	icon: ReactNode;
}) {
	return <div style={{
		position: "relative",
		height: "100%"
	}}>
		<div style={{
			position: "absolute",
			left: "50%",
			transform: "translateX(-50%)"
		}}>{props.icon}</div>
		<div style={{
			position: "absolute",
			top: 24 + 6,
			left: 0, right: 0, bottom: 0,
		}}>
			<span style={{
				position: "absolute",
				top: "50%",
				transform: "translateY(-50%)",
				width: "100%",
				textAlign: "center"
			}}>{props.label}</span>
		</div>
	</div>
}

function InfoSection(props: { children: ReactNode }) {
	return <Vierkant fullwidth>
		<div style={{
			display: "grid",
			gridTemplateColumns: `repeat(${Children.count(props.children)}, 1fr)`,
			gridGap: 12,
			height: 64
		}}>
			{props.children}
		</div>
	</Vierkant>
}

export default function AccountPage() {
	return <div>
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
					<IconLabelButton icon={<PersonAddOutlinedIcon/>} text="Vriendschapsverzoek"/>
					<IconLabelButton icon={<Icon size={1} path={mdiAccountCancelOutline}/>} text="Blokkeren"/>
				</div>
			</Vierkant>
			<InfoSection>
				<InfoModule icon={<Icon size={1} path={mdiCheckboxBlankCircle}/>} label="Online"/>
				<InfoModule icon={<AssignmentIndOutlinedIcon/>} label="Lid sinds 14 december 2020"/>
				<InfoModule icon={<PeopleOutlineOutlinedIcon/>} label="2 vrienden"/>
				<InfoModule icon={<Icon size={1} path={mdiEarth}/>} label="Nederland"/>
			</InfoSection>
			<InfoSection>
				<InfoModule icon={<ArrowUpwardOutlinedIcon/>} label="4 keer gewonnen"/>
				<InfoModule icon={<Icon size={1} path={mdiEqual}/>} label="2 keer gelijkspel"/>
				<InfoModule icon={<ArrowDownwardOutlinedIcon/>} label="2 keer verloren"/>
				<InfoModule icon={<Icon size={1} path={mdiClipboardTextOutline}/>} label="Score: 400"/>
				<InfoModule icon={<Icon size={1} path={mdiGamepadSquareOutline}/>} label="6 potjes"/>
			</InfoSection>
		</CenteredPage>
	</div>
}

