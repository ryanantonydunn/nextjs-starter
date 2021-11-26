// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
	rest.get('/api/test', (req, res, ctx) => {
		return res(
			ctx.json({
				response: 'howdy',
			}),
		);
	}),
];
