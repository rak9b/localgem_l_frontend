import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Currency = 'USD' | 'EUR' | 'GBP' | 'BDT';

interface CurrencyState {
    currency: Currency;
    rate: number;
}

const initialState: CurrencyState = {
    currency: 'USD',
    rate: 1,
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrency: (state, action: PayloadAction<Currency>) => {
            state.currency = action.payload;
            // Mock rates
            const rates: Record<Currency, number> = {
                USD: 1,
                EUR: 0.92,
                GBP: 0.79,
                BDT: 110,
            };
            state.rate = rates[action.payload];
        },
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
