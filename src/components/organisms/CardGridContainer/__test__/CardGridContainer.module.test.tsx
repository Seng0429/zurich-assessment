import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CardGridView from '@/components/organisms/CardGridContainer/CardGridContainer'
import { User } from '@/constants/types'

vi.mock('@/actions/userActions', () => ({
    fetchUserEmail: vi.fn(async (id: number) => {
        if (id === 1) return 'johndoe@example.com';
        if (id === 2) return 'ab@example.com';
        return '';
    }),
}));

const mockUsers: User[] = [
    {
        id: 1,
        email: 'jo***@example.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: '/avatar1.png',
    },
    {
        id: 2,
        email: 'ab***@example.com',
        first_name: 'Alice',
        last_name: 'Smith',
        avatar: '/avatar2.png',
    },
]

describe('CardGridView Component', () => {
    it('should render cards with masked emails by default', () => {
        render(<CardGridView cardList={mockUsers} />)

        expect(screen.getByText('John Doe')).toBeDefined()
        expect(screen.getByText('Alice Smith')).toBeDefined()

        expect(screen.getByText('jo***@example.com')).toBeDefined()
        expect(screen.getByText('ab***@example.com')).toBeDefined()
    })

    it('should toggle email visibility when the button is clicked', async () => {
        const user = userEvent.setup()
        render(<CardGridView cardList={mockUsers} />)

        const toggleButton = screen.getAllByRole('button', { name: /show/i })[0]

        expect(screen.getByText('jo***@example.com')).toBeDefined()

        await user.click(toggleButton)

        const fullEmail = await screen.findByText('johndoe@example.com')
        expect(fullEmail).toBeDefined()
        expect(screen.getByRole('button', { name: /hide/i })).toBeDefined()

        await user.click(screen.getByRole('button', { name: /hide/i }))

        expect(screen.getByText('jo***@example.com')).toBeDefined()
    })

    it('should handle an empty card list gracefully without crashing', () => {
        const { container } = render(<CardGridView cardList={[]} />)
        expect(container).toBeDefined()
    })
})