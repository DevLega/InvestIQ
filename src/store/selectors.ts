import type { RootState } from "./store";
import { createSelector } from '@reduxjs/toolkit';
import { getMonth, getYear } from '../utils/dates';
import { round2 } from '../utils/money';

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthReady = (state: RootState) => state.auth.isAuthReady;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectActiveTab = (state: RootState) => state.transactions.activeTab;
export const selectInitialBalance = (state: RootState) => state.balance.initialBalance;
export const selectIsBalanceConfirmed = (state: RootState) => state.balance.isConfirmed;

export const selectActiveTransactions = createSelector(
    [selectTransactions, selectActiveTab],
    (items, tab) => items.filter((t) => t.type === tab)
);

export const selectCurrentBalance = createSelector(
    [selectInitialBalance, selectTransactions],
    (initial, items) =>
        round2(items.reduce((sum, t) => (t.type === 'income' ? sum + t.amount : sum - t.amount), initial))
);

export const selectMonthlySummary = createSelector(
    [selectTransactions, selectActiveTab],
    (items, tab) => {
        const now = new Date();
        const year = now.getFullYear();
        const totals = new Array<number>(12).fill(0);

        items.forEach((t) => {
            if (t.type === tab && getYear(t.date) === year) totals[getMonth(t.date)] += t.amount;
        });

        return totals
            .map((total, month) => ({ month, total: round2(total) }))
            .slice(0, now.getMonth() + 1)
            .reverse();
    }
);