import React from 'react';
import styles from './index.module.css';

export const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<nav>
				<a href="/">Home</a> | <a href="/test">Test</a>
			</nav>
		</header>
	);
};
