import { Component } from 'react';

import { NavBar } from '../components/navbar';
import { Vierkant, Button, Input } from '../components/ui';
import { CenteredPage, PageTitle } from '../components/page';

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

function SearchBar() {
	return <Vierkant style={{ padding: 8 }} fullwidth>
		<Input label="Zoeken voor gebruikers..." dark style={{
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
		}}><SearchOutlinedIcon/></Button>
	</Vierkant>
}

export default class HomePage extends Component {
	render () {
		return <div>
			<NavBar/>
			<CenteredPage width={802}>
				<PageTitle>Zoeken</PageTitle>
				<SearchBar/>
			</CenteredPage>
		</div>
	}
}

