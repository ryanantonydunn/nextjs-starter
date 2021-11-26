import '../src/styles/globals.css';

// initialise mocked API
// check for global process because this also runs during the build process
if (typeof global.process === 'undefined') {
	const { worker } = require('../src/api/mocks/browser');
	worker.start({ onUnhandledRequest: 'bypass' });
}

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
