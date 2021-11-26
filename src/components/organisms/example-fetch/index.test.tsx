import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ExampleFetch } from '.';
import { mockedTest } from 'src/api/mocks/handlers';

describe('organisms/example-fetch', () => {
	it('should show ', async () => {
		const expectedFetchValue = mockedTest.key;

		// render the app and act
		render(<ExampleFetch />);
		screen.getByTestId('fetchButton').click();

		// assert expected value
		await waitFor(() => {
			const valueNode = screen.getByTestId('fetchResponse');
			expect(valueNode).toHaveTextContent(expectedFetchValue);
		});
	});
});
