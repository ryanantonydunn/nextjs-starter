import '@testing-library/jest-dom';
import { server } from 'src/api/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
