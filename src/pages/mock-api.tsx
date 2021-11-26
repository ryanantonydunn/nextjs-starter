import React from 'react';

const MockApi: React.FC = () => {
	React.useEffect(() => {
		const { worker } = require('src/api/mocks/browser');
		worker.start({ onUnhandledRequest: 'bypass' });
	}, []);
	return null;
};

export default MockApi;
