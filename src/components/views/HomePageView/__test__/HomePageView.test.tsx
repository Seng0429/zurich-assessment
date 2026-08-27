import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePageView from '@/components/views/HomePageView/HomePageView'
import { useAppDispatch } from '@/store/store'
import { saveUserList } from '@/store/slices/userListSlice'

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
    default: ({ children }: any) => <div data-testid="footer">{children}</div>,
}))

vi.mock('@/components/CardGridContainer/CardGridContainer', () => ({
    default: ({ cardList }: any) => (
        <div data-testid="card-grid">
            {cardList.map((u: any) => <div key={u.id}>{u.id}</div>)}
        </div>
    ),
}))

describe('HomePageView Component', () => {
    const mockDispatch = vi.fn()
    const mockUsers = [
        { id: 1, first_name: 'John', last_name: 'Doe', email: 'test1@example.com', avatar: '/avatar1.png' }
    ]

    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)
    })

    it('should dispatch saveUserList on mount with the user list array', () => {
        render(<HomePageView userList={mockUsers} />)

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(saveUserList).toHaveBeenCalledWith(mockUsers)
    })

    it('should render header, card grid, and footer correctly without pagination', () => {
        render(<HomePageView userList={mockUsers} />)

        expect(screen.getByTestId('header')).toBeDefined()
        expect(screen.getByTestId('card-grid')).toBeDefined()
        expect(screen.getByTestId('footer')).toBeDefined()
        expect(screen.getByText(/All rights reserved/i)).toBeDefined()
    })
})