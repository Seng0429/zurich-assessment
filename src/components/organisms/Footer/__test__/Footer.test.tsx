import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/organisms/Footer/Footer'

describe('Footer Component', () => {
    it('should render children and default background color when color is not provided', () => {
        render(<Footer><span>Footer Content</span></Footer>)

        const content = screen.getByText('Footer Content')
        expect(content).toBeDefined()

        const container = content.parentElement
        expect(container?.className).toMatch(/bg-blue-|bg-\[#/)
    })

    it('should apply blue background color when color prop is blue', () => {
        render(<Footer color="blue"><span>Blue Footer</span></Footer>)

        const content = screen.getByText('Blue Footer')
        const container = content.parentElement
        expect(container?.className).toMatch(/blue|bg-\[#4285F4\]/)
    })

    it('should apply black background color when color prop is black', () => {
        render(<Footer color="black"><span>Black Footer</span></Footer>)

        const content = screen.getByText('Black Footer')
        const container = content.parentElement

        expect(container?.className).toMatch(/black|2b2b2b|neutral|gray-900|dark/)
    })
})