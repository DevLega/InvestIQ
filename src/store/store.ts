import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import notificationReducer from './notificationSlice';
import transactionsReducer from './transactionsSlice';
import balanceReducer from './balanceSlice';
import reportsReducer from './reportsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    transactions: transactionsReducer,
    balance: balanceReducer,
    reports: reportsReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;