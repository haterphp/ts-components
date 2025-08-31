import {describe, expect, it} from "vitest";
import createValidator, {type ErrorValidatorResponse} from "../Validator.ts";
import {IS_EQUAL_ERROR_MESSAGE, IS_NUMBER_ERROR_MESSAGE, isEqual, isNumber} from "../../Rule/Number.ts";

describe('Validator', () => {
    it('Validator return success type', () => {
        const validator = createValidator(
            [ isNumber({ isStrict: true }), isEqual({ value: 10 }) ],
            {}
        )

        const response = validator(10)

        expect(response.type).toBe('success')
    })

    it('Validator return error type', () => {
        const validator = createValidator(
            [ isNumber({ isStrict: true }), isEqual({ value: 10 }) ],
            {}
        )

        const response = validator('10')

        expect(response.type).toBe('error')
        expect((response as ErrorValidatorResponse<string>).errors).toEqual([
            { error: IS_NUMBER_ERROR_MESSAGE }
        ])
    })

    it('Validator return error type (with isForceFirstError => false)', () => {
        const validator = createValidator(
            [ isNumber({ isStrict: true }), isEqual({ value: 10 }) ],
            { isForceFirstError: false }
        )

        const response = validator('12')

        expect(response.type).toBe('error')
        expect((response as ErrorValidatorResponse<string>).errors).toEqual([
            { error: IS_NUMBER_ERROR_MESSAGE },
            { error: IS_EQUAL_ERROR_MESSAGE, meta: { inputValue: 10 } },
        ])
    })
})