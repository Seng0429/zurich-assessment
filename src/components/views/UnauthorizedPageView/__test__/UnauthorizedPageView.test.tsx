import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import UnauthorizedPageView from '@/components/views/UnauthorizedPageView/UnauthorizedPageView'
import { routesName } from '@/constants/routesName'

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}))

describe('UnauthorizedPageView Component', () => {
    const mockPush = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(useRouter).mockReturnValue({
            push: mockPush,
            back: vi.fn(),
            forward: vi.fn(),
            refresh: vi.fn(),
            replace: vi.fn(),
            prefetch: vi.fn(),
            bfcacheId: 0,
        } as unknown as AppRouterInstance)
    })

    it('should render unauthorized messages and action button', () => {
        render(<UnauthorizedPageView />)

        expect(screen.getByRole('heading', { name: 'Unauthorized Access' })).toBeDefined()
        expect(screen.getByText('Session expired or you are not logged in.')).toBeDefined()
        expect(screen.getByText('Please log in to access the contents.')).toBeDefined()
        expect(screen.getByRole('button', { name: 'Go to Login' })).toBeDefined()
    })

    it('should navigate to login route when button is clicked', async () => {
        const user = userEvent.setup()

        render(<UnauthorizedPageView />)

        const loginButton = screen.getByRole('button', { name: 'Go to Login' })
        await user.click(loginButton)

        expect(mockPush).toHaveBeenCalledTimes(1)
        expect(mockPush).toHaveBeenCalledWith(routesName.login)
    })
})