import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TransactionType } from '../types';

interface ReportsState {
    month: number;
    year: number;
    type: TransactionType;
    category: string | null;
}

const now = new Date();

const initialState: ReportsState = {
    month: now.getMonth(),
    year: now.getFullYear(),
    type: 'expense',
    category: null,
};

const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        nextMonth: (state) => {
            if (state.month === 11) {
                state.month = 0;
                state.year += 1;
            } else {
                state.month += 1;
            }
        },
        prevMonth: (state) => {
            if (state.month === 0) {
                state.month = 11;
                state.year -= 1;
            } else {
                state.month -= 1;
            }
        },
        toggleType: (state) => {
            state.type = state.type === 'expense' ? 'income' : 'expense';
            state.category = null;
        },
        toggleCategory: (state, action: PayloadAction<string>) => {
            state.category = state.category === action.payload ? null : action.payload;
        },
    },
});

export const { nextMonth, prevMonth, toggleType, toggleCategory } = reportsSlice.actions;
export default reportsSlice.reducer;