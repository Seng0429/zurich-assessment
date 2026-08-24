import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PaginationConsole from '@/components/PaginationConsole/PaginationConsole'

describe('PaginationConsole Component', () => {
    it('should render current page and total pages correctly', () => {
        render(<PaginationConsole currentPage={2} totalPages={5} onPageChange={vi.fn()} />)

        expect(screen.getByText('Page 2 of 5')).toBeDefined()
    })

    it('should disable Previous button when on the first page', () => {
        render(<PaginationConsole currentPage={1} totalPages={5} onPageChange={vi.fn()} />)

        const prevButton = screen.getByRole('button', { name: 'Previous' })
        const nextButton = screen.getByRole('button', { name: 'Next' })

        expect(prevButton.hasAttribute('disabled')).toBe(true)
        expect(nextButton.hasAttribute('disabled')).toBe(false)
    })

    it('should disable Next button when on the last page', () => {
        render(<PaginationConsole currentPage={5} totalPages={5} onPageChange={vi.fn()} />)

        const prevButton = screen.getByRole('button', { name: 'Previous' })
        const nextButton = screen.getByRole('button', { name: 'Next' })

        expect(prevButton.hasAttribute('disabled')).toBe(false)
        expect(nextButton.hasAttribute('disabled')).toBe(true)
    })

    it('should call onPageChange with decremented page when Previous is clicked', async () => {
        const user = userEvent.setup()
        const mockOnPageChange = vi.fn()

        render(<PaginationConsole currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />)

        const prevButton = screen.getByRole('button', { name: 'Previous' })
        await user.click(prevButton)

        expect(mockOnPageChange).toHaveBeenCalledTimes(1)
        expect(mockOnPageChange).toHaveBeenCalledWith(2)
    })

    it('should call onPageChange with incremented page when Next is clicked', async () => {
        const user = userEvent.setup()
        const mockOnPageChange = vi.fn()

        render(<PaginationConsole currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />)

        const nextButton = screen.getByRole('button', { name: 'Next' })
        await user.click(nextButton)

        expect(mockOnPageChange).toHaveBeenCalledTimes(1)
        expect(mockOnPageChange).toHaveBeenCalledWith(4)
    })
})