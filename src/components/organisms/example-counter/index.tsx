import React from 'react';
import { Button } from 'src/components/atoms/button';
import styles from './index.module.css';

export const ExampleCounter: React.FC = () => {
	const [count, setCount] = React.useState(0);
	return (
		<div className={styles.counter}>
			<Button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				Increment
			</Button>
			<div>
				Current count: <span className={styles.value}>{count}</span>
			</div>
		</div>
	);
};
