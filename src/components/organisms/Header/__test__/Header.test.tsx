import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useSession, signOut } from 'next-auth/react'
import Header from '@/components/organisms/Header/Header'
import { routesName } from '@/constants/routesName'

vi.mock('next-auth/react', () => ({
    useSession: vi.fn(),
    signOut: vi.fn(),
}))

vi.mock('@/components/molecules/DropDown/DropDown', () => ({
    default: ({ trigger, items }: { trigger: React.ReactNode; items: Array<{ label: string; onClick: () => void; danger?: boolean }> }) => (
        <div data-testid="dropdown-wrapper">
            <div data-testid="dropdown-trigger">{trigger}</div>
            <div data-testid="dropdown-menu">
                {items.map((item, index) => (
                    <button key={index} onClick={item.onClick}>
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    ),
}))

describe('Header Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render default username when session data is missing', () => {
        vi.mocked(useSession).mockReturnValue({
            data: null,
            status: 'unauthenticated',
            update: vi.fn(),
        })

        render(<Header />)

        expect(screen.getByText('User')).toBeDefined()
        expect(screen.getByTestId('dropdown-wrapper')).toBeDefined()
    })

    it('should render username from session data', () => {
        vi.mocked(useSession).mockReturnValue({
            data: {
                user: { name: 'John Doe', email: 'john@example.com' },
                expires: '1',
            },
            status: 'authenticated',
            update: vi.fn(),
        })

        render(<Header />)

        expect(screen.getByText('John Doe')).toBeDefined()
    })

    it('should call signOut with correct callback URL when sign out item is clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(useSession).mockReturnValue({
            data: {
                user: { name: 'John Doe', email: 'john@example.com' },
                expires: '1',
            },
            status: 'authenticated',
            update: vi.fn(),
        })

        render(<Header />)

        const signOutButton = screen.getByRole('button', { name: /sign out/i })
        await user.click(signOutButton)

        expect(signOut).toHaveBeenCalledTimes(1)
        expect(signOut).toHaveBeenCalledWith({ callbackUrl: routesName.login })
    })
})