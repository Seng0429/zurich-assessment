import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchUserEmail } from '../userActions';
import { auth } from '@/app/api/auth/[...nextauth]/route';

vi.mock('@/app/api/auth/[...nextauth]/route', () => ({
    auth: vi.fn(),
}));

describe('fetchUserEmail Server Action', () => {
    const mockApiKey = 'test-api-key';

    beforeEach(() => {
        vi.stubEnv('REQRES_API_KEY', mockApiKey);
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.restoreAllMocks();
    });

    it('should throw an error if the user is not authenticated', async () => {
        vi.mocked(auth as any).mockResolvedValue(null);

        await expect(fetchUserEmail(1)).rejects.toThrow('Unauthorized');
    });

    it('should throw an error if REQRES_API_KEY is missing', async () => {
        vi.mocked(auth).mockResolvedValue({ user: { name: 'Test' } } as any);
        vi.stubEnv('REQRES_API_KEY', '');

        await expect(fetchUserEmail(1)).rejects.toThrow(
            'Server configuration error: REQRES_API_KEY is missing.'
        );
    });

    it('should fetch and return the user email successfully', async () => {
        vi.mocked(auth).mockResolvedValue({ user: { name: 'Test' } } as any);

        const mockEmail = 'john.doe@reqres.in';
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ data: { email: mockEmail } }),
        });

        vi.stubGlobal('fetch', fetchMock);

        const email = await fetchUserEmail(1);

        expect(fetchMock).toHaveBeenCalledWith(
            'https://reqres.in/api/users/1',
            expect.any(Object)
        );
        expect(email).toBe(mockEmail);
    });

    it('should throw an error if the fetch request fails', async () => {
        vi.mocked(auth).mockResolvedValue({ user: { name: 'Test' } } as any);

        const fetchMock = vi.fn().mockResolvedValue({ ok: false });
        vi.stubGlobal('fetch', fetchMock);

        await expect(fetchUserEmail(1)).rejects.toThrow(
            'Failed to fetch individual user details.'
        );
    });
});