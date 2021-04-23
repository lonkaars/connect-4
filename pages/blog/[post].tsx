import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import gfm from 'remark-gfm';

import { Footer } from '../../components/footer';
import { NavBar } from '../../components/navbar';
import { CenteredPage, PageTitle } from '../../components/page';
import { Vierkant } from '../../components/ui';

export interface ArticleMeta {
	title?: string;
	id?: string;
}

export function RenderedArticle(props: {
	content: string;
	meta: ArticleMeta;
	standalone?: boolean;
}) {
	return <Vierkant className='pad-l bg-800 w100m2m postContent'>
		<ReactMarkdown
			rehypePlugins={[rehypeRaw]}
			remarkPlugins={[gfm]}
			children={(props.standalone ? '' : '## ' + props.meta.title + '\n\n') + props.content}
		/>
	</Vierkant>;
}

export default function Post(props: {
	content: string;
	meta: ArticleMeta;
}) {
	return <div>
		<NavBar />
		<CenteredPage width={802} className='blogPost'>
			<PageTitle>{props.meta.title}</PageTitle>
			<RenderedArticle content={props.content} meta={props.meta} standalone />
		</CenteredPage>
		<Footer />
	</div>;
}

var parseTag = {
	'title': (val: string) => val,
};

function parseMeta(file: Array<string>): ArticleMeta {
	var meta: ArticleMeta = {};

	file.forEach(line => {
		if (!line.startsWith('[meta]: ')) return;
		var tags = line.match(/\[meta\]:\s+\<(.+?)\>\s+\((.+?)\)/);
		if (!tags || !tags[1] || !tags[2]) return;
		if (!parseTag.hasOwnProperty(tags[1])) return;
		meta[tags[1]] = parseTag[tags[1]](tags[2]);
	});

	return meta;
}

function preprocessor(fileContent: string) {
	var fileAsArr = fileContent.split('\n');
	var meta = parseMeta(fileAsArr);
	var result = fileAsArr.join('\n').trim();
	return { meta, result };
}

export function getStaticProps(props: { params: { post: string; }; }) {
	var filename = join('news/', props.params.post + '.md');
	var filecontent = readFileSync(filename).toString().trim();

	var parsed = preprocessor(filecontent);
	parsed.meta.id = props.params.post;

	return {
		props: {
			content: parsed.result,
			meta: parsed.meta,
		},
	};
}

export function getStaticPaths() {
	var files = readdirSync('news').filter(f => f.endsWith('.md'));

	return {
		paths: files.map((f) => {
			return {
				params: {
					post: f.substr(0, f.length - 3),
				},
			};
		}),
		fallback: false,
	};
}
