import { configureStore } from '@reduxjs/toolkit'
import currenciesReducer from './reducers/CurrenciesReducer'

export const store = configureStore({
    reducer: {
        cur: currenciesReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch