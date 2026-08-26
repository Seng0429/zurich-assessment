import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchAllUsers } from '../userServices';

describe('fetchAllUsers Service', () => {
    const mockApiKey = 'test-api-key';

    beforeEach(() => {
        vi.stubEnv('REQRES_API_KEY', mockApiKey);
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.restoreAllMocks();
    });

    it('should throw an error if REQRES_API_KEY is missing', async () => {
        vi.stubEnv('REQRES_API_KEY', '');

        await expect(fetchAllUsers()).rejects.toThrow(
            'Server configuration error: REQRES_API_KEY is missing.'
        );
    });

    it('should fetch and combine users from both pages successfully', async () => {
        const page1Users = [{ id: 1, first_name: 'John', last_name: 'Doe' }];
        const page2Users = [{ id: 2, first_name: 'Jane', last_name: 'Smith' }];

        const fetchMock = vi.fn().mockImplementation((url: string) => {
            if (url.includes('page=1')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ data: page1Users }),
                });
            }
            if (url.includes('page=2')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ data: page2Users }),
                });
            }
            return Promise.reject(new Error('Unknown URL'));
        });

        vi.stubGlobal('fetch', fetchMock);

        const users = await fetchAllUsers();

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(users).toEqual([...page1Users, ...page2Users]);
    });

    it('should throw an error if one of the fetch requests fails', async () => {
        const fetchMock = vi.fn().mockImplementation((url: string) => {
            if (url.includes('page=1')) {
                return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: [] }) });
            }

            return Promise.resolve({ ok: false });
        });

        vi.stubGlobal('fetch', fetchMock);

        await expect(fetchAllUsers()).rejects.toThrow(
            'Failed to fetch user data from external API'
        );
    });
});