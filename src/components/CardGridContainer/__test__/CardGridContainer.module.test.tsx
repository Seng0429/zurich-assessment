import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CardGridView from '@/components/CardGridContainer/CardGridContainer'
import { User } from '@/constants/types'

const mockUsers: User[] = [
    {
        id: 1,
        email: 'johndoe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: '/avatar1.png',
    },
    {
        id: 2,
        email: 'ab@example.com',
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
        expect(screen.getByText('***@example.com')).toBeDefined()
    })

    it('should toggle email visibility when the button is clicked', async () => {
        const user = userEvent.setup()
        render(<CardGridView cardList={mockUsers} />)

        const toggleButton = screen.getAllByRole('button', { name: /show/i })[0]

        expect(screen.getByText('jo***@example.com')).toBeDefined()

        await user.click(toggleButton)

        expect(screen.getByText('johndoe@example.com')).toBeDefined()
        expect(screen.getByRole('button', { name: /hide/i })).toBeDefined()

        await user.click(screen.getByRole('button', { name: /hide/i }))

        expect(screen.getByText('jo***@example.com')).toBeDefined()
    })

    it('should handle an empty card list gracefully without crashing', () => {
        const { container } = render(<CardGridView cardList={[]} />)
        expect(container).toBeDefined()
    })
})