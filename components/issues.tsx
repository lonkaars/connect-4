import axios from 'axios';
import { CSSProperties, useEffect, useState } from 'react';

function IssueTag(props: { data: any; }) {
	return <div
		className='tag dispinbl'
		style={{
			'--color': '#' + props.data.color,
		} as CSSProperties}
	>
		<span className='label'>{props.data.name}</span>
	</div>;
}

function Issue(props: { data: any; }) {
	return <a href={props.data.html_url} className='github-issue dispbl round-t pad-m bg-700'>
		<h3 className='title dispinbl'>
			<span className='number subtile'>#{props.data.number}</span>
			{props.data.title}
		</h3>
		<div className='tags'>
			{props.data.labels.map((label: any) => <IssueTag data={label} />)}
		</div>
	</a>;
}

export function IssueList() {
	var [githubIssues, setGithubIssues] = useState<any[]>();

	useEffect(() => {
		(async () => {
			var githubIssuesRequest = await axios.request({
				url: 'https://api.github.com/repos/lonkaars/connect-4/issues?state=open',
			});
			setGithubIssues(githubIssuesRequest.data.filter((issue: any) => issue.milestone?.id == 6663987));
		})();
	}, []);

	return <div className='github-issue-list'>
		{githubIssues?.map(issue => <Issue data={issue} />)}
	</div>;
}
