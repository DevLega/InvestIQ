import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface BalanceState {
  initialBalance: number;
  isConfirmed: boolean;
}

const initialState: BalanceState = {
  initialBalance: 0,
  isConfirmed: false,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    confirmBalance: (state, action: PayloadAction<number>) => {
      state.initialBalance = action.payload;
      state.isConfirmed = true;
    },
  },
});

export const { confirmBalance } = balanceSlice.actions;
export default balanceSlice.reducer;