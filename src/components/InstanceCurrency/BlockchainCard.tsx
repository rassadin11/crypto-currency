import React from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { animateScroll as scroll } from "react-scroll";
import { ICard } from "../../store/models/ICard";
import PersonalCard from './PersonalCard'
import { setCurrency } from '../../store/reducers/ConverterReducer'
import { store } from "../../store/store";

interface Props {
    currency: ICard[] | []
}

export type TCoinDiff = {
    name: string,
    price: number
}

const BlockchainCard = ({ currency }: Props) => {
    let { prevCurrency } = useAppSelector(state => state.cur)
    let dispatch = useAppDispatch()

    const roundPrices = (price: number, change: number): string => { // validate prices
        if (price <= 0.01 && price > 0.00001) return change.toFixed(6)
        if (price <= 1 && price > 0.01) return change.toFixed(4)
        if (price > 1 && price < 100) return change.toFixed(1)
        if (price >= 100) return change.toFixed(0)
        else return String(change)
    }

    const handleClick = (name: string) => {
        dispatch(setCurrency({ label: name, value: name, currency: store.getState().cur.currency }))
        scroll.scrollTo(0)
    }

    return (
        <>
            {currency.map(cur => {
                return (
                    <PersonalCard key={cur.fullName}
                        cur={cur} handleClick={handleClick} roundPrices={roundPrices}
                        prevValue={[prevCurrency.filter(item => item.name === cur.name), currency.filter(item => item.name === cur.name)] || null}
                    />
                )
            })}
        </>
    )
};

export default BlockchainCard;