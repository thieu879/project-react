import { configureStore } from '@reduxjs/toolkit';
import managementReducer from './reducers/managementReducer';

export const store:any = configureStore({
  reducer: {
    account: managementReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
