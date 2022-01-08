import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICard } from "../models/ICard";

export const topCurrencies = createAsyncThunk('currency/top', async () =>
    await axios.get("https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD").then(response => {
        const coins: ICard[] = response.data.Data.map((obj: any): ICard => ({
            id: obj.CoinInfo.Id,
            fullName: obj.CoinInfo.FullName,
            imageUrl: obj.CoinInfo.ImageUrl,
            name: obj.CoinInfo.Name,
            price: obj.RAW.USD.PRICE,
            change24hour: obj.RAW.USD.CHANGE24HOUR
        }))

        return coins
    }))