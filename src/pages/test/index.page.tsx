import React from 'react';
import { NextPage } from 'next';
import { Meta } from 'src/components/atoms/meta';
import { ExampleCounter } from 'src/components/organisms/example-counter';
import { Header } from 'src/components/layout/header';
import styles from './index.module.css';

const TestPage: NextPage = () => {
	return (
		<>
			<Meta title="Next starter test" description="The test page" />
			<Header />
			<div className={styles.test}>
				<h1>Test page</h1>
				<ExampleCounter />
			</div>
		</>
	);
};

export default TestPage;
