import { configureStore } from '@reduxjs/toolkit'
import currenciesReducer from './reducers/CurrenciesReducer'
import converterReducer from './reducers/ConverterReducer'

export const store = configureStore({
    reducer: {
        cur: currenciesReducer,
        converter: converterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch