import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPrice } from '../../components/CustomerType';

interface PriceState {
    price: IPrice[];
}

const initialState: PriceState = {
    price: []
};

export const fetchPrice = createAsyncThunk('customers/get', async (thunkAPI) => {
    const response = await fetch('http://localhost:1066/price/get');
    const data = await response.json();

    return data.price;
});

export const PriceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        addPrice: (state, action: PayloadAction<{ amount: number; city: string }>) => {
            state.price.push({
                amount: action.payload.amount,
                city: action.payload.city
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPrice.fulfilled, (state, action) => {
            state.price = action.payload;
        });
    }
});

export default PriceSlice.reducer;
export const { addPrice } = PriceSlice.actions;
