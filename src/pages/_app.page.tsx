import 'src/styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

const MockApi = dynamic(() => import('./mock-api'));

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<MockApi />
			<Component {...pageProps} />
		</>
	);
};
export default MyApp;
