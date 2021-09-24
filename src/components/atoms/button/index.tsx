import React from 'react';
import Link, { LinkProps } from 'next/link';
import styles from './index.module.css';

// Use Button for semantic button or LinkButton for anchor

export enum ButtonVariant {
	Primary = 'primary',
	Secondary = 'secondary',
}

type TButtonShared = React.PropsWithChildren<{
	variant?: ButtonVariant;
}>;

export type TButton = React.ButtonHTMLAttributes<HTMLButtonElement> &
	TButtonShared;
export type TLinkButton = LinkProps & TButtonShared;

export const Button: React.FC<TButton> = ({
	variant = ButtonVariant.Primary,
	children,
	type = 'button',
	...buttonAttributes
}) => {
	return (
		<button
			className={`${styles.btn} ${styles[variant] || ''}`}
			{...buttonAttributes}
			type={type}
		>
			{children}
		</button>
	);
};

export const LinkButton: React.FC<TLinkButton> = ({
	variant = ButtonVariant.Primary,
	children,
	...linkAttributes
}) => {
	return (
		<Link {...linkAttributes}>
			<a className={`${styles.btn} ${styles[variant]}`}>{children}</a>
		</Link>
	);
};
