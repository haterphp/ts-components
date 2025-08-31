import {describe, it, expect} from "vitest";
import {
    IS_BIGGER_THAN_ERROR_MESSAGE, IS_EQUAL_ERROR_MESSAGE,
    IS_LOWER_THAN_ERROR_MESSAGE, IS_NUMBER_ERROR_MESSAGE, isBiggerThan, isEqual, isLowerThan, isNumber
} from "../Number.ts";
import type {ErrorRuleResponse} from "../Rule.ts";

describe('Number validations', () => {
    it('IsNumber (non-strict)', () => {
        const rule = isNumber({})

        expect(rule('1').type).toBe('success')

        expect(rule('Hello, World!').type).toBe('error')
        expect((rule('Hello, World!') as ErrorRuleResponse<string, unknown>).error.error).toBe(IS_NUMBER_ERROR_MESSAGE)
    })

    it('IsNumber (strict)', () => {
        const rule = isNumber({ isStrict: true })

        expect(rule(1).type).toBe('success')

        expect(rule('1').type).toBe('error')
        expect((rule('1') as ErrorRuleResponse<string, unknown>).error.error).toBe(IS_NUMBER_ERROR_MESSAGE)

        expect(rule('Hello, World!').type).toBe('error')
        expect((rule('Hello, World!') as ErrorRuleResponse<string, unknown>).error.error).toBe(IS_NUMBER_ERROR_MESSAGE)
    })

    it('IsBiggerThan (without isBiggerAndEquals)', () => {
        const rule = isBiggerThan({ value: 10 })

        expect(rule(15).type).toBe('success')

        expect(rule(10).type).toBe('error')
        expect((rule(10) as ErrorRuleResponse<string, unknown>).error.error).toBe(IS_BIGGER_THAN_ERROR_MESSAGE)

        expect(rule(5).type).toBe('error')
        expect((rule(5) as ErrorRuleResponse<string, unknown>).error.error).toBe(IS_BIGGER_THAN_ERROR_MESSAGE)
    })

    it('IsBiggerThan (with isBiggerAndEquals)', () => {
        const rule = isBiggerThan({ value: 10, isBiggerAndEquals: true })

        expect(rule(15).type).toBe('success')
        expect(rule(10).type).toBe('success')

        expect(rule(5).type).toBe('error')
        expect((rule(5) as ErrorRuleResponse<string, unknown>).error.error).toBe(IS_BIGGER_THAN_ERROR_MESSAGE)
    })

    it('IsLowerThan (without isLowerAndEquals)', () => {
        const rule = isLowerThan({ value: 10 })

        expect(rule(5).type).toBe('success')

        expect(rule(10).type).toBe('error')
        expect((rule(10) as ErrorRuleResponse<string, unknown>).error.error).toBe(IS_LOWER_THAN_ERROR_MESSAGE)

        expect(rule(15).type).toBe('error')
        expect((rule(15) as ErrorRuleResponse<string, unknown>).error.error).toBe(IS_LOWER_THAN_ERROR_MESSAGE)
    })

    it('IsLowerThan (with isLowerAndEquals)', () => {
        const rule = isLowerThan({ value: 10, isLowerAndEquals: true })

        expect(rule(5).type).toBe('success')
        expect(rule(10).type).toBe('success')

        expect(rule(15).type).toBe('error')
        expect((rule(15) as ErrorRuleResponse<string, unknown>).error.error).toBe(IS_LOWER_THAN_ERROR_MESSAGE)
    })

    it('IsEquals', () => {
        const rule = isEqual({ value: 10 })

        expect(rule(10).type).toBe('success')

        expect(rule(15).type).toBe('error')
        expect((rule(15) as ErrorRuleResponse<string, unknown>).error.error).toBe(IS_EQUAL_ERROR_MESSAGE)

    })
})