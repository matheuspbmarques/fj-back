const verification = require('../../tools/verification')

describe('Phone', () => {
    test('Without digit 9 required', () => {
        const result = verification.phone('(91) 1234-1234')

        expect(result).toBe(false)
    })

    test('With digit 9 required wrong', () => {
        const result = verification.phone('(91) 81234-1234')

        expect(result).toBe(false)
    })

    test('With only one digit at DDD', () => {
        const result = verification.phone('(9) 91234-1234')

        expect(result).toBe(false)
    })

    test('Without first parentheses at DDD', () => {
        const result = verification.phone('91) 91234-1234')

        expect(result).toBe(false)
    })

    test('Without last parentheses at DDD', () => {
        const result = verification.phone('(91 91234-1234')

        expect(result).toBe(false)
    })

    test('Without underscore', () => {
        const result = verification.phone('(91) 912341234')

        expect(result).toBe(false)
    })

    test('With a digit before underscode', () => {
        const result = verification.phone('(91) 9123-1234')

        expect(result).toBe(false)
    })

    test('With a digit after underscode', () => {
        const result = verification.phone('(91) 91234-123')

        expect(result).toBe(false)
    })

    test('With right phone', () => {
        const result = verification.phone('(91) 91234-1234')

        expect(result).toBe(true)
    })
})