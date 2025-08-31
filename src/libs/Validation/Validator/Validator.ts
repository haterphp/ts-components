import type {ErrorMessage, Rule} from "../Rule/Rule.ts";

/**
 * Response
 */

interface BaseValidatorResponse<Type extends string> {
    type: Type
}

export interface ErrorValidatorResponse<ErrorType> extends BaseValidatorResponse<'error'> {
    errors: ErrorMessage<ErrorType>[]
}

/**
 * Validator options
 */

export type ValidatorResponse<ErrorType> = BaseValidatorResponse<'success'> | ErrorValidatorResponse<ErrorType>

export type Validator<ErrorType> = (value: unknown) => ValidatorResponse<ErrorType>

interface ValidatorOptions{
    isForceFirstError?: boolean
}

/**
 * Function for creating validator instance with own properties
 */

export default function createValidator<ErrorType>(rules: Rule<ErrorType, any>[], options?: ValidatorOptions): Validator<ErrorType> {
    const { isForceFirstError = true } = options ?? {}

    return (value: unknown) => {
        const errors: ErrorMessage<ErrorType>[] = []

        for (const rule of rules) {
            const response = rule(value)

            if (response.type === 'error') {
                errors.push(response.error)

                if (isForceFirstError) {
                    return <ErrorValidatorResponse<ErrorType>>{ type: 'error', errors }
                }
            }
        }

        if (errors.length > 0) {
            return <ErrorValidatorResponse<ErrorType>>{ type: 'error', errors }
        }

        return { type: 'success' }
    }
}