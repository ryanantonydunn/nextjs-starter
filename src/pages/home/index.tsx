import type { NextPage } from 'next';
import { Meta } from 'src/components/atoms/meta';
import { Header } from 'src/components/layout/header';
import styles from './index.module.css';

const HomePage: NextPage = () => {
	return (
		<>
			<Meta title="Next starter home" description="The home page" />
			<Header />
			<div className={styles.home}>
				<h1>Home page</h1>
			</div>
		</>
	);
};

export default HomePage;
