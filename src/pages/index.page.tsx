import { NextPage } from 'next';
import HomePage from './home';

// the home page component is imported here from a folder so that it can be
// organised alongside its related files (styles, tests) like the other pages

const IndexPage: NextPage = () => {
	return <HomePage />;
};

export default IndexPage;
