import React from "react"
import s from './ResultCurrency.module.scss'
import ReactSelect, { ISelectOption } from "./ReactSelect";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { initializeCurrency } from "../../store/reducers/ConverterReducer";
import { setCurrency } from "../../store/reducers/ConverterReducer";
import { TConverter } from "../../types";
import { cryptoPrice, moneyPrice } from './ValidateInput';
import { store } from "../../store/store";

interface Props {

}

const ResultCurrency: React.FC = (props: Props) => {
    const dispatch = useAppDispatch()
    const { converter } = useAppSelector(state => state.cur)
    const { activeCurrency, dollarToCoin } = useAppSelector(state => state.converter)
    const currencies: TConverter[] | [] = converter
    const [selectedOption, setSelectedOption] = React.useState<ISelectOption>({ value: "USD", label: "USD" })
    let [outcomeValue, setOutcomeValue] = React.useState<string>(String(dollarToCoin))
    let [instanceValue, setInstanceValue] = React.useState<string>("0")

    const options = [
        { value: 'USD', label: "USD" }
    ]

    React.useEffect(() => {
        if (activeCurrency !== null) {
            setOutcomeValue(String(activeCurrency.price))
            setInstanceValue("1")
            dispatch(initializeCurrency())
        }
    }, [activeCurrency, dispatch])

    const handleChange = (selectedOption: ISelectOption) => {
        setSelectedOption(selectedOption)
    }

    const changeCurrency = (value: ISelectOption) => {
        dispatch(setCurrency({ ...value, currency: store.getState().cur.currency }))
    }

    return (
        <div>
            <h2>Calucalator</h2>
            {activeCurrency !== null && (
                <>
                    <div className={s.flex}>
                        <input type="text" placeholder="Price" className={s.input} value={instanceValue} onChange={(e) => cryptoPrice(e, setOutcomeValue, setInstanceValue, dollarToCoin, instanceValue)} />
                        <ReactSelect
                            placeholder={"Выберите валюту"}
                            options={currencies}
                            value={activeCurrency}
                            onChange={changeCurrency}
                        />
                    </div>
                    <div className={s.flex}>
                        <input type="text" placeholder="Result" className={s.input} value={outcomeValue} onChange={(e) => moneyPrice(e, setOutcomeValue, setInstanceValue, dollarToCoin, outcomeValue)} />
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