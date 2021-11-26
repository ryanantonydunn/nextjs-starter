import { rest } from 'msw';
import { TTest } from '../testMockFetch';

export const mockedTest: TTest = {
	key: 'Great success!',
};

export const handlers = [
	rest.get('/api/test', (req, res, ctx) => {
		return res(ctx.json(mockedTest));
	}),
];
