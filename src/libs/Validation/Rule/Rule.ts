/**
 * Error message builder
 */

export interface ErrorMessage<ErrorType, ErrorMeta = unknown> {
    error: ErrorType
    meta?: ErrorMeta
}

export type ErrorMessageBuilder<ErrorType, ErrorMeta = unknown> = () => ErrorMessage<ErrorType, ErrorMeta>

/**
 * Rule response
 */
interface BaseRuleResponse<Type extends string> {
    type: Type
}

export interface ErrorRuleResponse<ErrorType, ErrorMeta> extends BaseRuleResponse<'error'> {
    error: ErrorMessage<ErrorType, ErrorMeta>
}

export type RuleResponse<ErrorType, ErrorMeta> = BaseRuleResponse<'success'> | ErrorRuleResponse<ErrorType, ErrorMeta>

/**
 * Rule options
 */
export type RuleConditionHandler = (value: unknown) => boolean

export type Rule<ErrorType, ErrorMeta = unknown> = (value: unknown) => RuleResponse<ErrorType, ErrorMeta>

export interface RuleOptions<ErrorType, ErrorMeta = unknown> {
    errorBuilder: ErrorMessageBuilder<ErrorType, ErrorMeta>
}

export default function defineRule<ErrorType, ErrorMeta = unknown>(condition: RuleConditionHandler, options: RuleOptions<ErrorType, ErrorMeta>): Rule<ErrorType, ErrorMeta> {
    return (value) => {
        const isSuccess = condition(value)

        if (isSuccess) {
            return { type: 'success' }
        }

        return { type: 'error', error: options.errorBuilder() }
    }
}