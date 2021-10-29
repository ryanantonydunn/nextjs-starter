import React from 'react';
import { Button } from 'src/components/atoms/button';
import styles from './index.module.css';

export const ExampleCounter: React.FC = () => {
	const [count, setCount] = React.useState(0);
	return (
		<div>
			<div className={styles.count}>
				Current count: <span>{count}</span>
			</div>
			<Button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				Increment
			</Button>
		</div>
	);
};
