import React from 'react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '@/app/(pages)/home/page'

let mockSessionValue: any = null

vi.mock('@/app/api/auth/[...nextauth]/route', () => ({
    auth: vi.fn(async () => mockSessionValue),
}))

vi.mock('@/components/UnauthorizedPageView/UnauthorizedPageView', () => ({
    default: () => <div data-testid="unauthorized-page">Unauthorized</div>,
}))

vi.mock('@/components/HomePageView/HomePageView', () => ({
    default: ({ userList, currentPage, totalPages }: any) => (
        <div data-testid="home-page-view" data-users={JSON.stringify(userList)} data-page={currentPage} data-total={totalPages}>
            HomePageView Mock
        </div>
    ),
}))

describe('Home Page (Server Component)', () => {
    const originalEnv = process.env.REQRES_API_KEY

    beforeEach(() => {
        vi.clearAllMocks()
        process.env.REQRES_API_KEY = 'test-api-key'
    })

    afterEach(() => {
        process.env.REQRES_API_KEY = originalEnv
        vi.unstubAllGlobals()
    })

    it('should render UnauthorizedPageView when session user is missing', async () => {
        mockSessionValue = null

        const ui = await Home({ searchParams: Promise.resolve({}) })
        render(ui)

        const unauthorizedPage = await screen.findByTestId('unauthorized-page')
        expect(unauthorizedPage).toBeDefined()
    })

    it('should throw an error if REQRES_API_KEY is missing', async () => {
        mockSessionValue = { user: { name: 'Test User' } }
        delete process.env.REQRES_API_KEY

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

        await expect(
            Home({ searchParams: Promise.resolve({}) })
        ).rejects.toThrow('Server configuration error: REQRES_API_KEY is missing.')

        consoleSpy.mockRestore()
    })

    it('should fetch data, filter users, and render HomePageView on successful auth', async () => {
        mockSessionValue = { user: { name: 'Test User' } }

        const mockApiResponse = {
            page: 1,
            total_pages: 2,
            data: [
                { id: 1, first_name: 'George', last_name: 'Bluth', email: 'george@reqres.in' },
                { id: 2, first_name: 'Janet', last_name: 'Weaver', email: 'janet@reqres.in' },
                { id: 3, first_name: 'Tobias', last_name: 'Funke', email: 'tobias@reqres.in' }
            ]
        }

        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockApiResponse,
        })
        vi.stubGlobal('fetch', fetchMock)

        const ui = await Home({ searchParams: Promise.resolve({ page: '1' }) })
        render(ui)

        const homePageView = await screen.findByTestId('home-page-view')

        expect(fetchMock).toHaveBeenCalledWith(
            'https://reqres.in/api/users?page=1',
            expect.objectContaining({
                headers: { 'x-api-key': 'test-api-key', 'Content-Type': 'application/json' },
            })
        )

        expect(homePageView).toBeDefined()
        expect(homePageView.getAttribute('data-page')).toBe('1')
        expect(homePageView.getAttribute('data-total')).toBe('2')
    })
})