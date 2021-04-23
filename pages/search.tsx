import axios from 'axios';
import { FormEvent, useState } from 'react';

import { userInfo } from '../api/api';
import { AccountAvatar } from '../components/account';
import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { Button, Input, Vierkant } from '../components/ui';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

function search(callback: (results: Array<userInfo>) => void) {
	var query: string = (document.getElementById('bigSearchBar') as HTMLInputElement).value;
	if (query.length < 3) return;

	axios.request<{ 'results': Array<userInfo>; }>({
		method: 'post',
		url: `${window.location.origin}/api/social/search`,
		headers: { 'content-type': 'application/json' },
		data: { 'query': query },
	})
		.then(response => callback(response.data.results))
		.catch(() => {});
}

function SearchResults(props: { userList: Array<userInfo>; }) {
	return <div className='results w100m2m'>
		{props.userList?.map(user => <SearchResult user={user} key={user.id} />)}
	</div>;
}

function SearchResult(props: { user: userInfo; }) {
	return <Vierkant
		className='result bg-800 pad-m fullwidth'
		href={'/user?id=' + props.user.id}
	>
		<div className='inner posrel'>
			<AccountAvatar size={48} id={props.user.id} />
			<div className='userInfo posabs v0 r0'>
				<b className='username'>{props.user.username}</b>
				<p className='status'>{props.user.status}</p>
			</div>
		</div>
	</Vierkant>;
}

function BigSearchBar(props: {
	searchFunction: (event?: FormEvent<HTMLFormElement>) => void;
}) {
	return <Vierkant className='pad-m bg-800 w100m2m bigSearchBar posrel'>
		<form onSubmit={props.searchFunction}>
			<Input
				id='bigSearchBar'
				label='Zoeken voor gebruikers...'
				autocomplete='off'
				autofocus
				className='pad-m posabs abscenterv'
			/>
			<Button
				className='pad-m dispinbl valigntop floatr'
				onclick={props.searchFunction}
			>
				<SearchOutlinedIcon />
			</Button>
			<input type='submit' className='dispnone' />
		</form>
	</Vierkant>;
}

export default function SearchPage() {
	var [searched, setSearched] = useState(false);
	var [results, setResults] = useState<Array<userInfo>>([]);
	var getSearchResults = (event?: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		search(results => setResults(results));
		setSearched(true);
	};

	return <div>
		<NavBar />
		<CenteredPage width={802}>
			<PageTitle>Zoeken</PageTitle>
			<BigSearchBar searchFunction={getSearchResults} />
			<SearchResults userList={results} />
			{searched && results.length == 0 && <h1
				className='noresults center subtile'
			>
				Geen zoekresultaten gevonden
			</h1>}
		</CenteredPage>
	</div>;
}
