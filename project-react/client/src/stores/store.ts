import { configureStore } from '@reduxjs/toolkit';
import managementReducer from './reducers/managementReducer';
import courseReducer from './reducers/courseReducer';

export const store:any = configureStore({
  reducer: {
    account: managementReducer,
    course:courseReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
