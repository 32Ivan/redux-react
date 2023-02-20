import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICustomerUpdate } from '../../components/CustomerType';

interface CustoemrState {
    customers: ICustomerUpdate[];
}

const initialState: CustoemrState = {
    customers: []
};

export const fetchCustomers = createAsyncThunk('customers/get', async (thunkAPI) => {
    const response = await fetch('http://localhost:1066/customers/get');
    const data = await response.json();

    return data.customers;
});

export const deleteCustomers = createAsyncThunk('customers/delete', async (data: string) => {
    fetch(`http://localhost:1066/customers/delete/${data}`, { method: 'DELETE' })
        .then(async (response) => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        })
        .catch((error) => {
            console.error('There was an error!', error);
        });
});

export const saveCustomer = createAsyncThunk(
    'customer/update',
    async ({ name, surname, city, email, dateOfBirth }: { name: string; surname: string; email: string; city: string; dateOfBirth: Date }) => {
        const response = await fetch('http://localhost:1066/customers/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                city: city,
                dateOfBirth: dateOfBirth
            })
        });
        const data = await response.json();
        return data;
    }
);

export const CustomerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addPerson: (state, action: PayloadAction<{ name: string; surname: string; email: string; city: string; dateOfBirth: Date }>) => {
            state.customers.push({
                name: action.payload.name,
                surname: action.payload.surname,
                email: action.payload.email,
                city: action.payload.city,
                dateOfBirth: action.payload.dateOfBirth
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
            state.customers = action.payload;
        });

        builder.addCase(deleteCustomers.fulfilled, () => {});
    }
});

export default CustomerSlice.reducer;
export const { addPerson } = CustomerSlice.actions;
