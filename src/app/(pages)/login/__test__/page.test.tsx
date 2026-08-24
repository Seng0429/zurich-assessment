import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Login from '@/app/(pages)/login/page'

vi.mock('@/components/LoginPageView/LoginPageView', () => ({
    default: () => <div data-testid="login-page-view">LoginPageView Mock</div>,
}))

describe('Login Page', () => {
    it('should render LoginPageView component', () => {
        render(<Login />)

        expect(screen.getByTestId('login-page-view')).toBeDefined()
    })
})