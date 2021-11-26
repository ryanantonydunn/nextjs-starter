import React from 'react';
import { NextPage } from 'next';
import { Meta } from 'src/components/atoms/meta';
import { ExampleCounter } from 'src/components/organisms/example-counter';
import { Header } from 'src/components/layout/header';
import styles from './index.module.css';
import { Button } from 'src/components/atoms/button';
import { fetchTest } from 'src/api/test';

const TestPage: NextPage = () => {
	return (
		<>
			<Meta title="Next starter test" description="The test page" />
			<Header />
			<div className={styles.test}>
				<h1>Test page</h1>
				<ExampleCounter />
				<br />
				<Button onClick={fetchTest}>Run Fetch Test</Button>
			</div>
		</>
	);
};

export default TestPage;
