import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

type TMeta = {
	title: string;
	description?: string;
};

export const Meta: NextPage<TMeta> = ({ title, description }) => {
	return (
		<Head>
			<title>{title}</title>
			{description && <meta name="description" content={description} />}
		</Head>
	);
};
