import { NextPage } from 'next';
import React from 'react';
import { Meta } from 'src/components/atoms/meta';
import { Header } from 'src/components/layout/header';
import { ExampleCounter } from 'src/components/organisms/example-counter';
import { ExampleFetch } from 'src/components/organisms/example-fetch';
import styles from './index.module.css';

const TestPage: NextPage = () => {
	return (
		<>
			<Meta title="Next starter test" description="The test page" />
			<Header />
			<div className={styles.test}>
				<h1>Test page</h1>
				<ExampleCounter />
				<br />
				<ExampleFetch />
			</div>
		</>
	);
};

export default TestPage;
