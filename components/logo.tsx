export default function Logo() {
	return (
		<div className='noclick'>
			<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<rect width='24' height='24' fill='none' />
				<circle className='green' cx='6.5' cy='6.5' r='4.5' fill='var(--confirm)' />
				<circle className='red' cx='6.5' cy='17.5' r='4.5' fill='var(--error)' />
				<circle className='green' cx='17.5' cy='17.5' r='4.5' fill='var(--confirm)' />
				<circle className='circle' cx='17.5' cy='6.5' r='3.5' stroke='var(--foreground)' strokeWidth='2' />
			</svg>
		</div>
	);
}

