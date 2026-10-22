import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Transaction, TransactionType } from '../types';

interface TransactionsState {
    items: Transaction[];
    activeTab: TransactionType;
}

const initialState: TransactionsState = {
    items: [],
    activeTab: 'expense',
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: {
            reducer: (state, action: PayloadAction<Transaction>) => {
                state.items.unshift(action.payload);
            },
            prepare: (data: Omit<Transaction, 'id'>) => ({
                payload: { id: crypto.randomUUID(), ...data },
            }),
        },
        removeTransaction: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },
        setActiveTab: (state, action: PayloadAction<TransactionType>) => {
            state.activeTab = action.payload;
        },
    },
});

export const { addTransaction, removeTransaction, setActiveTab } = transactionsSlice.actions;
export default transactionsSlice.reducer;