import { NavBar } from '../components/navbar';
import { CenteredPage, PageTitle } from '../components/page';
import { IconLabelButton, Vierkant } from '../components/ui';

import { mdiDiscord } from '@mdi/js';
import Icon from '@mdi/react';

export default function MaintenancePage() {
	return <div>
		<NavBar nolinks />
		<CenteredPage width={802}>
			<PageTitle>Onderhoud</PageTitle>
			<Vierkant className='w100m2m pad-l bg-800 center messagePage'>
				<svg
					className='harry'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M16.0247 2.9763L15.3785 2.38396C13.4669 0.631617 10.5328 0.631618 8.62122 2.38396L7.97503 2.9763C7.82993 3.10932 7.64879 3.19655 7.45432 3.22706L6.58832 3.36295C4.02641 3.76494 2.19705 6.05889 2.37521 8.64602L2.43543 9.52055C2.44896 9.71693 2.40422 9.91294 2.30683 10.084L1.87313 10.8458C0.590097 13.0994 1.24299 15.9599 3.37677 17.4337L4.09805 17.9318C4.26002 18.0437 4.38537 18.2009 4.45839 18.3837L4.78358 19.1978C5.74557 21.606 8.38908 22.879 10.8717 22.1296L11.7109 21.8763C11.8993 21.8194 12.1004 21.8194 12.2888 21.8763L13.128 22.1296C15.6107 22.879 18.2542 21.606 19.2162 19.1978L19.5413 18.3837C19.6144 18.2009 19.7397 18.0437 19.9017 17.9318L20.623 17.4337C22.7567 15.9599 23.4096 13.0994 22.1266 10.8458L21.6929 10.084C21.5955 9.91294 21.5508 9.71693 21.5643 9.52055L21.6245 8.64602C21.8027 6.05889 19.9733 3.76494 17.4114 3.36295L16.5454 3.22706C16.3509 3.19655 16.1698 3.10932 16.0247 2.9763ZM13.0004 7C13.0004 6.44772 12.5527 6 12.0004 6C11.4481 6 11.0004 6.44772 11.0004 7C11.0004 7.6399 11.1547 8.3754 11.3642 9.00373C11.5625 9.59854 11.8716 10.2855 12.2933 10.7071C12.6838 11.0976 13.317 11.0976 13.7075 10.7071C14.098 10.3166 14.098 9.68342 13.7075 9.29289C13.6291 9.21452 13.4383 8.90146 13.2616 8.37127C13.096 7.8746 13.0004 7.3601 13.0004 7ZM9.00037 8C9.00037 7.44772 8.55266 7 8.00037 7C7.44809 7 7.00037 7.44772 7.00037 8C7.00037 9.71426 7.57253 10.9864 8.29326 11.7071C8.68379 12.0976 9.31695 12.0976 9.70748 11.7071C10.098 11.3166 10.098 10.6834 9.70748 10.2929C9.42821 10.0136 9.00037 9.28574 9.00037 8ZM6.44567 15.8321C7.46169 16.5094 8.49948 16.5859 9.46978 16.3758C10.3813 16.1784 11.2664 15.7188 12.0242 15.3247C13.6961 14.4553 14.8671 13.888 16.1065 14.4191C16.6141 14.6367 17.202 14.4015 17.4195 13.8939C17.6371 13.3863 17.4019 12.7984 16.8943 12.5809C14.7298 11.6532 12.7317 12.698 11.2902 13.4518C11.2262 13.4853 11.1633 13.5182 11.1015 13.5503C10.2969 13.9687 9.65066 14.2903 9.04659 14.4211C8.50127 14.5391 8.03905 14.4906 7.55507 14.1679C7.09554 13.8616 6.47467 13.9858 6.16832 14.4453C5.86197 14.9048 5.98614 15.5257 6.44567 15.8321Z'
						fill='var(--foreground)'
					/>
				</svg>
				<p>
					Er worden momenteel cruciale onderdelen van de website aangepast waardoor de website niet te
					bezoeken is. Voor updates of details over dit probleem kun je in{" "}
					<span className='nosel outcome win'>#important</span> kijken op onze Discord server.
				</p>
				<IconLabelButton
					href='https://discord.gg/FnapWQ9P7T'
					text='Discord server'
					icon={<Icon path={mdiDiscord} size={1} />}
				/>
			</Vierkant>
		</CenteredPage>
	</div>;
}
