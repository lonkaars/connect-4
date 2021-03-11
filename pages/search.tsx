import { FormEvent, useState } from 'react';
import axios from 'axios';

import { NavBar } from '../components/navbar';
import { Vierkant, Button, Input } from '../components/ui';
import { CenteredPage, PageTitle } from '../components/page';
import { AccountAvatar } from '../components/account';
import { userInfo } from '../api/api';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

function search(callback: (results: Array<userInfo>) => void) {
	var query: string = (document.getElementById("searchBar") as HTMLInputElement).value;
	if (query.length < 3) return;

	axios.request<{ "results": Array<userInfo> }>({
		method: "post",
		url: `${window.location.origin}/api/social/search`,
		headers: {"content-type": "application/json"},
		data: { "query": query }
	})
	.then(response => callback(response.data.results))
	.catch(() => {});
}

function SearchResults(props: { userList: Array<userInfo> }) {
	return <div>
	{ props.userList?.map(user => <SearchResult user={user} key={user.id}/>) }
	</div>;
}

function SearchResult(props: { user: userInfo }) {
	return <Vierkant style={{
		padding: 12
	}} fullwidth href={"/user?id=" + props.user.id}>
		<div style={{ position: "relative" }}>
			<AccountAvatar size={48} dummy/>
			<div style={{
				position: "absolute",
				top: 0, right: 0, bottom: 0,
				left: 48 + 12
			}}>
				<b>{props.user.username}</b>
				<p>{props.user.status}</p>
			</div>
		</div>
	</Vierkant>;
}

function SearchBar(props: {
	searchFunction: (event?: FormEvent<HTMLFormElement>) => void;
}) {
	return <Vierkant fullwidth style={{
		padding: 8,
		marginBottom: 24
	}}>
		<form onSubmit={props.searchFunction}>
			<Input id="searchBar" label="Zoeken voor gebruikers..." autocomplete="off" dark autofocus style={{
				backgroundColor: "var(--background)",
				color: "var(--text)",
				padding: 14,
				fontSize: 16,
				width: "calc(100% - 48px - 14px * 2)"
			}}/>
			<Button style={{
				padding: 12,
				float: "right",
				display: "inline-block",
				borderRadius: 4
			}} onclick={props.searchFunction}><SearchOutlinedIcon/></Button>
			<input type="submit" style={{ display: "none" }}/>
		</form>
	</Vierkant>
}

export default function HomePage() {
	var [results, setResults] = useState<Array<userInfo>>([]);
	var getSearchResults = (event?: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		search(results => setResults(results));
	}

	return <div>
		<NavBar/>
		<CenteredPage width={802}>
			<PageTitle>Zoeken</PageTitle>
			<SearchBar searchFunction={getSearchResults}/>
			<SearchResults userList={results}/>
		</CenteredPage>
	</div>
}

