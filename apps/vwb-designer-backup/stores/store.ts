import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import themeStore from '@/stores/theme.store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    theme: themeStore,
  },
  middleware: new MiddlewareArray().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
