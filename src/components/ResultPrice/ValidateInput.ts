import { ValidateSelect } from './ValidateSelect'

export const cryptoPrice = (e: React.ChangeEvent<HTMLInputElement>, setOutcomeValue: any, setInstanceValue: any, dollar: number, value: string) => {
    let validate = ValidateSelect(value, e.target.value)

    if (typeof validate === 'string') {
        setInstanceValue(validate)
    } else if (typeof validate === 'boolean') {
        let price = +e.target.value

        setInstanceValue(String(price))
        setOutcomeValue((price * dollar).toFixed(2))
    } else {
        return
    }
}

export const moneyPrice = (e: React.ChangeEvent<HTMLInputElement>, setOutcomeValue: any, setInstanceValue: any, dollar: number, value: string) => {
    let validate = ValidateSelect(value, e.target.value)

    if (typeof validate === 'string') {
        setOutcomeValue(validate)
    } else if (typeof validate === 'boolean') {
        let price = +e.target.value

        setOutcomeValue(String(price))
        setInstanceValue((price / dollar).toFixed(2))
    } else {
        return
    }
}