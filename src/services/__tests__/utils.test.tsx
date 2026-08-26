import { describe, it, expect, vi } from 'vitest'

vi.mock('server-only', () => ({}))

import { maskEmail, matchUserInitials } from '@/services/utils'

describe('maskEmail', () => {
    it('should mask the name part and keep the domain when name length is greater than 2', () => {
        expect(maskEmail('johndoe@example.com')).toBe('jo***@example.com')
    })

    it('should fully mask the name part when name length is exactly 2', () => {
        expect(maskEmail('ab@example.com')).toBe('***@example.com')
    })

    it('should fully mask the name part when name length is less than 2', () => {
        expect(maskEmail('a@example.com')).toBe('***@example.com')
    })

    it('should return replacement string if there is no domain (no @ symbol)', () => {
        expect(maskEmail('johndoe')).toBe('***')
    })

    it('should handle emails with an empty local part (e.g., "@example.com")', () => {
        expect(maskEmail('@example.com')).toBe('***@example.com')
    })

    it('should handle multiple @ symbols gracefully by taking the first domain segment', () => {
        expect(maskEmail('john@doe@example.com')).toBe('jo***@doe')
    })
})

describe('matchUserInitials', () => {
    it('should return true if both first and last name initials match', () => {
        expect(matchUserInitials('John', 'Doe', 'j', 'd')).toBe(true)
    })

    it('should return true if only the first name initial matches', () => {
        expect(matchUserInitials('John', 'Doe', 'j', 'x')).toBe(true)
    })

    it('should return true if only the last name initial matches', () => {
        expect(matchUserInitials('John', 'Doe', 'x', 'd')).toBe(true)
    })

    it('should return false if neither initial matches', () => {
        expect(matchUserInitials('John', 'Doe', 'x', 'y')).toBe(false)
    })

    it('should handle case insensitivity correctly', () => {
        expect(matchUserInitials('JOHN', 'DOE', 'J', 'D')).toBe(true)
    })

    it('should trim whitespace from input letters and user names', () => {
        expect(matchUserInitials('  John  ', '  Doe  ', ' j ', ' d ')).toBe(true)
    })

    it('should ignore empty or whitespace-only search letters', () => {
        expect(matchUserInitials('John', 'Doe', '', '   ')).toBe(false)
        expect(matchUserInitials('John', 'Doe', 'j', '')).toBe(true)
        expect(matchUserInitials('John', 'Doe', '', 'd')).toBe(true)
    })
})