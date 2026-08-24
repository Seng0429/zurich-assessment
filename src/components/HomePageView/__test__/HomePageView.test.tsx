import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import type { ReadonlyURLSearchParams } from 'next/navigation'
import HomePageView from '@/components/HomePageView/HomePageView'
import { useAppDispatch } from '@/store/store'
import { saveUserList } from '@/store/slices/userListSlice'

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
    usePathname: vi.fn(),
    useSearchParams: vi.fn(),
}))

vi.mock('@/store/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('@/store/slices/userListSlice', () => ({
    saveUserList: vi.fn((payload) => ({ type: 'userList/saveUserList', payload })),
}))

vi.mock('@/components/Header/Header', () => ({
    default: () => <div data-testid="header">Header Mock</div>,
}))

vi.mock('@/components/Footer/Footer', () => ({
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="footer">{children}</div>,
}))

vi.mock('@/components/CardGridContainer/CardGridContainer', () => ({
    default: ({ cardList }: { cardList: Array<{ id: number }> }) => (
        <div data-testid="card-grid">
            {cardList.map((card) => (
                <div key={card.id}>{card.id}</div>
            ))}
        </div>
    ),
}))

vi.mock('@/components/PaginationConsole/PaginationConsole', () => ({
    default: ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => (
        <div data-testid="pagination">
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
        </div>
    ),
}))

describe('HomePageView Component', () => {
    const mockDispatch = vi.fn()
    const mockPush = vi.fn()

    const mockUsers = [
        { id: 1, email: 'test1@example.com', first_name: 'John', last_name: 'Doe', avatar: '/avatar1.png' },
    ]

    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)
        vi.mocked(useRouter).mockReturnValue({
            push: mockPush,
            back: vi.fn(),
            forward: vi.fn(),
            refresh: vi.fn(),
            replace: vi.fn(),
            prefetch: vi.fn(),
            bfcacheId: 0,
        } as unknown as AppRouterInstance)
        vi.mocked(usePathname).mockReturnValue('/home')
        vi.mocked(useSearchParams).mockReturnValue(
            new URLSearchParams('page=1') as unknown as ReadonlyURLSearchParams
        )
    })

    it('should dispatch saveUserList on mount with user list properties', () => {
        render(<HomePageView userList={mockUsers} currentPage={1} totalPages={3} />)

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(saveUserList).toHaveBeenCalledWith({
            data: mockUsers,
            page: 1,
            total_pages: 3,
        })
    })

    it('should render header, card grid, pagination, and footer correctly', () => {
        render(<HomePageView userList={mockUsers} currentPage={1} totalPages={3} />)

        expect(screen.getByTestId('header')).toBeDefined()
        expect(screen.getByTestId('card-grid')).toBeDefined()
        expect(screen.getByTestId('pagination')).toBeDefined()
        expect(screen.getByTestId('footer')).toBeDefined()
        expect(screen.getByText("© 2026 Wei Seng's Assessment. All rights reserved.")).toBeDefined()
    })

    it('should update query parameters and push router when page changes', async () => {
        const user = userEvent.setup()

        render(<HomePageView userList={mockUsers} currentPage={1} totalPages={3} />)

        const nextButton = screen.getByRole('button', { name: 'Next Page' })
        await user.click(nextButton)

        expect(mockPush).toHaveBeenCalledTimes(1)
        expect(mockPush).toHaveBeenCalledWith('/home?page=2')
    })
})