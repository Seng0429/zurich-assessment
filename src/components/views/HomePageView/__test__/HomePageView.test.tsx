import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePageView from '@/components/views/HomePageView/HomePageView'
import * as storeHooks from '@/store/store'
import { saveUserList } from '@/store/slices/userListSlice'

vi.mock('@/store/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('@/store/slices/userListSlice', () => ({
    saveUserList: vi.fn((list) => ({ type: 'userList/saveUserList', payload: list })),
}))

vi.mock('@/components/organisms/Header/Header', () => ({
    default: () => <div data-testid="header">Header Mock</div>,
}))

vi.mock('@/components/organisms/CardGridContainer/CardGridContainer', () => ({
    default: ({ cardList }: { cardList: any[] }) => (
        <div data-testid="card-grid-container" data-count={cardList.length}>
            CardGridContainer Mock
        </div>
    ),
}))

vi.mock('@/components/organisms/Footer/Footer', () => ({
    default: ({ children, color }: { children: React.ReactNode; color?: string }) => (
        <div data-testid="footer" data-color={color}>
            {children}
        </div>
    ),
}))

describe('HomePageView', () => {
    const mockDispatch = vi.fn()
    const mockUsers = [
        { id: 1, first_name: 'George', last_name: 'Bluth', email: 'george@reqres.in' },
        { id: 2, first_name: 'Janet', last_name: 'Weaver', email: 'janet@reqres.in' },
    ]

    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(storeHooks.useAppDispatch).mockReturnValue(mockDispatch)
    })

    it('should render Header, CardGridContainer with users, and Footer', () => {
        render(<HomePageView userList={mockUsers} />)

        expect(screen.getByTestId('header')).toBeDefined()
        
        const cardGrid = screen.getByTestId('card-grid-container')
        expect(cardGrid).toBeDefined()
        expect(cardGrid.getAttribute('data-count')).toBe('2')

        const footer = screen.getByTestId('footer')
        expect(footer).toBeDefined()
        expect(footer.getAttribute('data-color')).toBe('black')
        expect(screen.getByText(/Wei Seng's Assessment/i)).toBeDefined()
    })

    it('should dispatch saveUserList action with userList on mount', () => {
        render(<HomePageView userList={mockUsers} />)

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(saveUserList).toHaveBeenCalledWith(mockUsers)
    })
})