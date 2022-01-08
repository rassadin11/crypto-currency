import React from "react"
import s from './InstanceCurrency.module.scss'
import BlockchainCard from './BlockchainCard'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'

interface Props {

}

const InstanceCurrency = (props: Props) => {
    const { count, currency } = useAppSelector(state => state.cur)
    const dispatch = useAppDispatch()

    if (!currency.length) return <div className={s.title}>Loading...</div>

    return (
        <div className={s.wrapper}>
            <p className={s.title}>Top daily currencies</p>

            <div className={s.cards}>
                <BlockchainCard />
            </div>
        </div>
    )
};

export default InstanceCurrency;