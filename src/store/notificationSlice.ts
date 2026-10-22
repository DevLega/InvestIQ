import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type NotificationType = 'info' | 'success' | 'error';

interface NotificationState {
  message: string | null;
  type: NotificationType;
}

const initialState: NotificationState = { message: null, type: 'info' };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; type?: NotificationType }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type ?? 'info';
    },
    hideNotification: (state) => {
      state.message = null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;