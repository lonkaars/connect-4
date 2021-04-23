module.exports = {
	async rewrites() {
		return [
			{
				source: '/privacy',
				destination: '/blog/privacy'
			}
		];
	}
}
