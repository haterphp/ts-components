import createValidator, {type Validator} from "../Validator/Validator.ts";
import {isBiggerThan, isNumber} from "../Rule/Number.ts";

export type SchemeStructure<ErrorType> = {
    [key: string]: Validator<ErrorType> | SchemeStructure<ErrorType>;
};

type SchemePayloadTransformer<T> =
    T extends object
        ? { [K in keyof T]: SchemePayloadTransformer<T[K]> }
        : unknown;

export type SchemePayload<ErrorType, Scheme extends SchemeStructure<ErrorType>> = SchemePayloadTransformer<Scheme>

export type Scheme<
    ErrorType,
    Structure extends SchemeStructure<ErrorType>
> = (value: SchemePayload<ErrorType, Structure>) => void

export default function defineScheme<
    ErrorType,
    Structure extends SchemeStructure<ErrorType> = SchemeStructure<ErrorType>
>(structure: Structure): Scheme<ErrorType, Structure> {
    return (value) => {
        console.log(structure, value)
    }
}

const scheme = defineScheme({
    num1: createValidator([ isNumber({}) ]),
    nestedObject: {
        num2: createValidator([ isNumber({}), isBiggerThan({ value: 20 }) ]),
        // numsArray:
    }
})

scheme({
    num1: '123',
    nestedObject: {
        num2: true
    }
})

/**
 * Validator for arrays
 *
 * createValidator([
 *  isArrayLength({ length: 10 },
 *  createValidator([ isNumber({}), isBiggerThan({ value: 20 } ], { each: true })
 * ])
 */