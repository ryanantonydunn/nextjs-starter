import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button, LinkButton } from './index';

describe('atoms/button', () => {
	it('should render', () => {
		const click = jest.fn();
		render(<Button onClick={click}>Button</Button>);
		const btn = screen.getByText('Button');
		expect(btn).toBeInTheDocument();
		btn.click();
		expect(click).toBeCalledTimes(1);
	});

	it('should render link', () => {
		render(<LinkButton href="/test">LinkButton</LinkButton>);
		expect(screen.getByText('LinkButton').closest('a')).toHaveAttribute(
			'href',
			'/test',
		);
	});
});
