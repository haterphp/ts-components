import defineRule from "./Rule.ts";

/**
 * IsNumber
 */

interface IsNumberRuleOptions {
    isStrict?: boolean
}

export const IS_NUMBER_ERROR_MESSAGE = 'value_is_not_a_number'

export function isNumber(options: IsNumberRuleOptions) {
    const { isStrict } = options

    const handler = (value: unknown) => {
        if (isStrict) {
            return typeof value === 'number'
        }
        return !isNaN(Number(value))
    }

    return defineRule(handler, {
        errorBuilder: () => ({
            error: IS_NUMBER_ERROR_MESSAGE
        }),
    })
}

/**
 * Bigger than
 */

interface IsBiggerThanRuleOptions {
    value: number
    isBiggerAndEquals?: boolean
}

export const IS_BIGGER_THAN_ERROR_MESSAGE = 'value_is_lower_than'


export function isBiggerThan(options: IsBiggerThanRuleOptions) {
    const { value: comparisonValue, isBiggerAndEquals = false } = options

    const handler = (value: unknown) => {
        const v = Number(value)

        if (isNaN(v)) {
            return false
        }

        return isBiggerAndEquals ? v >= comparisonValue : v > comparisonValue
    }

    return defineRule(handler, {
        errorBuilder: () => ({
            error: IS_BIGGER_THAN_ERROR_MESSAGE,
            meta: { inputValue: comparisonValue }
        })
    })
}

/**
 * Lower than
 */


interface IsLowerThanRuleOptions {
    value: number
    isLowerAndEquals?: boolean
}

export const IS_LOWER_THAN_ERROR_MESSAGE = 'value_is_bigger_than'

export function isLowerThan(options: IsLowerThanRuleOptions) {
    const { value: comparisonValue, isLowerAndEquals = false } = options

    const handler = (value: unknown) => {
        const v = Number(value)

        if (isNaN(v)) {
            return false
        }

        return isLowerAndEquals ? v <= comparisonValue : v < comparisonValue
    }

    return defineRule(handler, {
        errorBuilder: () => ({
            error: IS_LOWER_THAN_ERROR_MESSAGE,
            meta: { inputValue: comparisonValue }
        })
    })
}

/**
 * Is equal
 */

interface IsEqualRuleOptions {
    value: number
}

export const IS_EQUAL_ERROR_MESSAGE = 'values_are_not_equals'

export function isEqual(options: IsEqualRuleOptions) {
    const { value: comparisonValue } = options

    const handler = (value: unknown) => {
        const v = Number(value)

        if (isNaN(v)) {
            return false
        }

        return v === comparisonValue
    }

    return defineRule(handler, {
        errorBuilder: () => ({
            error: IS_EQUAL_ERROR_MESSAGE,
            meta: { inputValue: comparisonValue }
        }),
    })
}