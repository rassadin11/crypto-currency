import React from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { setCurrency } from "../../store/reducers/CurrenciesReducer";
import s from './InstanceCurrency.module.scss'
import { animateScroll as scroll } from "react-scroll";
import { ICard } from "../../store/models/ICard";

interface Props {

}

type TCoinDiff = {
    name: string,
    price: number
}

const BlockchainCard = (props: Props) => {
    let { currency, prevCurrency } = useAppSelector(state => state.cur)
    let dispatch = useAppDispatch()
    let [prevValue, setPrevValue] = React.useState([])

    const roundPrices = (price: number, change: number): string => { // validate prices
        if (price <= 0.01 && price > 0.00001) return change.toFixed(6)
        if (price <= 1 && price > 0.01) return change.toFixed(4)
        if (price > 1 && price < 100) return change.toFixed(1)
        if (price >= 100) return change.toFixed(0)
        else return String(change)
    }

    const handleClick = (name: string) => {
        dispatch(setCurrency({ label: name, value: name }))
        scroll.scrollTo(0)
    }

    React.useEffect(() => { // check previous prices 
        let difference = currency.map((cur) => {
            let newValues: TCoinDiff[] = []

            prevCurrency.map(prev => {
                if (cur.name === prev.name) {
                    if (cur.price !== prev.price) {
                        newValues.push({
                            name: prev.name, price: prev.price - cur.price
                        })
                    }

                    return '0'
                }
            })

            return newValues
        }) || []

        if (difference) setPrevValue(difference)
    }, [prevCurrency])

    return (
        <>
            {currency.map(cur => {
                return (
                    <div key={cur.id} className={s.card} onClick={() => handleClick(cur.name)}>
                        <img className={s.img} src={`https://www.cryptocompare.com${cur.imageUrl}`} alt={`${cur.fullName}`} />
                        <p className={s.name}>{cur.fullName}</p>
                        <p className={s.price}>Total cost: <span>{cur.price}$</span></p>
                        <p>24-hours price change: {roundPrices(cur.price, cur.change24hour)}$</p>
                    </div>
                )
            })}
        </>
    )
};

export default BlockchainCard;