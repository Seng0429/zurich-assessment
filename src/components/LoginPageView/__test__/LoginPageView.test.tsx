import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { signIn } from 'next-auth/react'
import LoginPage from '@/components/LoginPageView/LoginPageView'
import { routesName } from '@/constants/routesName'

vi.mock('next-auth/react', () => ({
    signIn: vi.fn(),
}))

vi.mock('@/assets/icons/googleLogo', () => ({
    GoogleIcon: () => <svg data-testid="google-icon" />,
}))

describe('LoginPage Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render welcome titles and google login button', () => {
        render(<LoginPage />)

        expect(screen.getByText('Welcome')).toBeDefined()
        expect(screen.getByText('Please sign in with your Google account to continue.')).toBeDefined()
        expect(screen.getByTestId('google-icon')).toBeDefined()
        expect(screen.getByRole('button', { name: /sign in with google/i })).toBeDefined()
    })

    it('should call signIn with google provider and correct callback URL when button is clicked', async () => {
        const user = userEvent.setup()

        render(<LoginPage />)

        const loginButton = screen.getByRole('button', { name: /sign in with google/i })
        await user.click(loginButton)

        expect(signIn).toHaveBeenCalledTimes(1)
        expect(signIn).toHaveBeenCalledWith('google', { callbackUrl: routesName.home })
    })
})