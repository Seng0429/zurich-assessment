import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropdown, { DropdownItem } from '@/components/molecules/DropDown/DropDown'

describe('Dropdown Component', () => {
    it('should render trigger and keep menu hidden by default', () => {
        const items: DropdownItem[] = [
            { label: 'Edit', onClick: vi.fn() }
        ]

        render(<Dropdown trigger={<button>Open Menu</button>} items={items} />)

        expect(screen.getByRole('button', { name: 'Open Menu' })).toBeDefined()
        expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull()
    })

    it('should open the dropdown menu when trigger is clicked', async () => {
        const user = userEvent.setup()
        const items: DropdownItem[] = [
            { label: 'Edit', onClick: vi.fn() },
            { label: 'Delete', onClick: vi.fn(), danger: true }
        ]

        render(<Dropdown trigger={<button>Open Menu</button>} items={items} />)

        await user.click(screen.getByRole('button', { name: 'Open Menu' }))

        expect(screen.getByRole('button', { name: 'Edit' })).toBeDefined()
        expect(screen.getByRole('button', { name: 'Delete' })).toBeDefined()
    })

    it('should call item onClick handler and close menu when item is clicked', async () => {
        const user = userEvent.setup()
        const mockOnClick = vi.fn()
        const items: DropdownItem[] = [
            { label: 'Edit', onClick: mockOnClick }
        ]

        render(<Dropdown trigger={<button>Open Menu</button>} items={items} />)

        await user.click(screen.getByRole('button', { name: 'Open Menu' }))
        await user.click(screen.getByRole('button', { name: 'Edit' }))

        expect(mockOnClick).toHaveBeenCalledTimes(1)
        expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull()
    })

    it('should close the dropdown menu when clicking outside', async () => {
        const user = userEvent.setup()
        const items: DropdownItem[] = [
            { label: 'Edit', onClick: vi.fn() }
        ]

        render(
            <div>
                <div data-testid="outside">Outside Element</div>
                <Dropdown trigger={<button>Open Menu</button>} items={items} />
            </div>
        )

        await user.click(screen.getByRole('button', { name: 'Open Menu' }))
        expect(screen.getByRole('button', { name: 'Edit' })).toBeDefined()

        await user.click(screen.getByTestId('outside'))
        expect(screen.queryByRole('button', { name: 'Edit' })).toBeNull()
    })
})