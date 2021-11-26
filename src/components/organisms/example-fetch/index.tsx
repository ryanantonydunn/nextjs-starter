import React from 'react';
import { fetchTest, TTest } from 'src/api/testMockFetch';
import { Button } from 'src/components/atoms/button';
import styles from './index.module.css';

export const ExampleFetch: React.FC = () => {
	const [responseValue, setResponseValue] = React.useState<
		TTest | undefined
	>();

	const goGetIt = async (): Promise<void> => {
		const data = await fetchTest();
		setResponseValue(data);
	};

	return (
		<div className={styles.fetcher}>
			<Button data-testid="fetchButton" onClick={goGetIt}>
				Test Fetch
			</Button>
			<div>
				Response:{' '}
				<span className={styles.value} data-testid="fetchResponse">
					{responseValue?.key || ''}
				</span>
			</div>
		</div>
	);
};
