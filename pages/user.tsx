import { ReactNode, Children, useState, useEffect } from 'react';
import Icon from '@mdi/react';
import axios from 'axios';

import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Vierkant, IconLabelButton } from '../components/ui';
import { AccountAvatar } from '../components/account';
import { userInfo, userGames } from '../api/api';
import RecentGames from '../components/recentGames';

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
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
	var [gotData, setGotData] = useState(false);
	var [user, setUser] = useState<userInfo>();
	var [ownPage, setOwnPage] = useState(false);
	var [gameInfo, setGameInfo] = useState<userGames>();

	var [editingStatus, setEditingStatus] = useState(false);

	useEffect(() => {(async() => {
		if (gotData) return;
		if (typeof window === "undefined") return;

		var id = new URLSearchParams(window.location.search).get("id");
		var loggedIn = document.cookie.includes("token");

		if (id || loggedIn) {
			var self_id = "";
			if (loggedIn) {
				var selfReq = await axios.request<userInfo>({
					method: "get",
					url: `/api/user/info`,
					headers: {"content-type": "application/json"}
				});

				self_id = selfReq?.data.id;
			}

			if (id == self_id || !id) setOwnPage(true);

			var userReq = await axios.request<userInfo>({
				method: "post",
				url: `/api/user/info`,
				headers: {"content-type": "application/json"},
				data: { "id": id || self_id }
			});

			setUser(userReq.data);

			var userGamesReq = await axios.request<userGames>({
				method: "post",
				url: `/api/user/games`,
				headers: {"content-type": "application/json"},
				data: { "id": id || self_id }
			});

			setGameInfo(userGamesReq.data);
		} else {
			window.history.go(-1);
		}

		setGotData(true);
	})()});

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
					<h2 style={{ fontSize: 32 }}>{user?.username}</h2>
					<p id="status" contentEditable={editingStatus ? "true" : "false"} style={{
						marginTop: 6,
						transitionDuration: ".3s"
					}}>{user?.status}</p>
				</div>
				<div style={{
					position: "absolute",
					backgroundColor: "var(--background)",
					height: "40px",
					bottom: 24, left: 24 + 12 + 128, right: 24
				}}>
					{
						ownPage ?
						<div>
							<IconLabelButton icon={<SettingsOutlinedIcon/>} href="/settings" text="Instellingen"/>
							{
								!editingStatus ?
								<IconLabelButton
								icon={<EditOutlinedIcon/>}
								text="Status bewerken"
								onclick={() => setEditingStatus(true)}/> :
								<IconLabelButton
								icon={<DoneOutlinedIcon/>}
								text="Status opslaan"
								onclick={() => {
									setEditingStatus(false)
									axios.request({
										method: "post",
										url: `/api/user/status`,
										headers: {"content-type": "application/json"},
										data: { "status": document.getElementById("status").innerText }
									});
								}}/>
							}
						</div> :
						<div>
							<IconLabelButton icon={<Icon size={1} path={mdiAccountCancelOutline}/>} text="Blokkeren"/>
							<IconLabelButton icon={<PersonAddOutlinedIcon/>} text="Vriendschapsverzoek"/>
						</div>
					}
				</div>
			</Vierkant>
			<InfoSection>
				<InfoModule icon={<Icon size={1} path={mdiCheckboxBlankCircle} color="var(--disk-b-text)"/>} label="Online"/>
				<InfoModule icon={<AssignmentIndOutlinedIcon/>} label={ (() => {
					var memberSince	= "Lid sinds";

					var registered = new Date(user?.registered);
					memberSince += " " + registered.toLocaleString("nl-nl", { month: "long", day: "numeric" });

					var currentYear	= new Date().getFullYear();
					var memberYear	= registered.getFullYear();
					if (currentYear != memberYear) memberSince += " " + memberYear;

					return memberSince;
				})() }/>
				<InfoModule icon={<PeopleOutlineOutlinedIcon/>} label="2 vrienden"/>
				<InfoModule icon={<Icon size={1} path={mdiEarth}/>} label="Nederland"/>
			</InfoSection>
			<InfoSection>
				<InfoModule icon={<ArrowUpwardOutlinedIcon style={{ color: "var(--disk-b-text)" }}/>} label={ gameInfo?.totals.win + " keer gewonnen" }/>
				<InfoModule icon={<Icon size={1} path={mdiEqual}/>} label={ gameInfo?.totals.draw + " keer gelijkspel" }/>
				<InfoModule icon={<ArrowDownwardOutlinedIcon style={{ color: "var(--disk-a-text)" }}/>} label={ gameInfo?.totals.lose + " keer verloren" }/>
				<InfoModule icon={<Icon size={1} path={mdiClipboardTextOutline}/>} label="Score: 400"/>
				<InfoModule icon={<Icon size={1} path={mdiGamepadSquareOutline}/>} label={ gameInfo?.totals.games + " potjes" }/>
			</InfoSection>
			<Vierkant>
				<RecentGames games={gameInfo?.games}/>
			</Vierkant>
		</CenteredPage>
	</div>
}

