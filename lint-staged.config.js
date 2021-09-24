module.exports = {
	'*.{js,jsx,ts,tsx,json,md}': 'prettier --write',
	'*.{js,jsx,ts,tsx}': 'eslint --fix',
	'*.{css}': 'stylelint --fix',
	'*.{ts,tsx}': () => 'tsc -p tsconfig.json --noEmit',
};
