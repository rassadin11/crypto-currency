import { createSlice } from '@reduxjs/toolkit'
import { ICard } from '../models/ICard'
import { topCurrencies } from '../thunks/thunks'
import { TConverter } from '../../types'

interface CurrencyState {
    currency: ICard[] | [],
    prevCurrency: ICard[] | [],
    converter: TConverter[] | [],
    isLoading: boolean,
    error: null | string,
    count: number
}

interface PayloadAction<T> {
    type: string,
    payload: T
}

const initialState: CurrencyState = {
    currency: [],
    prevCurrency: [],
    converter: [],
    isLoading: false,
    error: null,
    count: 1,
}

export const currenciesReducer = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        // initializeCurrency(state) {
        //     state.dollarToCoin = state.activeCurrency!.price || 1
        // },
        // setCurrency(state, action) {
        //     let price;

        //     state.currency.forEach(cur => {
        //         if (cur.name === action.payload.value) {
        //             price = cur.price
        //             return cur.price
        //         }
        //     })

        //     state.dollarToCoin = price || 1

        //     state.activeCurrency = { ...action.payload, price }
        // },
        setPrevValue(state) {
            state.prevCurrency = state.currency
        }
    },
    extraReducers: {
        [topCurrencies.pending.type]: (state) => {
            state.isLoading = true
        },
        [topCurrencies.fulfilled.type]: (state, action: PayloadAction<ICard[]>) => {
            state.isLoading = false;

            if (state.currency === state.prevCurrency) return;

            state.currency = action.payload

            state.converter = action.payload.map((coin: ICard): TConverter => ({
                value: coin.name, price: coin.price, label: coin.name
            }))
        },
        [topCurrencies.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

export const { setPrevValue } = currenciesReducer.actions

export default currenciesReducer.reducer