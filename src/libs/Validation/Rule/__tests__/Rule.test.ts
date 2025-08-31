import {expect, describe, it} from "vitest";
import defineRule, {type ErrorRuleResponse} from "../Rule.ts";

describe('Rule', () => {
    const rule = defineRule(
        (value) => Number(value) > 10,
        { errorBuilder: () => ({ error: 'Value must be bigger than 10' }) }
    )

    it('Validation failed', () => {
        const response = rule(5)

        expect(response.type).toBe('error')
        expect((response as ErrorRuleResponse<string, unknown>).error.error).toBe('Value must be bigger than 10')
    })

    it('Validation passed', () => {
        const response = rule(15)
        expect(response.type).toBe('success')
    })
})