import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TConverter } from '../../types'
import { ICard } from '../models/ICard'
import { store } from '../store'
import { topCurrencies } from '../thunks/thunks'

interface CurrencyState {
    activeCurrency: TConverter | null,
    dollarToCoin: number
}

const initialState: CurrencyState = {
    activeCurrency: null,
    dollarToCoin: 1
}

export const converterReducer = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        initializeCurrency(state) {
            state.dollarToCoin = state.activeCurrency!.price || 1
        },
        setCurrency(state, action) {
            let price;

            action.payload.currency.forEach((cur: any) => {
                if (cur.name === action.payload.value) {
                    price = cur.price
                    return cur.price
                }
            })

            state.dollarToCoin = price || 1
            delete action.payload.currency
            state.activeCurrency = { ...action.payload, price }
        }
    },
    extraReducers: {
        [topCurrencies.fulfilled.type]: (state, action: PayloadAction<ICard[]>) => {
            let obj = {
                value: action.payload[0].name,
                label: action.payload[0].name,
                price: action.payload[0].price
            }

            state.activeCurrency = obj
        }

    }
})

export const { setCurrency, initializeCurrency } = converterReducer.actions

export default converterReducer.reducer

export { }