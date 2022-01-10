import React from "react"
import s from './ResultCurrency.module.scss'
import ReactSelect, { ISelectOption } from "./ReactSelect";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { initializeCurrency, setCurrency } from "../../store/reducers/CurrenciesReducer";
import { TConverter } from "../../types";
import { ValidateSelect } from './ValidateSelect'

interface Props {

}

const ResultCurrency: React.FC = (props: Props) => {
    const dispatch = useAppDispatch()
    const { converter, activeCurrency, dollarToCoin } = useAppSelector(state => state.cur)
    const currencies: TConverter[] | [] = converter
    let [outcomeValue, setOutcomeValue] = React.useState<string>(String(dollarToCoin))
    let [instanceValue, setInstanceValue] = React.useState<string>("0")
    const [selectedOption, setSelectedOption] = React.useState<ISelectOption>({ value: "USD", label: "USD" })
    const options = [
        { value: 'USD', label: "USD" }
    ]

    React.useEffect(() => {
        if (activeCurrency !== null) {
            setOutcomeValue(String(activeCurrency.price))
            setInstanceValue("1")
            dispatch(initializeCurrency())
        }
    }, [activeCurrency])

    const handleChange = (selectedOption: ISelectOption) => {
        setSelectedOption(selectedOption)
    }

    const changeCurrency = (value: ISelectOption) => {
        dispatch(setCurrency(value))
    }

    const cryptoPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        let validate = ValidateSelect(instanceValue, e.target.value)

        if (typeof validate === 'string') {
            setInstanceValue(validate)
        } else if (typeof validate === 'boolean') {
            let price = +e.target.value

            setInstanceValue(String(price))
            setOutcomeValue((price * dollarToCoin).toFixed(2))
        } else {
            return
        }
    }

    const moneyPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        let validate = ValidateSelect(outcomeValue, e.target.value)

        if (typeof validate === 'string') {
            setOutcomeValue(validate)
        } else if (typeof validate === 'boolean') {
            let price = +e.target.value

            setOutcomeValue(String(price))
            setInstanceValue((price / dollarToCoin).toFixed(2))
        } else {
            return
        }
    }

    return (
        <div>
            <h2>Calucalator</h2>
            {activeCurrency !== null && (
                <>
                    <div className={s.flex}>
                        <input type="text" placeholder="Price" className={s.input} value={instanceValue} onChange={(e) => cryptoPrice(e)} />
                        <ReactSelect
                            placeholder={"Выберите валюту"}
                            options={currencies}
                            value={activeCurrency}
                            onChange={changeCurrency}
                        />
                    </div>
                    <div className={s.flex}>
                        <input type="text" placeholder="Result" className={s.input} value={outcomeValue} onChange={(e) => moneyPrice(e)} />
                        <ReactSelect
                            placeholder={"Выберите валюту"}
                            options={options}
                            value={selectedOption}
                            onChange={handleChange}
                        />
                    </div>
                </>
            )}
        </div>
    )
};

export default ResultCurrency;