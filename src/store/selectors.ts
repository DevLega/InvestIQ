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

export const selectReportMonth = (state: RootState) => state.reports.month;
export const selectReportYear = (state: RootState) => state.reports.year;
export const selectReportType = (state: RootState) => state.reports.type;
export const selectReportCategory = (state: RootState) => state.reports.category;


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

const selectMonthTransactions = createSelector(
    [selectTransactions, selectReportMonth, selectReportYear],
    (items, month, year) =>
        items.filter((t) => getYear(t.date) === year && getMonth(t.date) === month)
);

export const selectMonthTotals = createSelector([selectMonthTransactions], (items) => {
    let expense = 0;
    let income = 0;

    items.forEach((t) => {
        if (t.type === 'expense') expense += t.amount;
        else income += t.amount;
    });

    return { expense: round2(expense), income: round2(income) };
});

export const selectCategoryTotals = createSelector(
    [selectMonthTransactions, selectReportType],
    (items, type) => {
        const totals: Record<string, number> = {};

        items.forEach((t) => {
            if (t.type === type) totals[t.category] = round2((totals[t.category] ?? 0) + t.amount);
        });

        return totals;
    }
);

export const selectChartData = createSelector(
    [selectMonthTransactions, selectReportType, selectReportCategory],
    (items, type, category) => {
        const groups = new Map<string, { label: string; total: number }>();

        items
            .filter((t) => t.type === type && (!category || t.category === category))
            .forEach((t) => {
                const label = t.description.trim();
                const key = label.toLowerCase(); // "Банани" и "банани" считаем одним товаром
                const prev = groups.get(key);

                groups.set(key, { label: prev?.label ?? label, total: (prev?.total ?? 0) + t.amount });
            });

        return [...groups.values()]
            .map((g) => ({ ...g, total: round2(g.total) }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 10);
    }
);