import React from "react"
import s from './InstanceCurrency.module.scss'
import BlockchainCard from './BlockchainCard'
import { useAppSelector } from '../../store/hooks/redux'

interface Props {

}

const InstanceCurrency = (props: Props) => {
    const { currency } = useAppSelector(state => state.cur)

    if (!currency.length) return <div className={s.title}>Loading...</div>

    return (
        <div className={s.wrapper}>
            <p className={s.title}>Top daily currencies</p>

            <div className={s.cards}>
                <BlockchainCard currency={currency} />
            </div>
        </div>
    )
};

export default InstanceCurrency;