export default function Logo() {
	return (
		<div className='noclick logo posrel'>
			<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<rect width='24' height='24' fill='none' />
				<circle className='green' cx='6.5' cy='6.5' r='4.5' fill='var(--confirm)' />
				<circle className='red' cx='6.5' cy='17.5' r='4.5' fill='var(--error)' />
				<circle className='green' cx='17.5' cy='17.5' r='4.5' fill='var(--confirm)' />
				<circle className='circle' cx='17.5' cy='6.5' r='3.5' stroke='var(--foreground)' strokeWidth='2' />
			</svg>

			<svg
				className='betaBadge posabs abscenterh'
				width='34'
				height='14'
				viewBox='0 0 34 14'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					className='background'
					d='M0 2C0 0.89543 0.895431 0 2 0H32C33.1046 0 34 0.895431 34 2V12C34 13.1046 33.1046 14 32 14H2C0.895431 14 0 13.1046 0 12V2Z'
				/>
				<path
					className='foreground'
					d='M8 5.5V4C8 3.46957 7.78929 2.96086 7.41421 2.58579C7.03914 2.21071 6.53043 2 6 2H2V12H6C6.53043 12 7.03914 11.7893 7.41421 11.4142C7.78929 11.0391 8 10.5304 8 10V8.5C8 7.7 7.3 7 6.5 7C7.3 7 8 6.3 8 5.5ZM6 10H4V8H6V10ZM6 6H4V4H6V6Z'
				/>
				<path className='foreground' d='M10 2V12H16V10H12V8H16V6H12V4H16V2H10Z' />
				<path className='foreground' d='M18 2V4H20V12H22V4H24V2H18Z' />
				<path
					className='foreground'
					d='M28 2C27.4696 2 26.9609 2.21071 26.5858 2.58579C26.2107 2.96086 26 3.46957 26 4V12H28V8H30V12H32V4C32 3.46957 31.7893 2.96086 31.4142 2.58579C31.0391 2.21071 30.5304 2 30 2H28ZM28 4H30V6H28V4Z'
				/>
			</svg>
		</div>
	);
}
