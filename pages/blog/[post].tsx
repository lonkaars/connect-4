import micromark from 'micromark';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path'

import { NavBar } from '../../components/navbar';
import { CenteredPage, PageTitle } from '../../components/page';
import { Vierkant } from '../../components/ui';

export default function Post(props: {
	post: string,
	content: string,
	tags: string
}) {
	return <div>
		<NavBar/>
		<CenteredPage width={802}>
			<PageTitle>{props.post.replace(/_/g, " ")}</PageTitle>
			<Vierkant fullwidth>
				<div dangerouslySetInnerHTML={{__html: props.content}}>
				</div>
			</Vierkant>
		</CenteredPage>
	</div>
}

function parseTags(fileContent: string) {
	var fileAsArr = fileContent.split("\n");
	var lastLine = fileAsArr[fileAsArr.length-1]
	if (!lastLine.startsWith(";tags:")) return {
		tags: [],
		result: ""
	}

	var tags = lastLine.replace(";tags:", "").trim().split(" ");

	fileAsArr.pop()
	var result = fileAsArr.join("\n").trim()

	return { tags, result }
}

export function getStaticProps(props: {params: { post: string }}) {
	var filename = join("news/", props.params.post + ".md")
	var filecontent = readFileSync(filename).toString().trim()

	var parsed = parseTags(filecontent);
	var content = micromark(parsed.result)

	return {
		props: {
			post: props.params.post,
			content,
			tags: parsed.tags,
		},
	}
}

export function getStaticPaths() {
	var files = readdirSync("news").filter(f => f.endsWith(".md"));

	return {
		paths: files.map((f) => {
			return {
				params: {
					post: f.substr(0, f.length - 3)
				}
			}
		}),
		fallback: false,
	}
}

