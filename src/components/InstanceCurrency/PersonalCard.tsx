import React from "react"
import s from "./InstanceCurrency.module.scss"
import { ICard } from '../../store/models/ICard'
import { TCoinDiff } from "./BlockchainCard";

interface Props {
    cur: ICard,
    prevValue: any,
    handleClick(name: string): void,
    roundPrices(price: number, change: number): string,
}

const PersonalCard = ({ cur, handleClick, roundPrices, prevValue }: Props) => {
    let [addClass, setAddClass] = React.useState<string>('')

    React.useEffect(() => {
        if (prevValue[0][0] && prevValue[1][0]) {
            if (prevValue[1][0].price - prevValue[0][0].price < 0) setAddClass("red")
            else setAddClass("green")
        }

        setTimeout(() => {
            setAddClass('')
        }, 5000)
    }, [cur])

    return (
        <div key={cur.id} className={s.card} onClick={() => handleClick(cur.name)}>
            <img className={s.img} src={`https://www.cryptocompare.com${cur.imageUrl}`} alt={`${cur.fullName}`} />
            <p className={s.name}>{cur.fullName}</p>
            <p className={s.price}>Total cost: <span className={addClass}>{cur.price}$</span></p>
            <p>24-hours price change: {roundPrices(cur.price, cur.change24hour)}$</p>
        </div>
    )
};

export default PersonalCard;