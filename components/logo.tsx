export function LogoDark() {
	return (
		<div className='noclick'>
			<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<rect width='24' height='24' fill='var(--background)' />
				<circle cx='6.5' cy='6.5' r='4.5' fill='var(--disk-b)' />
				<circle cx='6.5' cy='17.5' r='4.5' fill='var(--disk-a)' />
				<circle cx='17.5' cy='17.5' r='4.5' fill='var(--disk-b)' />
				<circle cx='17.5' cy='6.5' r='3.5' stroke='var(--text)' strokeWidth='2' />
			</svg>
		</div>
	);
}

export function LogoLight() {
	return (
		<div className='noclick'>
			<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<rect width='24' height='24' fill='var(--page-background)' />
				<circle cx='6.5' cy='6.5' r='4.5' fill='var(--disk-b)' />
				<circle cx='6.5' cy='17.5' r='4.5' fill='var(--disk-a)' />
				<circle cx='17.5' cy='17.5' r='4.5' fill='var(--disk-b)' />
				<circle cx='17.5' cy='6.5' r='3.5' stroke='var(--background)' strokeWidth='2' />
			</svg>
		</div>
	);
}
